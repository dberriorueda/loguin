import React from 'react';
import { View, Text, Button } from 'react-native';

const ChooseOptionsScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Elige una opción:</Text>
      <Button
        title="Registrar Carros"
        onPress={() => navigation.navigate('RegistroCarros')}
      />
      <Button
        title="Alquilar"
        onPress={() => navigation.navigate('Alquilar')}
      />
    </View>
  );
};

export default ChooseOptionsScreen;
