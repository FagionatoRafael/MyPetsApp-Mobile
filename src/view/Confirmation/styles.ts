import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
   confirmationContainer: {
        display: 'flex', 
        alignItems: 'center', 
        marginTop: '50%'
    },
    confirmationText: {
        color: '#05386B', 
        fontSize: 20
    }
});

export default styles;
  