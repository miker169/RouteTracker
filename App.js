import React, {useContext} from 'react';
import {
  NavigationContainer,
} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import { Provider as AuthProvider, Context as AuthContext } from './src/context/AuthContext'
import { Provider as LocationProvider } from './src/context/LocationContext'
import { Provider as TrackProvider } from "./src/context/TrackContext";
import { navigationRef } from "./src/navigationRef";
import ResolveAuthScreen from "./src/screens/RevolveAuthScreen";
import { FontAwesome } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LoginFlow = () => {
    const { clearErrorMessage} = useContext(AuthContext);
    return (
        <Stack.Navigator
            screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen
                name="Signup"
                component={SignupScreen}
                listeners={{
                    blur: e => {
                        clearErrorMessage();
                    }
                }}
            />
            <Stack.Screen
                name="Signin"
                component={SigninScreen}
                listeners={{
                    blur: e => {
                        clearErrorMessage();
                    }
                }}
            />
        </Stack.Navigator>
    );
}

const MainFlow = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Tracks"
                component={Track}
                options={{
                    tabBarIcon: () =>  <FontAwesome name="th-list" size={20} />
                }}
            />
            <Tab.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    tabBarIcon: () =>  <FontAwesome name="gear" size={20} />
                }}
            />
            <Tab.Screen
                name="Add Track"
                component={TrackCreateScreen}
                options={{
                    tabBarIcon: () =>  <FontAwesome name="plus" size={20} />
                }}
            />
        </Tab.Navigator>
    );
}

function Track() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Tracks" component={TrackListScreen} />
        <Stack.Screen name="TrackDetails" component={TrackDetailScreen} />
      </Stack.Navigator>
  );
}

const App = () => {
    const {state } = useContext(AuthContext);

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
                {(state.isLoading) ? <Stack.Screen options= {{headerShown: false}} name="TryAuth" component={ResolveAuthScreen} /> : null }
                {state.token ?
                <Stack.Screen options= {{headerShown: false}} name="Main" component={MainFlow} /> :
                <Stack.Screen screenOptions={{headerShown: false}} name="Login" component={LoginFlow}/>
            }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default () => {
  return (
      <LocationProvider>
          <AuthProvider>
              <TrackProvider>
                  <SafeAreaProvider>
                      <App/>
                  </SafeAreaProvider>
              </TrackProvider>
        </AuthProvider>
      </LocationProvider>
  )
}