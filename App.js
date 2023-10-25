import { StyleSheet, Text, View } from 'react-native';
import { styles } from './assets/estilos/alistyle';
import Loguin from './componentes/Loguin';
import HomeScreen from './componentes/HomeScreen';
import AlquilerScreen from './AlquilerScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegistroCarrosScreen from './componentes/RegistroCarros';
import ChooseOptionsScreen from './ChooseOptionsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
      >
        <Stack.Screen name="Login" component={Loguin} options={{title:'Inicio de Sesion'}}/>
        <Stack.Screen name="Home" component={HomeScreen} initialParams={{nombreusuario: 'nombreusuario'}}options={{title:'Pantalla Principal'}}/>
        <Stack.Screen name="ChooseOptions" component={ChooseOptionsScreen} options={{title: 'Elegir opcion'}}/>
        <Stack.Screen name="RegistroCarros" component={RegistroCarrosScreen} options={{ title: 'Registrar Carros' }} />
        <Stack.Screen name="Alquiler" component={AlquilerScreen} options={{ title: 'Alquilar' }} /> 
      </Stack.Navigator>  
    </NavigationContainer>
  );
}
