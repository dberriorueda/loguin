import { StyleSheet, Text, View } from 'react-native';
import { styles } from './assets/estilos/alistyle';
import Loguin from './componentes/Loguin';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './componentes/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
      >
        <Stack.Screen name="login" component={Loguin} options={{title:'Inicio de Sesion'}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{title:'Pantalla Principal'}}/>
      </Stack.Navigator>  
    </NavigationContainer>
  );
}

