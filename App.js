import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Loguin from './componentes/Loguin';
import HomeScreen from './componentes/HomeScreen';
import Registrar from './componentes/registrar';
import AlquilerScreen from './componentes/AlquilerScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Loguin'
      >
        <Stack.Screen name="Loguin" component={Loguin} options={{title:'Inicio de Sesion'}}/>
        <Stack.Screen name="Home" component={HomeScreen} initialParams={{nombreusuario: 'nombreusuario'}}options={{title:'Pantalla Principal'}}/>
        <Stack.Screen name="Registrar" component={Registrar} options={{ title: 'Alquilar Carro' }} />
        <Stack.Screen name="AlquilerScreen" component={AlquilerScreen} options={{ title: 'Alquilar Carro' }} />
      </Stack.Navigator>  
    </NavigationContainer>
  );
}
