import React, { useState } from "react";
import { View, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button } from "react-native-paper";
import { getFirestore, collection, addDoc } from "@react-native-firebase/firestore";

// Firebase
import { initializeApp } from "@react-native-firebase/app";
import { firebaseConfig } from "../firebaseconfig";

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default function AlquilerScreen({ navigation, route }) {
  const { control, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState(true);

  const onSubmit = async (data) => {
    const isValid = !errors.placa && !errors.nombreUsuario && !errors.fechaAlquiler;

    if (isValid) {
      const alquilerCollection = collection(db, "alquiler");

      const nuevoAlquiler = {
        placa: data.placa,
        nombreUsuario: data.nombreUsuario,
        fechaAlquiler: data.fechaAlquiler,
      };

      try {
        await addDoc(alquilerCollection, nuevoAlquiler);
        setMessageColor(true);
        setMessage("Alquiler guardado correctamente");
      } catch (error) {
        setMessageColor(false);
        setMessage("Error al guardar el alquiler. Inténtelo de nuevo.");
      }
    } else {
      setMessageColor(false);
      setMessage("Verifica los campos del formulario");
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Bienvenido {route.params.nombreUsuario}</Text>
      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 20,
          minLength: 1,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Número de Placa"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="placa"
      />
      {errors.placa?.type === "required" && (
        <Text style={{ color: "red" }}>Número de placa es obligatorio.</Text>
      )}
      {errors.placa?.type === "maxLength" && (
        <Text style={{ color: "red" }}>La longitud debe ser de 20.</Text>
      )}
      {errors.placa?.type === "minLength" && (
        <Text style={{ color: "red" }}>La longitud mínima debe ser de 1.</Text>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 50,
          minLength: 1,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Nombre del Usuario"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="nombreUsuario"
      />
      {errors.nombreUsuario?.type === "required" && (
        <Text style={{ color: "red" }}>Nombre del usuario es obligatorio.</Text>
      )}
      {errors.nombreUsuario?.type === "maxLength" && (
        <Text style={{ color: "red" }}>La longitud debe ser de 50.</Text>
      )}
      {errors.nombreUsuario?.type === "minLength" && (
        <Text style={{ color: "red" }}>La longitud mínima debe ser de 1.</Text>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Fecha de Alquiler"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="fechaAlquiler"
      />
      {errors.fechaAlquiler?.type === "required" && (
        <Text style={{ color: "red" }}>Fecha de alquiler es obligatoria.</Text>
      )}

      <Button
        style={{ marginTop: 20, backgroundColor: "red" }}
        icon="content-save"
        mode="outlined"
        onPress={handleSubmit(onSubmit)}
      >
        Guardar
      </Button>
    </View>
  );
}


