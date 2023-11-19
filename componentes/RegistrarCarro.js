    import React from "react";
    import { View, Text, ScrollView, StyleSheet, FlatList} from "react-native";
    import { useForm, Controller } from 'react-hook-form';
    import { TextInput, Button } from "react-native-paper";
    import { useState } from "react";
    import { styles } from "../assets/estilos/alistyle";
    import { useNavigation } from "@react-navigation/native";
    //firebase
    import {getFirestore, collection, addDoc} from 'firebase/firestore';
    import { initializeApp } from "firebase/app";
    import { firebaseConfig } from "../firebaseconfig";

    const firebaseApp = initializeApp(firebaseConfig);
    const db = getFirestore(firebaseApp)

    export default function RegistroCarros({ route}){
        const {control, handleSubmit,formState} = useForm();
        const {errors} = formState;
        const [registrosGuardados, setRegistrosGuardados] = useState([])
        const [message, setMessage] = useState('');
        const [ modoEdicion, setModoEdicion] = useState(false)
        const [registroAEditar, setRegistroAEditar] = useState(null)

        if (route && route.params && route.params.nombreusuario) {
            const { nombreusuario } = route.params
            const navigation = useNavigation()
            const [messageColor, setMessageColor] = useState(true);
        }else {
            console.log('Los parametros no se pasaron correctamente.')
        }
        const onSubmit = async (data) => {
            const isValid = !errors.placa && !errors.brand && !errors.state;
            if(isValid) {
                const nuevoCarro = {
                    placa: data.placa,
                    brand: data.brand,
                    state: data.state,
                };
                if (modoEdicion && registroAEditar) {
                    //Modo de edicion, actualizar el registro existente
                    const nuevoRegistro = registrosGuardados.map((regstro) =>
                        regstro === registroAEditar ? nuevoCarro : regstro
                    )
                    setRegistrosGuardados(nuevoRegistro)
                    setModoEdicion(false)
                    setRegistroAEditar(null)
                    setMessageColor(true)
                    setMessage('Modificacion exitosa')
                }else {
                    setRegistrosGuardados([...registrosGuardados, nuevoCarro])
                    setMessageColor(true)
                    setMessage('Registro exitoso')
                }
        }else {
            setMessageColor(false)
            setMessage('Verifique los datos del formulario. ')
        }
    
    };
    const handleModificar = (regstro) => {
        control.setValues('placa', registro.placa)
        control.setValue('brand', registro.brand)
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
                    Guardar
                </Button>
                <Button
                    style={{ marginTop: 20, backgroundColor: 'yellow'}}
                    icon="content-save"
                    mode="outlined"
                    onPress={handleSubmit(onSubmit)}
                >
                    Modificar
                </Button>
                {message && (
                    <Text style={{ color: messageColor ? 'green' : 'red'}}>{message}</Text>
                )}
                <Text>Registros Guardados</Text>
                <FlatList
                    data={registrosGuardados}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item}) => (
                        <View>
                            <Text>placa: {item.placa}</Text>
                            <Text>marca: {item.brand}</Text>
                            <Text>estado: {item.state}</Text>
                        </View>    
                    )}
                />
                <FlatList
                />
            </ScrollView>
        );
    }    
