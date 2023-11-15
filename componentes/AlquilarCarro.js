import React, { useState} from "react";
import { Text, ScrollView, Button} from "react-native";
import { useForm, Controller } from 'react-hook-form';
import { TextInput, } from "react-native-paper";
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

    const showDatePicker = () => {
        setDatePickerVisibility(true)
    }

    const hideDatePicker = () => {
        setDatePickerVisibility(false)
    }

    const handleConfirm = (date) => {
        setSelectedDate(date.toISOString().split('T')[0])
        hideDatePicker()
    }

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
                        error={errors.numeroAlquiler ? true : false}
                    />
                )}
                name="numeroAlquiler"
                rules={{
                    required: "Este campo es obligatorio"
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
                        error={errors.nombreUsuario ? true : false}
                    />
                )}
                name="nombreUsuario"
                rules={{
                    required: "Este campo es obligatorio"
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
                        error={errors.numeroPlaca ? true : false}
                    />
                )}
                name="numeroPlaca"
                rules={{
                    required: "Este campo es obligatorio"
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
                        error={errors.fechaAlquiler ? true : false}
                    />
                )}
                name="fechaalquiler"
                rules={{
                    required: "Este campo es obligatorio"
                }}
            />    
            <Button
                mode="contained"
                style={{ marginTop: 20, backgroundColor: 'blue'}}
                onPress={handleSubmit(onSubmit)}
            >
                Alquilar
            </Button>
            {message && (
                <Text style={{ color: messageColor ? 'green' : 'red', marginTop:20, textAlign: 'center'}}>
                    {message}
                </Text>
            )}
        </ScrollView>
    )
}
