import React from "react";
import { View, Text, ScrollView, StyleSheet, FlatList} from "react-native";
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button } from "react-native-paper";
import { useState } from "react";
import { styles } from "../assets/estilos/alistyle";
import DateTimePicker from "react-native-modal-datetime-picker";
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
    const [horavisible, setHoravisible] = useState(false)
    const [selectedDate, setSelecteDate] = useState(null)

    const onSubmit = async (data) => {
        const isValid = !errors.numeroAlquiler && !errors.nombreUsuario && !errors.numeroPlaca && !errors.fechaAlquiler
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
    //Funcion para mostrar fecha
    const mostrarFecha = () => {
        setHoravisible(true)
    }
    const ocultarFecha = () => {
        setHoravisible(false)
    }
    const confirmarFecha = (Date) => {
        setSelecteDate(Date)
        ocultarFecha()
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
            <Button title="Seleccionar Fecha" onPress={mostrarFecha}/>
            <TextInput
                label="Fecha de alquiler"
                value={selectedDate ? selectedDate.toDateString() : "Seleccionar fecha"}
                onTouchStart={mostrarFecha}
            />
            <DateTimePicker
                isVisible={horavisible}
                mode="date"
                display="calendar"
                onConfirm={confirmarFecha}
                onCancel={ocultarFecha}
            />

            <Button
                title="Alquilar"
                onPress={handleSubmit(onSubmit)}
            />
            {message && (
                <Text style={{ color: messageColor ? 'green' : 'red'}}>{message}</Text>
            )}
        </ScrollView>
    )
}
