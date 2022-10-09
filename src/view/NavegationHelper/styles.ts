import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    logoContainer: {
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 70
    },
    logoText: {
      fontSize: 35,
      color: '#EDF5E1',
      fontWeight: 'bold',
      // fontFamily: 'Dosis_400Regular'
    },
    navigationContainer: {
        margin: 20,
    },
    navegationText: {
        color: '#379683',
        fontSize: 18
    },
    groupButton: {
        marginTop: Dimensions.get('window').height * 0.4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    progress: {
        marginTop: Dimensions.get('window').height * 0.01,
    }
});

export default styles;
  