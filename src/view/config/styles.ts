import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    containerTitle: {
        width: '100%', 
        display: 'flex', 
        alignItems: 'center'
    },
    title: {
        color: '#EDF5E1', 
        fontSize: 26
    },
    containerConfig: {
        marginTop: 20, 
        margin: '5%'
    },
    containerToggle: {
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
});

export default styles;
  