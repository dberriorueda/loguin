import AsyncStorage from "@react-native-async-storage/async-storage";

export const ServicioLocal = {
    obtenerCarrosDisponibles: async () => {
        try {
            const registros = await AsyncStorage.getItem('RegistrosGuardados')
            const carros = JSON.parse(registros) || []
            return carros.filter(carro => carro.state === 'Disponible')
        } catch (error) {
            console.log("Error al obtener carros disponibles: ", error.message)
            return []
        }
    },

    actualizarEstadoCarro: async (numeroPlaca, nuevoEstado) => {
        try{
            const carrosGuardados = await AsyncStorage.getItem('RegistrosGuardados')
            const carros = JSON.parse(carrosGuardados) || []
            const nuevosCarros = carros.map(carro => {
                if (carro.placa === numeroPlaca) {
                    return { ...carro, state: nuevoEstado}
                }
                return carro 
            })
            await AsyncStorage.setItem('RegistrosGuardados', JSON.stringify(nuevosCarros))
        }catch (error) {
            console.log(`error al actualizar el estado del carro ${numeroPlaca} localmente:`, error.message)
            throw error
        }
    },
};
