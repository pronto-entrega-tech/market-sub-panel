import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';
import React from 'react';
import Orders from '~/pages/Orders';
import { NavigationContainer } from '@react-navigation/native';
import Loading from '~/components/Loading';
import { myColors } from '~/constants/myColors';
import Confirmation from '~/pages/Confirmation';
import Profile from '~/pages/Profile';
import OrderDetails from '~/pages/OrderDetails';
import { RootParamList } from './types';
import Devices from '~/pages/Devices';
import Notifications from '~/pages/Notifications';
import Tasks from '~/pages/Tasks';
import MyIcon, { IconName, iconNames } from '~/components/MyIcon';

const createTabBarIcon = (name: IconName) => {
  const outlineName = `${name}-outline` as IconName;

  const TabBarIcon = ({
    focused,
    color,
  }: {
    focused: boolean;
    color: string;
  }) => (
    <MyIcon
      name={focused || !iconNames.includes(outlineName) ? name : outlineName}
      color={color}
      size={24}
    />
  );
  return TabBarIcon;
};

export const myScreenOptions: StackNavigationOptions = {
  headerShown: false,
  ...TransitionPresets.SlideFromRightIOS,
};

const Tab = createMaterialBottomTabNavigator();
const ConfirmationStack = createStackNavigator<RootParamList>();
const OrdersStack = createStackNavigator<RootParamList>();
const ProfileStack = createStackNavigator<RootParamList>();

const ConfirmationTab = () => (
  <ConfirmationStack.Navigator screenOptions={myScreenOptions}>
    <ConfirmationStack.Screen name='Confirmation' component={Confirmation} />
  </ConfirmationStack.Navigator>
);

const OrdersTab = () => (
  <OrdersStack.Navigator screenOptions={myScreenOptions}>
    <OrdersStack.Screen name='Orders' component={Orders} />
    <OrdersStack.Screen name='OrderDetails' component={OrderDetails} />
  </OrdersStack.Navigator>
);

const ProfileTab = () => (
  <ProfileStack.Navigator screenOptions={myScreenOptions}>
    <ProfileStack.Screen name='Profile' component={Profile} />
    <ProfileStack.Screen name='Tasks' component={Tasks} />
    <ProfileStack.Screen name='Notifications' component={Notifications} />
    <ProfileStack.Screen name='Devices' component={Devices} />
  </ProfileStack.Navigator>
);

const BottomTabs = () => (
  <NavigationContainer
    fallback={<Loading />}
    theme={{
      dark: false,
      colors: {
        primary: myColors.primaryColor,
        background: myColors.background,
        card: 'white',
        text: myColors.text,
        border: myColors.primaryColor,
        notification: 'gray',
      },
    }}>
    <Tab.Navigator
      initialRouteName='OrdersTab'
      activeColor={myColors.primaryColor}
      barStyle={{ backgroundColor: 'white' }}
      screenOptions={myScreenOptions}>
      <Tab.Screen
        name='ConfirmationTab'
        options={{
          tabBarLabel: 'Confirmação',
          tabBarIcon: createTabBarIcon('qrcode-scan'),
        }}
        component={ConfirmationTab}
      />
      <Tab.Screen
        name='OrdersTab'
        options={{
          tabBarLabel: 'Pedidos',
          tabBarIcon: createTabBarIcon('shopping'),
        }}
        component={OrdersTab}
      />
      <Tab.Screen
        name='ProfileTab'
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: createTabBarIcon('account'),
        }}
        component={ProfileTab}
      />
    </Tab.Navigator>
  </NavigationContainer>
);

export default BottomTabs;
