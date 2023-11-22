import AsyncStorage from "@react-native-async-storage/async-storage";

export const ServicioLocal = {
    obtenerCarrosDisponibles: async () => {
        try {
            const carros = await ServicioLocal.obtenerTodosLosCarros();
            return carros.filter(carro => carro.state === 'disponible');
        } catch (error) {
            console.log("Error al obtener carros disponibles: ", error.message);
            return [];
        }
    },

    obtenerTodosLosCarros: async () => {
        try {
            const registros = await AsyncStorage.getItem('RegistrosGuardados');
            return JSON.parse(registros) || [];
        } catch (error) {
            console.log("Error al obtener todos los carros: ", error.message);
            return [];
        }
    },

    actualizarEstadoCarro: async (numeroPlaca, nuevoEstado) => {
        try {
            const carrosGuardados = await ServicioLocal.obtenerTodosLosCarros();
            const nuevosCarros = carrosGuardados.map(carro => {
                if (carro.placa === numeroPlaca) {
                    return { ...carro, state: nuevoEstado };
                }
                return carro;
            });
            await AsyncStorage.setItem('RegistrosGuardados', JSON.stringify(nuevosCarros));
        } catch (error) {
            console.log(`Error al actualizar el estado del carro ${numeroPlaca} localmente:`, error.message);
            throw error;
        }
    }
};
