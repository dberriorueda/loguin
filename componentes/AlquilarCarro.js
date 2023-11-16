import React, { useState} from "react";
import { Text, ScrollView,} from "react-native";
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button} from "react-native-paper";
import { styles } from "../assets/estilos/alistyle";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebaseconfig";




const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)

export default function AlquilarCarro({ route }) {
    const {control, handleSubmit, formState} = useForm()
    const {errors} = formState
    const [message, setMessage] = useState('')
    const [messageColor, setMessageColor] = useState(true)
    const [selectedDate, setSelectedDate] = useState('')

    const onSubmit = async (data) => {
        const isValid = !errors.numeroAlquiler && !errors.nombreUsuario && !errors.numeroPlaca && selectedDate
        if (isValid) {
            //Crear registro de alquiler
            const alquilerCollection = collection(db, 'alquileres')
            const nuevoAlquiler = {
                numeroAlquiler: data.numeroAlquiler,
                nombreUsuario: data.nombreUsuario,
                numeroPlaca: data.numeroPlaca,
                fechaAlquiler: selectedDate,
            }     
            try {
                await addDoc(alquilerCollection, nuevoAlquiler)
                setMessageColor(true)
                setMessage('Alquiler exitoso')
            }catch (error) {
                //console.log('Error al realizar el alquiler:', error)
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
            <Text style={styles.title}>Alquiler de Carros</Text>
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
                    required: true,
                    maxLength:20,
                    minLength:1,
                    pattern: /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'°0-9 -]+$/,
                }}
            />
            {errors.numeroAlquiler?.type === "required" && <Text style={styles.errorText}>Numero de alquiler es obligatorio.</Text>}
            {errors.numeroAlquiler?.type === "maxLength" && <Text style={styles.errorText}>La longitud debe ser de 20.</Text>}
            {errors.numeroAlquiler?.type === "minLength" && <Text style={styles.errorText}>La longitus minima es de 1.</Text>}
            {errors.numeroAlquiler?.type === "pattern" && <Text style={styles.errorText}></Text>}
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
                    required: true,
                    maxLength: 25,
                    minLength:1,
                    pattern: /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/,
                }}
            />
            {errors.nombreUsuario?.type === "required" && <Text style={styles.errorText}>El nombre de usuario es obligatorio.</Text>}
            {errors.nombreUsuario?.type === "maxLength" && <Text style={styles.errorText}>La longitud debe ser de 25.</Text>}
            {errors.nombreUsuario?.type === "minLength" && <Text style={styles.errorText}>La longitus minima es de 1.</Text>}
            {errors.nombreUsuario?.type === "pattern" && <Text style={styles.errorText}></Text>}
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
                    required: true,
                    maxLength: 20,
                    minLength: 1,
                    pattern: /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'°0-9 -]+$/,
                }}
            />
            {errors.placa?.type === "required" && <Text style={styles.errorText}>Numero de placa es obligatorio.</Text>}
            {errors.placa?.type === "maxlength" && <Text style={styles.errorText}>La longitud debe ser de 20.</Text>}
            {errors.placa?.type === "minlength" && <Text style={styles.errorText}>La longitud mínima debe ser de 1.</Text>}
            {errors.placa?.type === "pattern" && <Text style={styles.errorText}></Text>}

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
                name="fechaalquiler"
                rules={{
                    required: true,
                    maxLength: 20,
                    minLength:1,
                    pattern: /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'°0-9 -]+$/,
                }}
            />
            {errors.placa?.type === "required" && <Text style={styles.errorText}>La fecha es obligatorio.</Text>}
            {errors.placa?.type === "maxlength" && <Text style={styles.errorText}>La longitud debe ser de 20.</Text>}
            {errors.placa?.type === "minlength" && <Text style={styles.errorText}>La longitud mínima debe ser de 1.</Text>}
            {errors.placa?.type === "pattern" && <Text style={styles.errorText}></Text>}

            <Button
                style={{ marginTop: 20, backgroundColor: 'blue' }}
                mode="contained"
                onPress={handleSubmit(onSubmit)}
            >
                Alquilar
            </Button>
            {message && (
                <Text style={{ color: messageColor ? 'green' : 'red'}}>
                    {message}
                </Text>
            )}
        </ScrollView>
    )
}
