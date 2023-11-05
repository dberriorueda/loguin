import React from "react";
import { View, Text, ScrollView, StyleSheet, FlatList} from "react-native";
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button } from "react-native-paper";
import { useState } from "react";
import { styles } from "../assets/estilos/alistyle";

import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebaseconfig";

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)

export default function AlquilarCarro({ route }) {
    const {control, handleSubmit, formState} = useForm()
    const { errors} = formState
    const [message, setMessage] = useState('')
    const [messageColor, setMessageColor] = useState(true)

    const onSubmit = async (data) => {
        const isValid = !errors.numeroAlquiler && !errors.nombreUsuario && !errors.numeroPlaca && !errors.fechaAlquiler
        if (isValid) {
            //Crear registro de alquiler
            const alquilerCollection = collection(db, 'alquileres')
            const nuevoAlquiler = {
                numeroAlquiler: data.nuevoAlquiler,
                nombreUsuario: data.nombreUsuario,
                numeroPlaca: data.numeroPlaca,
                fechaAlquiler: data.fechaAlquiler,
            }

            try {
                const docRef = await addDoc (alquilerCollection, nuevoAlquiler)
                setMessageColor(true)
                setMessage('Alquiler exitoso')
            }catch (error) {
                setMessageColor(false)
                setMessage('Error al realizar el alquiler')
            }
        }else {
            setMessageColor(false)
            setMessage('Verifique los datos del formulario')
        }
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Alquiler de Carro</Text>
            <Controller
            control={control}
            render={({ field: {onChange, onBlur, value}}) => (
                <TextInput
                    label= "Numero de alquiler"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                />
            )}
            name="numeroAlquiler"
            rules={{
                required: true
            }}
            />
             <Controller
            control={control}
            render={({ field: {onChange, onBlur, value}}) => (
                <TextInput
                    label= "Nombre de usuario"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                />
            )}
            name="nombreUsuario"
            rules={{
                required: true
            }}
            />
             <Controller
            control={control}
            render={({ field: {onChange, onBlur, value}}) => (
                <TextInput
                    label= "Numero de placa"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                />
            )}
            name="numeroPlaca"
            rules={{
                required: true
            }}
            />
             <Controller
            control={control}
            render={({ field: {onChange, onBlur, value}}) => (
                <TextInput
                    label= "Fecha de alquiler"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                />
            )}
            name="fechaAlquiler"
            rules={{
                required: true
            }}
            />

            <Button
                style={{ marginTop: 20, backgroundColor: 'red'}}
                icon="content-save"
                mode="outlined"
                onPress={handleSubmit(onSubmit)}
            >
                Alquilar
            </Button>
            {message && (
                <Text style={{ color: messageColor ? 'green' : 'red'}}>{message}</Text>
            )}
        </ScrollView>
    )
}
