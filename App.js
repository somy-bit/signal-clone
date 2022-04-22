import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { HomeScreen } from './screens/HomeScreen';
import { CreateChatScreen } from './screens/CreateChatScreen';
import { ChatScreen } from './screens/ChatScreen';


const Stack = createNativeStackNavigator();
const headStyle ={
  headerStyle:{
    backgroundColor:'#2c6bed'
  },
  headerTintColor:'white',
  headerTitleStyle:{color:'white'}
}

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='Login' screenOptions={headStyle}>
        <Stack.Screen  name='Login' component={LoginScreen}
            options={{title:'Login'}}
        />
         <Stack.Screen  name='Register' component={RegisterScreen}
            options={{title:'Register'}}
        />
         <Stack.Screen  name='Home' component={HomeScreen}
            
        />
        <Stack.Screen name='CreateChat' component={CreateChatScreen} />
        <Stack.Screen name='chatScreen' component={ChatScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

