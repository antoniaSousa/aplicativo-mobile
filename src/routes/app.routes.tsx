import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';


const App = createStackNavigator();

const AuthRoutes: React.FC = () => (
    <App.Navigator
        screenOptions={{
            // headerShown: false,
            headerTitle: 'Gobarber',
            cardStyle: { backgroundColor: '#312e38'},
        }}
        // initialRouteName="SignUp"
     >
        <App.Screen name="SignIn" component={Dashboard}/>

    </App.Navigator>
);

export default AuthRoutes;
