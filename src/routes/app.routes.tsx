import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dash from '../pages/Dashboard';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
    <App.Navigator screenOptions={{ headerShown: true, cardStyle: { backgroundColor: '#312E38'},}}>
        <App.Screen name="Dash" component={Dash}/>
    </App.Navigator>
);

export default AppRoutes;