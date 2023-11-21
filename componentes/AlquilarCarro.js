import React, { useEffect, useState } from "react";
import { Text, ScrollView } from "react-native";
import { useForm, Controller, reset } from 'react-hook-form';
import { TextInput, Button } from "react-native-paper";
import { styles } from "../assets/estilos/alistyle";
import { ServicioLocal } from "../componentes/ServicioLocal";

export default function AlquilarCarro({ route }) {
    const { control, handleSubmit, formState } = useForm()
    const { errors } = formState
    const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState('')
    const [messageColor, setMessageColor] = useState('')
    const [carrosDisponibles, setCarrosDisponibles] = useState([])

    useEffect(() => {
        const fetchCarrosDisponibles = async () => {
            setIsLoading(true)
            try {
                const carros = await ServicioLocal.obtenerCarrosDisponibles()
                setCarrosDisponibles(carros)
            } catch (error) {
                console.error('Error al obtener carros disponibles: ', error.message)
            }finally {
                setIsLoading(false)
            }
               
        }
        fetchCarrosDisponibles()
    }, [route.params?.registrosGuardados])

    const showMessage = (Text, color) => {
        setMessage(Text)
        setMessageColor(color)
    }

    const onSubmit = async (data) => {
        const isValid = !errors.numeroAlquiler && !errors.nombreUsuario && !errors.numeroPlaca && !errors.fechaAlquiler;
        if (isValid) {
            try {
                setIsLoading(true)
                const carroDisponible = await verificarDisponibilidad(data.numeroPlaca)
                if (carroDisponible) {
                    await realizarAlquiler(data.numeroPlaca)
                    showMessage('Alquiler exitoso', 'green')
                    reset()
                }else {
                    showMessage('El carro no esta disponible para alquilar', 'red')
                }
            } catch (error) {
                showMessage('Error al realizar el alquiler', 'red')
                showMessage('Error al realizar el alquiler', error.message)
            } finally {
                setIsLoading(false)
            }
        } else {
            showMessage('Verifica los datos del formulario', 'red')
        }
    };

    const verificarDisponibilidad = async (numeroPlaca) => {
        const carrosRegistrados = await ServicioLocal.obtenerCarrosDisponibles()
        return carrosRegistrados.some((carro) => carro.placa === numeroPlaca)
    }

    // Función para verificar el estado del carro
    const realizarAlquiler= async (numeroPlaca) => {
        await ServicioLocal.actualizarEstadoCarro(numeroPlaca, 'No disponible')
        const nuevosCarrosDisponibles = carrosDisponibles.filter((carro) =>carro.placa !== numeroPlaca)
        setCarrosDisponibles(nuevosCarrosDisponibles)
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
            <Text>Carros disponibles:</Text>
            <ScrollView>
                {carrosDisponibles.map((carro, index) => (
                    <Text key={index}>{carro.placa} - {carro.brand}</Text>
                ))}
            </ScrollView>
        </ScrollView>   
    )
}         
