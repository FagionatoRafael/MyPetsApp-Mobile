import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#5CDB95',
      justifyContent: 'center',
    },
    form: {
      margin: 20
    },
    button: {
      backgroundColor: '#8EE4AF',
      padding: 5,
      marginTop: 20
    },
    buttonText: {
      paddingTop: 10
    },
    logoContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex', 
      alignContent: 'center', 
      alignSelf: 'center',
      marginBottom: 70
    },
    loadingContainer: {
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignContent: 'center', 
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height * 0.8,
      alignItems: 'center',
      alignSelf: 'center'
    },
    logoText: {
      fontSize: Dimensions.get('window').width * 0.09,
      color: '#05386B',
      fontWeight: 'bold',
      // fontFamily: 'Dosis_400Regular'
    },
    loadingText: {
      fontSize: Dimensions.get('window').width * 0.05,
      color: '#05386B',
      fontWeight: 'bold',
      // fontFamily: 'Dosis_400Regular'
    }
});

export default styles;
  