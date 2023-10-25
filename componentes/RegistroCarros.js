// RegistroCarrosScreen.js

import React from 'react';
import { View, Text, Button } from 'react-native';

const RegistroCarrosScreen = ({ navigation }) => {
  // Aquí puedes agregar tu lógica para el registro de carros

  return (
    <View>
      <Text>Registro de Carros</Text>
      {/* Agrega tus campos de entrada y lógica aquí */}
      <Button title="Guardar Carro" onPress={() => /* Lógica para guardar el carro */} />
    </View>
  );
};

export default RegistroCarrosScreen;
