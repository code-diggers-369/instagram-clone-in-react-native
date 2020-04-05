import React from 'react';
import { StyleSheet, Image, Text, View, Button, TouchableOpacity } from 'react-native';
import { f, auth, database, storage} from './config/config';
import  { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import feed from './app/screens/feed';
import upload from './app/screens/upload';
import profile from './app/screens/profile';
import userProfile from './app/screens/userProfile';
import comments from './app/screens/comments';
import splash from './app/screens/splash';


// const TabStack = createBottomTabNavigator(
//   {
//     Feed: { screen: feed},
//     Upload: { screen: upload},
//     Profile: { screen: profile}
//   },
// )

// const MainStack = createStackNavigator(
//   {
//     Home: { screen: TabStack },
//     User: { screen: userProfile },
//     Comments: { screen: comments }
//   },
//   {
//     initialRouteName: 'Home',
//     mode: 'modal',
//     headerMode: 'none',
//   }
// )

const App = createBottomTabNavigator(
    {
      Feed: { screen: feed },
      Upload: { screen: upload },
      Profile: { screen: profile },
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          if (routeName === 'Feed') {
            return(
              <Image source={
                focused
                    ? require ('./assets/feed1.png')
                    : require ('./assets/feed.png')
                }
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 40 / 2,
                }}
              />
            );
          } else if (routeName === 'Upload') {
            return(
              <Image source={
                focused
                    ? require ('./assets/upload1.png')
                    : require ('./assets/upload.png')
                }
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 40 / 2,
                }}
              />
            );
          } else if (routeName === 'Profile') {
            return(
              <Image source={
                focused
                    ? require ('./assets/user1.png')
                    : require ('./assets/user.png')
                }
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 40 / 2,
                }}
              />
            );
          }
        },
      }),
        tabBarOptions: {
          activeTintColor: '#42f44b',
          inactiveTintColor: 'gray',
        },
    }
  );

  
const HomeStack = createStackNavigator(
  {
    Home: { screen: App },
    User: { screen: userProfile },
    Comments: { screen: comments }
  },
  {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#42f44b',
        },
        headerTintColor: '#FFFFFF',
        title: 'Feed',
        //Header title
      },
      initialRouteName: 'Home',
      mode: 'modal',
      headerMode: 'none',
    }
);

const splashsc = createSwitchNavigator({
  Splash: splash,
  HomeStack: HomeStack
});

  export default createAppContainer(splashsc);
// export default createAppContainer(MainStack);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});