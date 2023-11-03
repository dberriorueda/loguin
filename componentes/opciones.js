import { View, Text, Button, StyleSheet } from "react-native";
import { styles } from "../assets/estilos/alistyle";

export default function Opciones({navigation, route}) {
    const { nombreusuario} = route.params
    const ArrendarCarro = () => {
        navigation.navigate('Arrendarcar')
    }
    const RegistrarCarro = ()=> {
        navigation.navigate('RegistrarCar')
    }

    return (
        <View style={styles.container}>
            <Text>Bienvenido, {nombreusuario}!</Text>
            <Text>Elige una opcion:</Text>
            <Button title="Arrendar Carro" onPress={ArrendarCarro}/>
            <Button title="Registrar Carro" onPress={RegistrarCarro}/>
        </View>
    )
}

