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
        marginTop: 300,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    progress: {
        marginTop: 40
    }
});

export default styles;
  