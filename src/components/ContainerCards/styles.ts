import { StyleSheet, Dimensions } from 'react-native';


const styles = StyleSheet.create({
    card: {
        top: 10, 
        margin: 20,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#5CDB95'
    },
    topCards: {
        backgroundColor: '#5CDB95',
        height: '10%',
        width: '100%',
        position: 'absolute'
    },
    textTopCards: {
        paddingLeft: 10,
        fontWeight: 'bold'
    }
});

export default styles;
  