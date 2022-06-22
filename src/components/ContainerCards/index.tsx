import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './styles';

import React from 'react';
import { FAB } from 'react-native-paper';
import { IContainerCards } from '../../../interfaces/_interface.interface';

const ContainerCards: React.FC<IContainerCards> = ({children, funcNavi, text, hasFAB=true}) => {
    return (
        <>
        <View style={styles.topCards}>
            <Text style={styles.textTopCards}>
                {text}:
            </Text>
        </View>
        <ScrollView>
            
            <View style={styles.card}>
                {children}
            </View>
            
        </ScrollView>
        {hasFAB ? 
        <FAB
            style={styles.fab}
            color='#05386B'
            icon="plus"
            onPress={() => funcNavi()}
        /> : null}
        </>
    );
}

export default ContainerCards;