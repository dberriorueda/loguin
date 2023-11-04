import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Loguin from './componentes/Loguin';
import Opciones from './componentes/opciones';
import RegistroCarros from './componentes/RegistrarCarro';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Loguin'
      >
        <Stack.Screen name="Loguin" component={Loguin} options={{title:'Inicio de Sesion'}}/>
        <Stack.Screen name="Opciones" component={Opciones} options={{title:'Pantalla Principal'}}/>
        <Stack.Screen name="RegistroCarros" component={RegistroCarros} options={{title: 'RegistroCarros'}}/>
      </Stack.Navigator>  
    </NavigationContainer>
  );
}
