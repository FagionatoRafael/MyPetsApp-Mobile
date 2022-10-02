import AsyncStorage from '@react-native-async-storage/async-storage';

const asyncStorage = {
    set: async (name: string, value: any) => {
        try {
            await AsyncStorage.setItem(name, JSON.stringify(value))
        } catch (e) {
            console.log(e)
        }
    }, 
    get: async (name: string) => {
        try {
            const value = await AsyncStorage.getItem(name)
            if(value !== null) {
                // console.log(value)
                return JSON.parse(value);
            }
        } catch(e) {
            console.log(e)
        }
    },
    remove: async (name: string) => {
        try {
            const value = await AsyncStorage.removeItem(name)
            if(value !== null) {
                // console.log(value)
                return value;
            }
        } catch(e) {
            console.log(e)
        }
    },
    clearAll: async () => {
        try {
            await AsyncStorage.clear()
        } catch(e) {
            console.log(e)
        }
    }
};

export default asyncStorage