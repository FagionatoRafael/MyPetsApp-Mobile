import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
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
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 70
    },
    logoText: {
      fontSize: 50,
      color: '#05386B',
      fontWeight: 'bold',
      // fontFamily: 'Dosis_400Regular'
    }
});

export default styles;
  