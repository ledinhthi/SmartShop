import {
  createDrawerNavigator
} from "@react-navigation/drawer";
import {
  CardStyleInterpolators,
  createStackNavigator
} from "@react-navigation/stack";

import * as React from "react";
import { MainPage } from "../screens/MainPage"
import { DetailProduct } from "../screens/DetailProduct"
import { Product } from "../screens/Product"
import { BasketStore } from "../screens/BasketStore"
import { Videos } from "../screens/Videos"
import Constant from "../utils/Constant"
import ColorApp from "../utils/ColorApp";

const Drawer = createDrawerNavigator();

const MainStack = createStackNavigator();

const MainPageStack = (props) => {
  return (
    <MainStack.Navigator >
      {/* Show list product */}
      <MainStack.Screen 
        options = {
          {
            headerShown: false
          }
        }
      name={Constant.PAGE_KEY.LIST_PRODUCT_PAGE_KEY} component={MainPage}>
      </MainStack.Screen>
      {/* Show detail product */}
      <MainStack.Screen 
      options = {
        {
          headerTitle: 'Chi tiết sản phẩm'
        }
      }
      name={Constant.PAGE_KEY.DETAIL_PRODUCT_PAGE_KEY} component={DetailProduct}>
      </MainStack.Screen>
    </MainStack.Navigator>
  )
}


export const Dashboard = () => {
  return (
    <Drawer.Navigator initialRouteName={Constant.PAGE_KEY.MAIN_PAGE_KEY}
      drawerContentOptions={{
        activeTintColor: ColorApp.yellow,
      }}>
      {/* Main page*/}
      <Drawer.Screen name={Constant.PAGE_KEY.MAIN_PAGE_KEY} component={MainPageStack}>
      </Drawer.Screen>
      {/* Sản phẩm  */}
      <Drawer.Screen name={Constant.PAGE_KEY.PRODUCT_PAGE_KEY} component={Product}>
      </Drawer.Screen>
      {/* Giỏ hàng */}
      <Drawer.Screen 
      options = {
        {
          headerTitle: 'Giỏ Hàng'
        }
      }
      name={Constant.PAGE_KEY.BASKET_PAGE_KEY} component={BasketStore}>
      </Drawer.Screen>
      {/* Videos */}
      <Drawer.Screen name={Constant.PAGE_KEY.VIDEO_PAGE_KEY} component={Videos}>
      </Drawer.Screen>
    </Drawer.Navigator>
  )
}

