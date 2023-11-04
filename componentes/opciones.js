import { View, Text, Button, StyleSheet } from "react-native";
import { styles } from "../assets/estilos/alistyle";
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { TouchableOpacity } from "react-native-web";
import RegistroCarros from "./RegistrarCarro";


export default function Opciones({navigation, route}) {
    const { nombreusuario} = route.params

    const ArrendarCarro = () => {
        navigation.navigate('AlquilarCarro')
    }
    const RegistroCarros = ()=> {
        navigation.navigate('RegistroCarros')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Bienvenido, {nombreusuario}!</Text>
            <Text>Elige una opcion: </Text>

            <TouchableOpacity
                style={styles.optionContainer}
                onPress={ArrendarCarro}
            >
                <Icon name="car-repair" style={styles.optionIcon}/>
                <Text style={styles.optionText}>Alquilar Carro</Text>

            </TouchableOpacity>
             <TouchableOpacity
                style={styles.optionContainer}
                onPress={RegistroCarros}
            >
                <Icon name="directions-car" style={styles.optionIcon}/>
                <Text style={styles.optionText}>Registrar Carro</Text>

            </TouchableOpacity>
           
        </View>
    )
}

