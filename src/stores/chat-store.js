import { action, makeAutoObservable, observable } from "mobx";
import { sendBird } from "../sendBird/SendBird";
import Constants from "../utils/Constants";
class ChatStore {
    constructor() {
        makeAutoObservable(this);
        sendBird.init();
    }
    //----------- Observable ----------//
    @observable isLoading = false;
    @observable message = null;
    @observable listUser = null;
    @observable listOpenChannel = null;
    @observable listGroupChannel = null;
    @observable currentOpenChannel = null;
    @observable currentGroupChannel = null;
    @observable listMessage = [];
    @observable openChannelHandler = null;
    @observable groupChannelHandler = null;
    @observable whomIsTyping = null;
    @observable lastMessage = null;
    @observable refreshing = false;
    @observable listCurrentMembersChannel = null;
    //----------- Action -------------//
    @action setRefreshing = (refreshing) => {
        this.refreshing = refreshing;
    }
    @action setLastMessage = (lastMessage) => {
        this.lastMessage = lastMessage;
    }
    @action setIsLoading = (isLoading) => {
        this.isLoading = isLoading;
    };
    @action setMessage = (message) => {
        this.message = message;
    }
    @action setListUser = (listUser) => {
        this.listUser = listUser;
    }
    @action setListOpenChannel = (listOpenChannel) => {
        this.listOpenChannel = listOpenChannel;
    }
    @action setListGroupChannel = (listGroupChannel) => {
        this.listGroupChannel = listGroupChannel;
    }
    @action setCurrentOpenChannel = (currentOpenChannel) => {
        this.currentOpenChannel = currentOpenChannel;
    }
    @action setCurrentGroupChannel = (groupChannel) => {
        this.currentGroupChannel = groupChannel;
    }

    registerPushNotification = async (fcmToken) => {
        if (sendBird.sb) {
            if (Constants.isIOS) {
                let resp = await sendBird.sb.registerAPNSPushTokenForCurrentUser(fcmToken);
                console.log('Resp-registerPushNotification-IOS', resp);
            } else {
                let resp = await sendBird.sb.registerGCMPushTokenForCurrentUser(fcmToken);
                console.log('Resp-registerPushNotification', resp);
            }
        }
        //  await sendBird.sb.registerAPNSPushTokenForCurrentUser(fcmToken, (response, error) => {})
    }

    setAppStateForSB = (isBackground) => {
        if (sendBird.sb) {
            if (isBackground) {
                sendBird.sb.setBackgroundState();
            } else {
                sendBird.sb.setForegroundState();
            }
        }
    }

    connectToServer = async (userId) => {
        let tempUser;
        await sendBird.connectToServer(userId).then(user => {
            tempUser = user;
        }).catch(error => {
            return error;
        })
        return tempUser;
    }
    @action setListCurrentMemberChannel = (listMember) => {
        this.listCurrentMembersChannel = listMember;
    }
    @action getListChannel = () => {
        // Set Loading
        this.setIsLoading(true);
        // Get List channel
        sendBird.openChannel.getListChannel()
            .then(openChannels => {
                if (openChannels) {
                    this.setListOpenChannel(openChannels);
                    console.log("[GetListChannel] OpenChannels", openChannels)
                }
            })
            .catch(error => {
                console.log("[GetListChannel] Error", error)
            })
            .finally(() => {
                this.setIsLoading(false);
            });
    }
    @action getListGroupChannel = async () => {
        this.setIsLoading(true);
        sendBird.groupChannel.retrieveGroupListOfChannels()
            .then(groupsChannel => {
                if (groupsChannel) {
                    this.sortChannelByLastestLastMessage(groupsChannel);
                    console.log("[getListChannelWithUserId] GroupChannels", groupsChannel)
                }
            })
            .catch(error => {
                console.log("[getListGroupChannel] Error", error)
            })
            .finally(() => {
                this.setIsLoading(false);
            });
    }
    sortChannelByLastestLastMessage = async (groupsChannel) => {
        this.setListGroupChannel([]);
        let listGroupChannelWithNullLastMessage = [];
        let listFilteredGroupChannel = [];
        // filter group
        for (let idx in groupsChannel) {
            if (!groupsChannel[idx].lastMessage) {
                listGroupChannelWithNullLastMessage.push(groupsChannel[idx])
            }
            else {
                listFilteredGroupChannel.push(groupsChannel[idx])
            }
        }
        // Done filter
        if (listFilteredGroupChannel.length > 0) {
            for (let idxFilter = 0; idxFilter < listFilteredGroupChannel.length - 1; idxFilter++) {
                let tempGroupChannel = null;
                for (let idY = 0; idY < listFilteredGroupChannel.length - idxFilter - 1; idY++) {
                    if ((listFilteredGroupChannel[idY].lastMessage.createdAt - listFilteredGroupChannel[idY + 1].lastMessage.createdAt) < 0) {
                        tempGroupChannel = listFilteredGroupChannel[idY];
                        listFilteredGroupChannel[idY] = listFilteredGroupChannel[idY + 1];
                        listFilteredGroupChannel[idY + 1] = tempGroupChannel;
                    }
                }
            }
        }
        if (listGroupChannelWithNullLastMessage.length > 0) {
            listFilteredGroupChannel = [...listFilteredGroupChannel, ...listGroupChannelWithNullLastMessage];
        }
        this.setListGroupChannel(listFilteredGroupChannel);
    }
    @action refreshListGroupChannel = async () => {
        this.setRefreshing(true);
        await sendBird.groupChannel.retrieveGroupListOfChannels()
            .then(groupsChannel => {
                if (groupsChannel) {
                    this.sortChannelByLastestLastMessage(groupsChannel);
                    console.log("[getListChannelWithUserId] GroupChannels", groupsChannel)
                }
            })
            .catch(error => {
                console.log("[getListGroupChannel] Error", error)
            })
            .finally(() => {
                this.setRefreshing(false);
            });
    }

