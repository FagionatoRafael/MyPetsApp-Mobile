import { StyleSheet, Dimensions } from 'react-native';


const styles = StyleSheet.create({
    cardSelect: {
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: '#EDF5E1', 
        width: Dimensions.get('window').width * 0.25, 
        height: 130,
        padding: 10, 
        margin: 10, 
        borderRadius: 8
    },
    cardSelected: {
        alignItems: 'center',
        justifyContent: 'center', 
        backgroundColor: '#8EE4AF', 
        width: Dimensions.get('window').width * 0.25, 
        height: 130,
        padding: 10, 
        margin: 10, 
        borderRadius: 8
    }
});

export default styles;
  