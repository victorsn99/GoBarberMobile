import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dash from '../pages/Dashboard';
import CreateAppointment from '../pages/CreateAppointment';
import CreatedAppointment from '../pages/CreatedAppointment';
import Profile from '../pages/Profile';
import Menu from '../pages/Menu';
import About from '../pages/About';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
    <App.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#312E38'},}}>
        <App.Screen name="Dash" component={Dash}/>
        <App.Screen name="Profile" component={Profile}/>
        <App.Screen name="Menu" component={Menu}/>
        <App.Screen name="About" component={About}/>
        <App.Screen name="CreateAppointment" component={CreateAppointment}/>
        <App.Screen name="CreatedAppointment" component={CreatedAppointment}/>
    </App.Navigator>
);

export default AppRoutes;