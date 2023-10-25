    import { View, Text,} from "react-native";
    import { useForm, Controller } from 'react-hook-form';
    import { TextInput, Button } from "react-native-paper";
    import { useState } from "react";
    //firebase
    import {getFirestore, collection, addDoc} from 'firebase/firestore';
    import { initializeApp } from "firebase/app";
    import { firebaseConfig } from "../firebaseconfig";

    const firebaseApp = initializeApp(firebaseConfig);
    const db = getFirestore(firebaseApp)

    export default function HomeScreen({navigation, route}){
        const {control, handleSubmit,formState} = useForm();
        const {errors} = formState;
        const [message, setMessage] = useState('');
        const [messageColor, setMessageColor] = useState(true);
        const {nombreusuario} = route.params;

        const RegistrarCarro = () =>{
            navigation.navigate('Registrar carro');
        };

        const AlquilarCarro= ()=>{
            navigation.navigate('Alquilar carro');
        };

        const onSubmit = async (data) => {
            const isValid = !errors.placa && !errors.brand && !errors.state;
            if(isValid) {
                const carroscollection = collection(db, 'carros');

                const nuevoCarro = {
                    placa: data.placa,
                    brand: data.brand,
                    state: data.state,
                };

                try{
                await addDoc(carroscollection, nuevoCarro);
                setMessageColor(true);
                setMessage('Carros guardados correctamente')
            }catch(error){
                setMessageColor(false);
                setMessage('Error al guardar el carro. Intentelo de nuevo.');
            }
        }else{
            setMessageColor(false);
            setMessage('Verifica los campos del formulario');
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Bienvenido {route.params.nombreusuario}</Text>
            <Button title="Registrar Carro" onPress={RegistrarCarro}/>
            <Button title="Alquilar Carro" onPress={AlquilarCarro}/>
            <Controller
                control={control}
                rules={{
                        required: true,
                        maxlength: 20,
                        minlength: 1,
                        pattern: /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'°0-9 ]+$/,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            label="Numero de Placa"
                            style={{ fontFamily: 'initial' }}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                )}
                name="placa"
            />
            {errors.placa?.type === "required" && <Text style={{ color: 'red' }}>Numero de placa es obligatorio.</Text>}
            {errors.placa?.type === "maxlength" && <Text style={{ color: 'red' }}>La longitud debe ser de 20.</Text>}
            {errors.placa?.type === "minlength" && <Text style={{ color: 'red' }}>La longitud mínima debe ser de 1.</Text>}
            {errors.placa?.type === "pattern" && <Text style={{ color: 'red' }}>.</Text>}

            <Controller
                control={control}
                rules={{
                        required: true,
                        maxLength: 10,
                        minlength: 1,
                        pattern: /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/,
                        // Ingresar numeros para eso se usa el pattern
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={{ fontFamily: 'initial' }}
                            label="Marca del Vehiculo"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                    />
                )}
                name="brand"
                />
                {errors.brand?.type === "required" && <Text style={{ color: 'red' }}>Escribe la marca.</Text>}
                {errors.brand?.type === "maxLength" && <Text style={{ color: 'red' }}>La longitud debe ser de 10.</Text>}
                {errors.brand?.type === "minLength" && <Text style={{ color: 'red' }}>La longitud mínima debe ser de 1</Text>}
                {errors.brand?.type === "pattern" && <Text style={{ color: 'red' }}>.</Text>}

                <Controller
                    control={control}
                    rules={{
                    required:true,
                    maxLength:10,
                    minlength:1,
                    pattern: /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/,
                    }}
                    render={({field: { onChange,onBlur, value}}) => (
                        <TextInput
                            style={{ fontFamily: 'initial'}}
                            label="Estado del vehiculo"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}

                        />
                    )}
                    name="state"
                />
                {errors.state?.type === "required" && <Text style={{ color: 'red' }}>Escribe el estado del carro.</Text>}
                {errors.state?.type === "maxLength" && <Text style={{ color: 'red' }}>La longitud debe ser de 10.</Text>}
                {errors.state?.type === "minLength" && <Text style={{ color: 'red' }}>La longitud mínima debe ser de 1</Text>}
                {errors.state?.type === "pattern" && <Text style={{ color: 'red' }}>.</Text>}

                

                <Button
                    style={{ marginTop: 20, backgroundColor: 'red' }}
                    icon="content-save"
                    mode="outlined"
                    onPress={handleSubmit(onSubmit)}
                >
                    Guardar
                </Button>
            </View>
        );
    }    
