import { SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './styles';
import React from 'react';
import { IContainer } from '../../../interfaces/_interface.interface';

const Container: React.FC<IContainer> = ({children, margin = true}) => {
    return (
        <SafeAreaView style={[styles.container]}>
            <ScrollView style={margin ? {marginTop: '20%'} : {}}>
                {children}
            </ScrollView>
        </SafeAreaView>
    );
}

export default Container;