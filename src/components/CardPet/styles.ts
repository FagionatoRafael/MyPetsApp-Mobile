import { StyleSheet, Dimensions } from 'react-native';


const styles = StyleSheet.create({
    card: {
        maxWidth: Dimensions.get('window').width * 0.9,
        marginBottom: 10
    }, 
    nameIcon: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    cardContainer: {
        maxWidth: Dimensions.get('window').width * 0.9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
        textAlignVertical: 'center'
    },
    description: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingBottom: 10
    },
    buttonCard: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5CDB95',
    }

});

export default styles;
  