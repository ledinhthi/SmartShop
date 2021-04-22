import { observable, action, makeAutoObservable } from "mobx";
import APICommonService from "../services/APICommonService";
import i18n from "../translations/i18n";
import LOCALIZE_KEYS from "../translations/LOCALIZE_KEYS";

class SharingAccountStore {
  constructor() {
    makeAutoObservable(this);
  }

  @observable isLoading = false;
  @observable sharingsData = null;
  @observable sharingProjects = [];
  @observable selectedProject = null;
  @observable currentSharingData = null;
  @observable usersSharing = [];
  @observable selectedUserSharing = null;
  @observable selectedUsersSharing = [];
  @observable errSharingData = null;
  @observable respDeleteSharingData = null;
  @observable respSubmitSharingData = null;

  @action setLoading = (loading) => {
    this.isLoading = loading;
  };

  @action getSharingData = (userId, token, refresh = false) => {
    if (!refresh) {
      this.setLoading(true);
    }
    this.setErrSharingData(null);

    APICommonService.getSharingsData(userId, token)
      .then((resp) => {
        console.log("Resp-GetSharing", resp);
        if (resp.success && resp.data) {
          //   let forms = [{id:-1}, ...resp.data]
          this.setSharingsData(resp.data);
        } else {
          this.setSharingsData([]);
          this.setErrSharingData(
            resp.data || i18n.t(LOCALIZE_KEYS.internal_err_msg)
          );
        }
      })
      .catch((err) => {
        this.setSharingsData([]);
        this.setErrSharingData(err);
      })
      .finally(() => {
        this.setLoading(false);
      });
  };

  @action deleteSharingData = (sharingId, userId, token) => {
    this.setLoading(true);
    this.setErrSharingData(null);

    APICommonService.deleteSharingData(sharingId, userId, token)
      .then((resp) => {
        console.log("Resp-DeleteSharing", resp);
        if (resp.success) {
          this.setRespDeleteSharingData(resp);
        } else {
          this.setErrSharingData(
            resp.data || i18n.t(LOCALIZE_KEYS.internal_err_msg)
          );
        }
      })
      .catch((err) => {
        this.setErrSharingData(err);
      })
      .finally(() => {
        this.setLoading(false);
      });
  };

  @action getSharingProjects = (userId, token, defaultProjId) => {
    this.setLoading(true);
    let defaultProject = {id: -1, lslName: i18n.t(LOCALIZE_KEYS.share_all_title)};
    APICommonService.getSharingProjects(userId, token)
      .then((resp) => {
        // console.log("Resp-getSharingProjects", resp);        
        let data = [];
        if (resp.success && resp.data) {
          data = resp.data;
        }

        data.push(defaultProject);
        this.setSharingProjects(data);

        // EDIT case -> Check !== All then we assign current selected project
        if(!defaultProjId || defaultProjId === -1) {
          this.setSelectedProject(defaultProject);
        } else {
          data.forEach(proj => {
            if(proj.id === defaultProjId) {
              this.setSelectedProject(proj);
              return
            }
          });
        }
      })
      .catch((err) => {
        this.setSharingProjects([defaultProject]);
        this.setSelectedProject(defaultProject);
      })
      .finally(() => {
        this.setLoading(false);
      });
  };

  @action getUsersByProjectId = (userId, token, projectId) => {
    this.setLoading(true);
    this.setSelectedUsersSharing([]);
    APICommonService.getUsersByProjectId(userId, token, projectId)
      .then((resp) => {
        console.log("Resp-getUsersByProjectId", resp);
        if (resp.success && resp.data) {
          this.setSelectedUsersSharing(resp.data);
        }
      })
      .catch((err) => {
      })
      .finally(() => {
        this.setLoading(false);
      });
  };

  @action searchSharingUsers = (userId, token, searchInput) => {
    APICommonService.searchSharingUsers(userId, token, searchInput)
      .then((resp) => {
        console.log("Resp-SearchUsersSharing", resp);
        if (resp.success && resp.data && resp.data.length > 0) {
          this.setUsersSharing(resp.data);
        } else {
          this.setUsersSharing(null);
        }
      })
      .catch((err) => {
        this.setUsersSharing(null);
      })
      .finally(() => {
        this.setLoading(false);
      });
  };
  
  @action submitSharingDataV2 = (userId, token, projectId, body) => {
    this.setLoading(true);
    APICommonService.submitSharingDataV2(userId, token, projectId, body)
      .then((resp) => {
        console.log("Resp-submitSharingDataV2", resp);
        this.setRespSubmitSharingData(resp);
      })
      .catch((err) => {
        this.setRespSubmitSharingData(err);
      })
      .finally(() => {
        this.setLoading(false);
      });
  };

  @action submitUpdateSharingData = (userId, token, id, sharedId, sharedRole) => {
    this.setLoading(true);
    APICommonService.updateSharingData(userId, token, id, sharedId, sharedRole)
      .then((resp) => {
        console.log("Resp-UpdateSharing", resp);
        this.setRespSubmitSharingData(resp);
      })
      .catch((err) => {
        this.setRespSubmitSharingData(err);
      })
      .finally(() => {
        this.setLoading(false);
      });
  };

  @action
  setSharingsData = (data) => {
    this.sharingsData = data;
  };

  @action
  setSharingProjects = (data) => {
    this.sharingProjects = data;
  };

  @action
  setCurrentSharingData = (data) => {
    this.currentSharingData = data;
  };

  @action
  setUsersSharing = (data) => {
    this.usersSharing = data;
  };

  @action
  setSelectedUserSharing = (user) => {
    this.selectedUserSharing = user;
  };

  @action
  setSelectedUsersSharing = (users) => {
    this.selectedUsersSharing = users;
  };

  @action
  setErrSharingData = (err) => {
    this.errSharingData = err;
  };

  @action
  setRespDeleteSharingData = (resp) => {
    this.respDeleteSharingData = resp;
  };

  @action
  setRespSubmitSharingData = (resp) => {
    this.respSubmitSharingData = resp;
  };

  @action
  setSelectedProject = (proj) => {
    this.selectedProject = proj;
  };
}

export { SharingAccountStore };
