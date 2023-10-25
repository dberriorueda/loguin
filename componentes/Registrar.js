import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Registrar({ navigation }) {
  return (
    <View>
      <Text>¿Qué deseas hacer?</Text>
      <Button
        title="Registrar Carro"
        onPress={() => navigation.navigate('RegistroCarros')} // Redirige a la pantalla de registro de carros
      />
      <Button
        title="Alquilar Carro"
        onPress={() => navigation.navigate('Alquiler')} // Redirige a la pantalla de alquiler de carros
      />
    </View>
  );
}

