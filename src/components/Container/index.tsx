import { SafeAreaView } from 'react-native';
import styles from './styles';
import React from 'react';

const Container: React.FC = ({children}) => {
    return (
        <SafeAreaView style={[styles.container]}>
            {children}
        </SafeAreaView>
    );
}

export default Container;