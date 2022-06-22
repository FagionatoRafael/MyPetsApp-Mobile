import { StyleSheet, Dimensions } from 'react-native';


const styles = StyleSheet.create({
    nameIcon: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
        textAlignVertical: 'center',
        height: 'auto'
    },
    description: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingBottom: 10
    },
    pesoAndPort: {
        display: 'flex', 
        alignItems: 'center', 
        paddingLeft: 5,
    },
    itensTodo: {
        display: 'flex',
        flexDirection: 'row',
        padding: 5
    },
    itensIcon: {
        paddingLeft: 5
    }

});

export default styles;
  