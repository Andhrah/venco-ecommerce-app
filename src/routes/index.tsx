import React, {useEffect} from 'react';
import { Platform } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-remix-icon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Login from '../components/auth/Login';
import Profile from '../components/account/Profile';
import Favourites from '../components/products/Favourites';
import Cart from '../components/products/Cart';
import Products from '../components/products/Products';
import EditProfile from '../components/account/EditProfile';
import Product from '../components/products/Product';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * Props for TabBarIcon component.
 */
type TabIconProps = {
  focused: boolean;
  color: string;
  size: number;
  route: any;
}

const AppFirstLaunch = (props: any) => {

  useEffect(() => {
    isLoggedIn();
  });
  const isLoggedIn = async() => {

    const userToken = await AsyncStorage.getItem('token');

    if (userToken) {
      props.navigation.navigate('Tab');
    } else {
      props.navigation.navigate('Login');
    }
  };
  return (
    <></>
  );
};

/**
 * Component for rendering the tab screens.
 */
const TabScreens = ():JSX.Element => {
  /**
   * Renders the icon for the tab bar.
   * @param {TabIconProps} props - The props for the component.
   * @returns {JSX.Element} The rendered icon component.
   */
  const renderTabBarIcon = ({ focused, color, size, route }: TabIconProps): JSX.Element => {
    let iconName = '';
    if (route.name === 'Products') {
      iconName = 'search-line';
    } else if (route.name === 'Cart') {
      iconName = 'shopping-cart-2-fill';
    } else if (route.name === 'Favourites') {
      iconName = 'heart-3-fill';
    } else if (route.name === 'Profile') {
      iconName = 'user-3-fill';
    }
    return <Icon name={iconName} size={size} color={color} focused={focused} />;
  };

  return (
    <Tab.Navigator initialRouteName="Profile"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => renderTabBarIcon({ focused, color, size, route }),
        tabBarActiveTintColor: '#016aec',
        tabBarInactiveTintColor: '#A3ADBA',
        headerShown: false,
        tabBarStyle: {
          paddingTop: 10,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          height: hp(7),
        },
      })}
    >
      <Tab.Screen name="Products" component={Products} options={{ tabBarLabel: 'Explore' }} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Favourites" component={Favourites} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

/**
 * The main app component.
 * @returns {JSX.Element} The rendered app component.
 */
const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {/* <Stack.Screen name="Product" component={Product} /> */}
        <Stack.Screen name="AppFirstLaunch" component={AppFirstLaunch} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Tab" component={TabScreens} />
        <Stack.Screen name="EditProfile" component={EditProfile} />

        <Stack.Screen name="Product" component={Product} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
