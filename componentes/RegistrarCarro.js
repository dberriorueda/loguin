import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { ServicioLocal } from "../componentes/ServicioLocal";
import { styles } from "../assets/estilos/alistyle";

export default function RegistroCarros() {
    const { control, handleSubmit, formState, reset } = useForm()
    const { errors } = formState;
    const [registrosGuardados, setRegistrosGuardados] = useState([])
    const [carrosDisponibles, setCarrosDisponibles] = useState([]);
    const [message, setMessage] = useState('')
    const [modoEdicion, setModoEdicion] = useState(false)
    const [registroAEditar, setRegistroAEditar] = useState(null)
    const navigation = useNavigation()
    const [messageColor, setMessageColor] = useState(true)
    const [isloading, setIsloading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [registros, carros] = await Promise.all([
                    AsyncStorage.getItem('registrosGuardados'),
                    ServicioLocal.obtenerCarrosDisponibles()
                ])
                setRegistrosGuardados(JSON.parse(registros) || [])
                setCarrosDisponibles(carros)
            } catch (error) {
                console.error("Error al obtener registros guardados", error.message)
            } finally{
                setIsloading(false)
            }
        }
        fetchData()
    }, [])

    const onSubmit = async (data) => {
        const isValid = !errors.numeroAlquiler && !errors.nombreUsuario && !errors.numeroPlaca && !errors.fechaAlquiler ;
        if (isValid) {
            const nuevoCarro = {
                placa: data.placa,
                brand: data.brand,
                state: 'disponible',
            };
            if (modoEdicion && registroAEditar) {
                // Modo de edición, actualizar el registro existente
                const nuevoRegistro = registrosGuardados.map((registro) =>
                    registro === registroAEditar ? nuevoCarro : registro
                );
                setRegistrosGuardados(nuevoRegistro);
                setModoEdicion(false);
                setRegistroAEditar(null);
                setMessageColor(true);
                setMessage('Modificación exitosa');
            } else {
                // Nuevo registro
                setRegistrosGuardados([...registrosGuardados, nuevoCarro]);
                setMessageColor(true);
                setMessage('Registro exitoso');
            }

            // Guardar en AsyncStorage
            await AsyncStorage.setItem('registrosGuardados', JSON.stringify([...registrosGuardados, nuevoCarro]));
            reset();
            //navigation.navigate('AlquilarCarro', {registrosGuardados})
        } else {
            setMessageColor(false);
            setMessage('Verifique los datos del formulario.');
        }
    };

    const handleModificar = (registro) => {
        if (registro) {
            setRegistroAEditar(registro);
            reset({
                placa: registro.placa || '',
                brand: registro.brand || '',
                state: registro.state || '',
            });
            setModoEdicion(true);
        } else {
            setRegistroAEditar(null);
            reset();
            setModoEdicion(false);
        }
    };
    const eliminarRegistros = async () => {
        try {
            await AsyncStorage.clear()
            setRegistrosGuardados([])
            console.log('Registros eliminados')
        } catch (error) {
            console.error('Error al eliminar el registro: ', error.message)
        }
    }


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Registro de Carros</Text>
            <Controller
                control={control}
                render={({ field: {onChange, onBlur, value}}) => (
                    <TextInput
                        label="Numero de placa"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            
                name="placa"
            
            rules={{
                required:true,
                maxLength: 20,
                minlength: 1,
                pattern: /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'°0-9 -]+$/,
            }}
            />
            {errors.placa?.type === "required" && <Text style={styles.errorText}>Numero de placa es obligatorio.</Text>}
            {errors.placa?.type === "maxlength" && <Text style={styles.errorText}>La longitud debe ser de 20.</Text>}
            {errors.placa?.type === "minlength" && <Text style={styles.errorText}>La longitud mínima debe ser de 1.</Text>}
            {errors.placa?.type === "pattern" && <Text style={styles.errorText}></Text>}

            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label="Marca del Vehiculo"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="brand"
                rules={{
                    required: true,
                    maxLength: 10,
                    minlength: 1,
                    pattern: /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/,
                    // Ingresar numeros para eso se usa el pattern
                }}
            />
            {errors.brand?.type === "required" && <Text style={styles.errorText}>Escribe la marca.</Text>}
            {errors.brand?.type === "maxLength" && <Text style={styles.errorText}>La longitud debe ser de 10.</Text>}
            {errors.brand?.type === "minLength" && <Text style={styles.errorText}>La longitud mínima debe ser de 1</Text>}
            {errors.brand?.type === "pattern" && <Text style={styles.errorText}>.</Text>}

            <Controller
                    control={control}
                    render={({field: { onChange,onBlur, value}}) => (
                        <TextInput
                            label="Estado del vehiculo"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}        
                    name="state"
                    rules={{
                        required:true,
                        maxLength:10,
                        minlength:1,
                        pattern: /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/,
                    }}
            />
            {errors.state?.type === "required" && <Text style={styles.errorText}>Escribe el estado del carro.</Text>}
            {errors.state?.type === "maxLength" && <Text style={styles.errorText}>La longitud debe ser de 10.</Text>}
            {errors.state?.type === "minLength" && <Text style={styles.errorText}>La longitud mínima debe ser de 1.</Text>}
            {errors.state?.type === "pattern" && <Text style={styles.errorText}>.</Text>}

                

                <Button
                    style={{ marginTop: 20, backgroundColor: 'red' }}
                    icon="content-save"
                    mode="outlined"
                    onPress={handleSubmit(onSubmit)}
                >
                    {modoEdicion ? 'Modificar' : 'Guardar'}
                </Button>
                <Button
                    style={{ marginTop: 20, backgroundColor: 'blue'}}
                    icon="delete"
                    mode="outlined"
                    onPress={eliminarRegistros}
                >
                    Eliminar Registros
                </Button>
                {message && (
                    <Text style={{ color: messageColor ? 'green': 'red'}}>{message}</Text>
                )}
                <Text>Registros Guardados</Text>
                {registrosGuardados.map((item, index) =>(
                    <View key={index}>
                        <Text>placa: {item.placa}</Text>
                        <Text>marca: {item.brand}</Text>
                        <Text>estado: {item.state}</Text>
                        <Button onPress={() => handleModificar(item)}>Modificar</Button>
                    </View>
                ))}
            </ScrollView>
        );
    }    