    @action getListChannelWithUserId = (userIds) => {
        // Set Loading
        this.setIsLoading(true);
        // Get List channel
        sendBird.groupChannel.filterChannelWithUserIds(userIds)
            .then(groupChannels => {
                if (groupChannels) {
                    if (groupChannels) {
                        this.setListGroupChannel(groupChannels);
                        console.log("[getListChannelWithUserId] GroupChannels", groupChannels)
                    }
                }
            })
            .catch(error => {
                console.log("[getListChannelWithUserId] Error", error)
            })
            .finally(() => {
                this.setIsLoading(false);
            })
    }
    @action enterGroupChannel = () => {
        sendBird.groupChannel
    }
    @action enterOpenChannel = (channelUrl) => {
        sendBird.openChannel.enterChannel(channelUrl)
            .then(result => {
                this.setCurrentOpenChannel(result)
                console.log("[EnterChannel] Result", result);
            })
            .catch(error => {
                console.log("[EnterChannel] Error", error);
            })
    }
    @action getChannel = (channelUrl) => {
        sendBird.groupChannel.getChannelByUrl(channelUrl)
            .then(currentGroupChannel => {
                this.setCurrentGroupChannel(currentGroupChannel)
                this.getListCurrentMembers();
                currentGroupChannel.markAsRead();
                this.getLastMessage();
            })
            .catch(error => {
                console.log("[getChannelByUrl] Error", error);
            })
    }
    @action sendUserMessage = (params) => {
        console.log(`Params:`, params);
        this.appendListMessage(params);
        sendBird.groupChannel?.sendUserMessage(params);
    }
    @action setListMessage = (listMessage) => {
        this.listMessage = listMessage;
    }
    @action appendListMessage = (message) => {
        this.listMessage.push(message);
    }
    @action setOpenChannelHandler = (openChannelHandler) => {
        this.openChannelHandler = openChannelHandler;
    }
    @action registerChannelHandler = (channelId) => {
        sendBird.registerOpenChannelHandler(channelId);
    }
    @action registerGroupChannelHandler = (channelId) => {
        sendBird.registerGroupChannelHandler(channelId);
    }
    @action listenOnGroupChannelHandler = () => {
        sendBird?.listenOnGroupChannelHandler()
            .then(() => {
                this.groupChannelHandler = sendBird.getGroupChannelHandler();
                this.groupChannelHandler.channelHandler.onMessageReceived = (channel, message) => {
                    console.log("[GroupChannel] Message", message)
                    this.appendListMessage(message);
                };
                this.groupChannelHandler.channelHandler.onMessageUpdated = () => {
                    console.log("[GroupChannel] onMessageUpdated")
                };
                this.groupChannelHandler.channelHandler.onMessageDeleted = () => {
                    console.log("[GroupChannel] onMessageDeleted")
                };
                this.groupChannelHandler.channelHandler.onMentionReceived = () => {
                    console.log("[GroupChannel] onMentionReceived")
                };
                this.groupChannelHandler.channelHandler.onChannelChanged = (channel) => {
                    console.log("[GroupChannel] onChannelChanged", channel)
                    let listGroupChannelTemp = null;
                    if (this.listGroupChannel.length > 0) {
                        listGroupChannelTemp = [...this.listGroupChannel];
                        let idx;
                        for (idx in listGroupChannelTemp) {
                            if (listGroupChannelTemp[idx].url == channel.url) {
                                listGroupChannelTemp.splice(idx, 1, channel);
                                break;
                            }
                        }
                        this.sortChannelByLastestLastMessage(listGroupChannelTemp);
                    }
                };
                this.groupChannelHandler.channelHandler.onChannelDeleted = () => {
                    console.log("[GroupChannel] onChannelDeleted")
                };
                this.groupChannelHandler.channelHandler.onChannelFrozen = () => {
                    console.log("[GroupChannel] onChannelFrozen")
                };
                this.groupChannelHandler.channelHandler.onChannelUnfrozen = () => {
                    console.log("[GroupChannel] onChannelUnfrozen")
                };
                this.groupChannelHandler.channelHandler.onMetaDataCreated = () => {
                    console.log("[GroupChannel] onMetaDataCreated")
                };
                this.groupChannelHandler.channelHandler.onMetaDataUpdated = () => {
                    console.log("[GroupChannel] onMetaDataUpdated")
                };
                this.groupChannelHandler.channelHandler.onMetaDataDeleted = () => {
                    console.log("[GroupChannel] onMetaDataDeleted")
                };
                this.groupChannelHandler.channelHandler.onMetaCountersCreated = () => { };
                this.groupChannelHandler.channelHandler.onMetaCountersUpdated = () => { };
                this.groupChannelHandler.channelHandler.onMetaCountersDeleted = () => { };
                this.groupChannelHandler.channelHandler.onChannelHidden = () => { };
                this.groupChannelHandler.channelHandler.onUserReceivedInvitation = (groupChannel, inviter, invitees) => {
                    console.log("[GroupChannel] onUserDeclinedInvitation groupChannel", groupChannel, "inviter", inviter, "invitees", invitees
                    )
                };
                this.groupChannelHandler.channelHandler.onUserDeclinedInvitation = (groupChannel, inviter, invitee) => {
                    console.log("[GroupChannel] onUserDeclinedInvitation groupChannel", groupChannel, "inviter", inviter, "invitee", invitee
                    )
                };
                this.groupChannelHandler.channelHandler.onUserJoined = (groupChannel, user) => {
                    console.log("[GroupChannel] onUserJoined groupChannel", groupChannel, "user", user)
                };
                this.groupChannelHandler.channelHandler.onUserLeft = (groupChannel, user) => {
                    console.log("[GroupChannel] onUserLeft groupChannel", groupChannel, "user", user)
                };
                this.groupChannelHandler.channelHandler.onDeliveryReceiptUpdated = (groupChannel) => {
                    console.log("[GroupChannel] onDeliveryReceiptUpdated", groupChannel)
                };
                this.groupChannelHandler.channelHandler.onReadReceiptUpdated = (groupChannel) => {
                    console.log("[GroupChannel] onReadReceiptUpdated", groupChannel)
                };
                this.groupChannelHandler.channelHandler.onTypingStatusUpdated = (groupChannel) => {
                    console.log("[GroupChannel] groupChannel", groupChannel)
                };
                this.groupChannelHandler.channelHandler.onUserEntered = (openChannel, user) => {
                    console.log("[GroupChannel] onUserEntered", openChannel, "User", user)
                };
                this.groupChannelHandler.channelHandler.onUserExited = (openChannel, user) => {
                    console.log("[GroupChannel] onUserExited", openChannel, "User", user)
                };
                this.groupChannelHandler.channelHandler.onUserMuted = (channel, user) => {
                    console.log("[GroupChannel] onUserMuted channel", channel, "user", user)
                };
                this.groupChannelHandler.channelHandler.onUserUnmuted = () => { };
                this.groupChannelHandler.channelHandler.onUserBanned = () => { };
                this.groupChannelHandler.channelHandler.onUserUnbanned = () => { };
            })
            .catch(error => {
                console.log(`[ListenOnGroupChannelHandler] Error : ${error}`);
            })
    }
    @action setWhomTypingMessage = (whomIsTyping) => {
        this.whomIsTyping = whomIsTyping;
    }
    @action startTypingMessage = () => {
        this.currentGroupChannel.startTyping();
    }
    @action endTypingMessage = () => {
        this.currentGroupChannel.endTyping();
    }
    @action listenOnOpenChannelHandler = () => {
        sendBird.listenOnOpenChannelHandler()
            .then(() => {
                this.openChannelHandler = sendBird.getOpenChannelHandler();
                console.log(`[ListenOnOpenChannelHandler] openChannelHandler : ${this.openChannelHandler}`);
                this.openChannelHandler.channelHandler.onMessageReceived = (channel, message) => {
                    console.log("[OpenChannel] onMessageReceived", channel)
                    console.log("[OpenChannel]  Message", message)
                    this.appendListMessage(message);
                };
                this.openChannelHandler.channelHandler.onMessageUpdated = () => {
                    console.log("[OpenChannel] onMessageUpdated")
                };
                this.openChannelHandler.channelHandler.onMessageDeleted = () => {
                    console.log("[OpenChannel] onMessageDeleted")
                };
                this.openChannelHandler.channelHandler.onMentionReceived = () => {
                    console.log("[OpenChannel]  onMentionReceived")
                };
                this.openChannelHandler.channelHandler.onChannelChanged = () => {
                    console.log("[OpenChannel]  onChannelChanged")
                };
                this.openChannelHandler.channelHandler.onChannelDeleted = () => {
                    console.log("[OpenChannel]  onChannelDeleted")
                };
                this.openChannelHandler.channelHandler.onChannelFrozen = () => {
                    console.log("[OpenChannel]  onChannelFrozen")
                };
                this.openChannelHandler.channelHandler.onChannelUnfrozen = () => {
                    console.log("[OpenChannel]  onChannelUnfrozen")
                };
                this.openChannelHandler.channelHandler.onMetaDataCreated = () => {
                    console.log("[OpenChannel]  onMetaDataCreated")
                };
                this.openChannelHandler.channelHandler.onMetaDataUpdated = () => {
                    console.log("[OpenChannel]  onMetaDataUpdated")
                };
                this.openChannelHandler.channelHandler.onMetaDataDeleted = () => {
                    console.log("[OpenChannel]  onMetaDataDeleted")
                };
                this.openChannelHandler.channelHandler.onMetaCountersCreated = () => { };
                this.openChannelHandler.channelHandler.onMetaCountersUpdated = () => { };
                this.openChannelHandler.channelHandler.onMetaCountersDeleted = () => { };
                this.openChannelHandler.channelHandler.onChannelHidden = () => { };
                this.openChannelHandler.channelHandler.onUserReceivedInvitation = (groupChannel, inviter, invitees) => {
                    console.log("[OpenChannel]  onUserDeclinedInvitation groupChannel", groupChannel, "inviter", inviter, "invitees", invitees
                    )
                };
                this.openChannelHandler.channelHandler.onUserDeclinedInvitation = (groupChannel, inviter, invitee) => {
                    console.log("[OpenChannel]  onUserDeclinedInvitation groupChannel", groupChannel, "inviter", inviter, "invitee", invitee
                    )
                };
                this.openChannelHandler.channelHandler.onUserJoined = (groupChannel, user) => {
                    console.log("[OpenChannel]  onUserJoined groupChannel", groupChannel, "user", user)
                };
                this.openChannelHandler.channelHandler.onUserLeft = (groupChannel, user) => {
                    console.log("[OpenChannel]  onUserLeft groupChannel", groupChannel, "user", user)
                };
                this.openChannelHandler.channelHandler.onDeliveryReceiptUpdated = (groupChannel) => {
                    console.log("[OpenChannel]  onDeliveryReceiptUpdated", groupChannel)
                };
                this.openChannelHandler.channelHandler.onReadReceiptUpdated = (groupChannel) => {
                    console.log("[OpenChannel] onReadReceiptUpdated", groupChannel)
                };
                this.openChannelHandler.channelHandler.onTypingStatusUpdated = (groupChannel) => {
                    console.log("[OpenChannel] groupChannel", groupChannel)
                    this.startTypingMessage();
                    // Refresh typing status of members within channel.
                };
                this.openChannelHandler.channelHandler.onUserEntered = (openChannel, user) => {
                    console.log("[OpenChannel]  onUserEntered", openChannel, "User", user)
                };
                this.openChannelHandler.channelHandler.onUserExited = (openChannel, user) => {
                    console.log("[OpenChannel]  onUserExited", openChannel, "User", user)
                };
                this.openChannelHandler.channelHandler.onUserMuted = (channel, user) => {
                    console.log("[OpenChannel]  onUserMuted channel", channel, "user", user)
                };
                this.openChannelHandler.channelHandler.onUserUnmuted = () => { };
                this.openChannelHandler.channelHandler.onUserBanned = () => { };
                this.openChannelHandler.channelHandler.onUserUnbanned = () => { };
            })
            .catch(error => {
                console.log(`[ListenOnOpenChannelHandler] Error : ${error}`);
            })
    }
    @action loadPreviousMessageOpenChannel() {
        let listQuery = this.currentOpenChannel?.createPreviousMessageListQuery();
        listQuery.limit = 20;
        listQuery.reverse = false;
        // Retrieving previous messages.
        listQuery.load(function (messages, error) {
            if (error) {
                console.log(`[loadPreviousMessage] Error : ${error}`);
            }
            console.log(`[loadPreviousMessage] messages `, messages);
        });
    }
    @action getLastMessage() {
        let lastMessage = this.currentGroupChannel?.lastMessage;
        if (lastMessage) {
            this.setLastMessage(lastMessage);
            if (this.listMessage.length == 0) {
                this.listMessage = [lastMessage];
            }
            this.loadPreviousMessageWithMessageId(lastMessage.messageId)
        }
    }
    @action loadPreviousMessageGroupChannel() {
        let listQuery = this.currentGroupChannel?.createPreviousMessageListQuery();
        listQuery.limit = 20;
        listQuery.reverse = false;
        // Retrieving previous messages.
        listQuery.load(function (messages, error) {
            if (error) {
                console.log(`[loadPreviousMessage] Error : ${error}`);
            }
            messages.forEach(message => {
                console.log(`[loadPreviousMessage] message : ${message}`);
            });
        });
    }
    @action createGroupChannelWithUserIds = (params) => {
        sendBird.groupChannel.createChannelWithUserIds(params?.userIds || [], true, params?.name || "", params?.imageUrl || "", params?.data || null)
            .then(groupChannel => {
                console.log(`GroupChannel`, groupChannel)
                this.setCurrentGroupChannel(groupChannel);
            })
            .catch(error => {
                console.log(`error`, error)
            });
    }
    @action setChannelAutoAcceptInvitation = () => {
        sendBird.setChannelAutoAcceptInvitation();
    }
    @action loadPreviousMessageWithMessageId = (messageId) => {
        this.setRefreshing(true);
        let messageInfor = {
            prevResultSize: 20,
            nextResultSize: 0,
            messageId: messageId,
            reserve: true
        }
        sendBird.groupChannel.getMessageById(messageInfor)
            .then(messages => {
                let listMessages = [...messages, ...this.listMessage];
                this.setListMessage(listMessages);
            })
            .catch(error => {
                console.log(`loadPreviousMessageWithMessageId error ${error}`)
            })
            .finally(() => {
                this.setRefreshing(false);
            });
    }
    @action leaveChannel = () => {
        sendBird.groupChannel.leaveChannel().then(response => {
            console.log(`[LeaveChannel] Response ${response}`)
        })
            .catch(error => {
                console.log(`[LeaveChannel] Error ${error}`)
            })
    }
    @action getListCurrentMembers = () => {
        sendBird.groupChannel.getListMember()
            .then(members => {
                if (members) {
                    this.setListCurrentMemberChannel(members);
                }
                console.log(`[GetListCurrentMembers] Members`, members)
            })
            .catch(error => {
                console.log(`[GetListCurrentMembers] Error ${error}`)
            })
    }
    checkExistedGroupChannel = (params) => {
        sendBird.checkGroupChannelExistedAtListChannel(params?.name)
            .then(currentGroupChannel => {
                if (currentGroupChannel) {
                    this.setCurrentGroupChannel(currentGroupChannel);
                }
                else {
                    this.createGroupChannelWithUserIds(params);
                }
                console.log(`[CheckExistedGroupChannel] CurrentGroupChannel`, currentGroupChannel)
            })
            .catch(error => {
                console.log(`[CheckExistedGroupChannel] error`, error)
            });
    }
    leaveChannelWithChannel = async (channelGroup) => {
        if (channelGroup) {
            let result;
            await channelGroup.leave(function (response, error) {
                if (error) {
                    console.log("[GroupChannel] Error", error);
                    return error;
                }
                console.log("[GroupChannel] Response", response);
                result = response;
            });
            return result;
        }
    }
    updateChannelInfor = async (param) => {
        var params = new sendBird.sb.GroupChannelParams();
        params.name = param.name;
        params.coverUrl = param.cover_url;
        params.channelUrl = param.channel_url; // For an open channel, you 
        this.setIsLoading(true);
        this.currentGroupChannel.updateChannel(params, function (response, error) {
            if (error) {
                console.log("error", error)
                return error;
            }
            return response;
        }).then(result => {
            console.log("result", result)
        })
            .catch(error => {
                console.log("error", error)
            })
            .finally(() => {
                this.setIsLoading(false);
            });
    }
}
export { ChatStore };
