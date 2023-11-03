import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Loguin from './componentes/Loguin';
import Opciones from './componentes/opciones';
import HomeScreen from './componentes/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Loguin'
      >
        <Stack.Screen name="Loguin" component={Loguin} options={{title:'Inicio de Sesion'}}/>
        <Stack.Screen name="Opciones" component={Opciones} options={{title:'Opciones'}}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{title:'Pantalla Principal'}}/>
      </Stack.Navigator>  
    </NavigationContainer>
  );
}
