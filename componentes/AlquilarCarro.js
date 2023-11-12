import React from "react";
import { View, Text, ScrollView, TouchableWithoutFeedback} from "react-native";
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button, } from "react-native-paper";
import { useState } from "react";
import { styles } from "../assets/estilos/alistyle";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
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
    const [selectedDate, setSelectedDate] = useState(null)
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

     //Funcion para mostrar fecha
     const mostrarFecha = () => {
        setDatePickerVisible(true)
    }
    const ocultarFecha = () => {
        setDatePickerVisible(false)
    }
    const confirmarFecha = (date) => {
        setSelectedDate(date)
        ocultarFecha()
    }

    const onSubmit = async (data) => {
        const isValid = !errors.numeroAlquiler && !errors.nombreUsuario && !errors.numeroPlaca && selectedDate
        if (isValid) {
            //Crear registro de alquiler
            const alquilerCollection = collection(db, 'alquileres')
            const nuevoAlquiler = {
                numeroAlquiler: data.nuevoAlquiler,
                nombreUsuario: data.nombreUsuario,
                numeroPlaca: data.numeroPlaca,
                fechaAlquiler: selectedDate,
            }     
            try {
                await addDoc(alquilerCollection, nuevoAlquiler)
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

            <TouchableWithoutFeedback onPress={mostrarFecha}>
                <Controller
                    control={control}
                    render={({ field: {onChange, onBlur, value}}) => (
                        <TextInput
                            label="Fecha de alquiler"
                            onBlur={onBlur}
                            value={value ? value.toString() : ''}
                            error={errors.fechaAlquiler ? true : false}
                        />
                    )}
                    name="fechaAlquiler"
                    rules={{
                        required: "Este campo es obligatorio"
                    }}
                />
            </TouchableWithoutFeedback>

            <Button
                mode="contained"
                style={{ marginTop: 20}}
                onPress={handleSubmit(onSubmit)}
            >
                Alquilar
            </Button>
            {message && (
                <Text style={{ color: messageColor ? 'green' : 'red', marginTop:20}}>
                    {message}
                </Text>
            )}

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={confirmarFecha}
                onCancel={ocultarFecha}
            />
        </ScrollView>
    )
}
