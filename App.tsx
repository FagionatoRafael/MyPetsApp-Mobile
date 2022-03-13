import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/view/Home/styles';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Home/>
    </>
  );
}
