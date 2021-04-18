import {
  createDrawerNavigator
} from "@react-navigation/drawer";
import {
  CardStyleInterpolators,
  createStackNavigator
} from "@react-navigation/stack";

import * as React from "react";
import { ListProduct } from "../screens/ListProduct"
import { DetailProduct } from "../screens/DetailProduct"
import { Product } from "../screens/Product"
import { BasketStore } from "../screens/BasketStore"
import { Videos } from "../screens/Videos"
import Constant from "../utils/Constant"

const Drawer = createDrawerNavigator();

const MainStack = createStackNavigator();

const MainPage = (props) => {
  return (
    <MainStack.Navigator headerMode = 'none'>
      {/* Show list product */}
      <MainStack.Screen name={Constant.PAGE_KEY.LIST_PRODUCT_PAGE_KEY} component={ListProduct}>
      </MainStack.Screen>
      {/* Show detail product */}
      <MainStack.Screen name={Constant.PAGE_KEY.DETAIL_PRODUCT_PAGE_KEY} component={DetailProduct}>
      </MainStack.Screen>
    </MainStack.Navigator>
  )
}


export const Dashboard = () => {
  return (
    <Drawer.Navigator initialRouteName={Constant.PAGE_KEY.MAIN_PAGE_KEY}
      drawerContentOptions={{
        activeTintColor: '#e91e63',
        itemStyle: { marginVertical: 30 },
      }}>
      {/* Main page*/}
      <Drawer.Screen name={Constant.PAGE_KEY.MAIN_PAGE_KEY} component={MainPage}>
      </Drawer.Screen>
      {/* Sản phẩm  */}
      <Drawer.Screen name={Constant.PAGE_KEY.PRODUCT_PAGE_KEY} component={Product}>
      </Drawer.Screen>
      {/* Giỏ hàng */}
      <Drawer.Screen name={Constant.PAGE_KEY.BASKET_PAGE_KEY} component={BasketStore}>
      </Drawer.Screen>
      {/* Videos */}
      <Drawer.Screen name={Constant.PAGE_KEY.VIDEO_PAGE_KEY} component={Videos}>
      </Drawer.Screen>
    </Drawer.Navigator>
  )
}

