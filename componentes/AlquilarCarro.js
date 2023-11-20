import React, { useState } from "react";
import { Text, ScrollView } from "react-native";
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button } from "react-native-paper";
import { styles } from "../assets/estilos/alistyle";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebaseconfig";

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default function AlquilarCarro({ route }) {
    const { control, handleSubmit, formState } = useForm();
    const { errors } = formState;
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const onSubmit = async (data) => {
        const isValid = !errors.numeroAlquiler && !errors.nombreUsuario && !errors.numeroPlaca && !errors.fechaAlquiler;
        if (isValid) {
            try {
                const carroDisponible = verificarDisponibilidad(data.numeroPlaca);
                if (carroDisponible) {
                    const alquilerCollection = collection(db, 'alquileres');
                    const nuevoAlquiler = {
                        numeroAlquiler: data.numeroAlquiler,
                        nombreUsuario: data.nombreUsuario,
                        numeroPlaca: data.numeroPlaca,
                        fechaAlquiler: data.fechaAlquiler,
                    };
                    await addDoc(alquilerCollection, nuevoAlquiler);
                    setMessageColor('green');
                    setMessage('Alquiler exitoso');
                } else {
                    setMessageColor('red');
                    setMessage('El carro no está disponible para alquilar');
                }
            } catch (error) {
                setMessageColor('red');
                setMessage('Error al realizar el alquiler');
            }
        } else {
            setMessageColor('red');
            setMessage('Verifica los datos del formulario');
        }
    };

    // Función para verificar el estado del carro
    const verificarDisponibilidad = async (numeroPlaca) => {
        // Aquí debes obtener tus registros desde tu fuente de datos, 
        // ya sea un estado local o una llamada a la base de datos.
        const registrosGuardados = []; // Debes proporcionar los datos reales aquí

        const carro = registrosGuardados.find((carro) => carro.placa === numeroPlaca);
        return carro && carro.state === 'disponible';
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Alquiler de Carros</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label="Numero de alquiler"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="numeroAlquiler"
                rules={{
                    required: true,
                    maxLength: 20,
                    minLength: 1,
                    pattern: /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'°0-9 -]+$/,
                }}
            />
            {errors.numeroAlquiler?.type === "required" && <Text style={styles.errorText}>Numero de alquiler es obligatorio.</Text>}
            {errors.numeroAlquiler?.type === "maxLength" && <Text style={styles.errorText}>La longitud debe ser de 20.</Text>}
            {errors.numeroAlquiler?.type === "minLength" && <Text style={styles.errorText}>La longitus minima es de 1.</Text>}
            {errors.numeroAlquiler?.type === "pattern" && <Text style={styles.errorText}></Text>}

            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label="Nombre de usuario"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="nombreUsuario"
                rules={{
                    required: true,
                    maxLength: 25,
                    minLength: 1,
                    pattern: /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/,
                }}
            />
            {errors.nombreUsuario?.type === "required" && <Text style={styles.errorText}>El nombre de usuario es obligatorio.</Text>}
            {errors.nombreUsuario?.type === "maxLength" && <Text style={styles.errorText}>La longitud debe ser de 25.</Text>}
            {errors.nombreUsuario?.type === "minLength" && <Text style={styles.errorText}>La longitus minima es de 1.</Text>}
            {errors.nombreUsuario?.type === "pattern" && <Text style={styles.errorText}></Text>}

            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label="Numero de placa"
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
            {errors.numeroPlaca?.type === "required" && <Text style={styles.errorText}>Numero de placa es obligatorio.</Text>}
            {errors.numeroPlaca?.type === "maxLength" && <Text style={styles.errorText}>La longitud debe ser de 20.</Text>}
            {errors.numeroPlaca?.type === "minLength" && <Text style={styles.errorText}>La longitud mínima debe ser de 1.</Text>}
            {errors.numeroPlaca?.type === "pattern" && <Text style={styles.errorText}></Text>}

            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label="Fecha de alquiler"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="fechaAlquiler"
                rules={{
                    required: true,
                    maxLength: 20,
                    minLength: 1,
                    pattern: /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'°0-9 -]+$/,
                }}
            />
            {errors.fechaAlquiler?.type === "required" && <Text style={styles.errorText}>La fecha es obligatoria.</Text>}
            {errors.fechaAlquiler?.type === "maxLength" && <Text style={styles.errorText}>La longitud debe ser de 20.</Text>}
            {errors.fechaAlquiler?.type === "minLength" && <Text style={styles.errorText}>La longitud mínima debe ser de 1.</Text>}
            {errors.fechaAlquiler?.type === "pattern" && <Text style={styles.errorText}>.</Text>}
            <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.Button}>
                Alquilar
            </Button>
            {message ? (
                <Text style={{ color: messageColor, marginTop:10}}>{message}</Text>
            ) : null}
        </ScrollView>   
    )
}         
