import { useState, useEffect} from "react";
import { View,Text } from "react-native";
import { TextInput, Avatar, Button } from "react-native-paper";
import { styles } from "../assets/estilos/alistyle";
//firebase
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../firebaseconfig';

export default function Loguin({navigation}){
    const [nombreusuario, setNombreUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPass,setShowpass] = useState(false)
    const [messageColor, setMessageColor] = useState(true)

    //Definir constantes para la autenticacion
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app)

    const generalNombre = () =>{
        const nombreUnico = "user" + Math.floor(Math.random() * 10000);
        return nombreUnico;

    };
    //Metodos para crear cuenta en firebase authentication y signIn
    const handleCreateAccount = ()=>{
        const nombreUnico = generalNombre();
        createUserWithEmailAndPassword(auth,nombreusuario + "@myapp.com",password)
        .then(async (userCredential)=>{
            //console.log(userCredential.user.providerData)
            await updateProfile(userCredential.user,{
                displayName: nombreUnico,
            });
            setMessageColor(true)
            setMessage("Usuario registrado ...")
        })
        .catch((error)=>{
            //console.log(error.message)
            setMessage("Error al crear usuario ... Intentelo de nuevo")
            setMessageColor(false)
        });
    }
    const handleSignIn = ()=>{
        signInWithEmailAndPassword(auth, nombreusuario + "@myapp.com", password)
        .then((userCredential)=>{
            console.log("Usuario registrado...");
            navigation.navigate('Home', {nombreusuario:nombreusuario})
        })
        .catch((error)=>{
            //console.log(error.message)
            setMessage("contraseña incorrecta.");
            setMessageColor(false)
        })
    }

    return(
        <View style={styles.container}>
        <Avatar.Image
            style={{ marginBottom: 20  }}
            size={160}
            source={require('../assets/imgs/alquiler1.jpg')} />
        <View style={{ borderWidth: 10, borderColor: 'gray', borderRadius: 20, padding: 45 }}>
            <TextInput
                autoFocus
                label="Nombre de Usuario"
                left={<TextInput.Icon icon="account" />}
                onChangeText={(nombreusuario) => setNombreUsuario(nombreusuario)}
                value={nombreusuario}
            />
            <TextInput
                style={{ marginTop: 10 }}
                label="Contraseña"
                secureTextEntry ={!showPass}
                onChangeText={(password) => setPassword(password)}
                value={password}
                right={<TextInput.Icon icon={showPass ? "eye" : "eye-off"} onPress={()=> setShowpass(!showPass)} />}
            />
            <Button
                style={{ marginTop: 10, backgroundColor: 'orange' }}
                icon="login"
                mode="outlined"
                onPress={handleSignIn}
            >
                Iniciar Sesión
            </Button>
            <Button
                style={{ marginTop: 20, backgroundColor: 'yellow' }}
                icon="account"
                mode="outlined"
                onPress={handleCreateAccount}
            >
                Crear Usuario
            </Button>
            <Text style={{ marginTop: 5, color: messageColor?'green': 'red'}}>{message}</Text>
        </View>
    </View>
  );
}
