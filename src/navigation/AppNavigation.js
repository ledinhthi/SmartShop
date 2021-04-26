import {
  createDrawerNavigator
} from "@react-navigation/drawer";
import {
  CardStyleInterpolators,
  createStackNavigator
} from "@react-navigation/stack";
import {
  createBottomTabNavigator
} from "@react-navigation/bottom-tabs"
import * as React from "react";
import { Image, View } from 'react-native'
import { MainPage } from "../screens/MainPage"
import { DetailProduct } from "../screens/DetailProduct"
import { Product } from "../screens/Product"
import { BasketStore } from "../screens/BasketStore"
import { Videos } from "../screens/Videos"
import { OrderPage } from "../screens/OrderPage"
import Constant from "../utils/Constants"
import ColorApp from "../utils/ColorApp";

const Drawer = createDrawerNavigator();
const DashboardStack = createStackNavigator();

const MainStack = createStackNavigator();

const BottomTab = createBottomTabNavigator();
const MainPageStack = (props) => {
  return (
    <MainStack.Navigator >
      {/* Show list product */}
      <MainStack.Screen
        options={
          {
            headerShown: false
          }
        }
        name={Constant.PAGE_KEY.LIST_PRODUCT_PAGE_KEY} component={MainPage}>
      </MainStack.Screen>
      {/* Show detail product */}
      <MainStack.Screen
        options={
          {
            headerTitle: 'Chi tiết sản phẩm'
          }
        }
        name={Constant.PAGE_KEY.DETAIL_PRODUCT_PAGE_KEY} component={DetailProduct}>
      </MainStack.Screen>
    </MainStack.Navigator>
  )
}
const BasketStack = createStackNavigator();
const BasketPageStack = (props) => {
  return (
    <BasketStack.Navigator >
      {/* Show list product */}
      <BasketStack.Screen
        options={
          {
            headerShown: false
          }
        }
        name={Constant.PAGE_KEY.BASKET_DETAIL_PAGE_KEY} component={BasketStore}>
      </BasketStack.Screen>

    </BasketStack.Navigator>
  )
}

const SubDashboard = () => {
  return (
    <BottomTab.Navigator initialRouteName={Constant.PAGE_KEY.MAIN_PAGE_KEY}
      tabBarOptions={{
        activeTintColor: ColorApp.yellow,
        tabStyle: { paddingVertical: 4 },
      }}
      screenOptions={({ route }) => ({
        // tabBarVisible: MainStore.isHideBottomBar,
        tabBarIcon: ({ focused }) => {

          let url = "";
          if (route.name == Constant.PAGE_KEY.MAIN_PAGE_KEY) {
            url = "../../images/star.png"
          }
          else if (route.name == Constant.PAGE_KEY.DETAIL_PRODUCT_PAGE_KEY) {
            url = "../../images/star.png"
          }
          else if (route.name == Constant.PAGE_KEY.BASKET_PAGE_KEY) {
            url = "../../images/star.png"
          }
          else if (route.name == Constant.PAGE_KEY.VIDEO_PAGE_KEY) {
            url = "../../images/star.png"
          }
          return (
            <View style={{ alignSelf: 'center' }}>
              <Image style={{ width: 20, height: 20, tintColor: focused ? ColorApp.yellow : ColorApp.gray1D2129 }}
                source={route.name == Constant.PAGE_KEY.MAIN_PAGE_KEY ? require("../../images/star.png")
                  : route.name == Constant.PAGE_KEY.DETAIL_PRODUCT_PAGE_KEY ? require("../../images/star.png")
                    : route.name == Constant.PAGE_KEY.BASKET_PAGE_KEY ? require("../../images/star.png") : require("../../images/star.png")}
                resizeMode={'contain'}

              >
              </Image>
            </View>
          )
        }
      })}
    >
      {/* Main page*/}
      <BottomTab.Screen 
      name={Constant.PAGE_KEY.MAIN_PAGE_KEY} component={MainPageStack}>
      </BottomTab.Screen>
      {/* Giỏ hàng */}
      <BottomTab.Screen
        name={Constant.PAGE_KEY.BASKET_PAGE_KEY} component={BasketPageStack}>
      </BottomTab.Screen>
      {/* Videos */}
      <BottomTab.Screen name={Constant.PAGE_KEY.VIDEO_PAGE_KEY} component={Videos}>
      </BottomTab.Screen>
    </BottomTab.Navigator>
  )
}

export const Dashboard = () => {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen
      options = {{
        headerShown: false
      }}
        name={Constant.PAGE_KEY.MAIN_DASKBOARD}
        component={SubDashboard}>

      </DashboardStack.Screen>
      <DashboardStack.Screen options={
        {
          headerTitle: 'Đặt hàng'
        }
      }
        name={Constant.PAGE_KEY.ORDER_PAGE_KEY} component={OrderPage}>

      </DashboardStack.Screen>
    </DashboardStack.Navigator>
  )
}

