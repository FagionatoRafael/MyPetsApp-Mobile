import { SafeAreaView, ScrollView, View, Text, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
// import styles from './styles';

import React, { useEffect, useState } from 'react';
import { FAB, HelperText } from 'react-native-paper';
import { IContainerCardsSelect } from '../../../interfaces/_interface.interface';
import CardSelect from '../CardSelect';

import SVGBowl from '../../../assets/dog-dish-icon.svg'; //dog-dish-icon.svg
import SVGCollar from '../../../assets/dog-collar-icon.svg';
import SVGShower from '../../../assets/shower-icon.svg';
import SVGMedication from '../../../assets/medication_icon.svg';
import SVGBall from '../../../assets/ball-icon.svg';

const ContainerCardsSelect: React.FC<IContainerCardsSelect> = ({idsCard, cardErr}) => {

    const windowWidth = Dimensions.get('window').width;
    
    const [selected0, setSelected0] = useState<boolean>(false) 
    const [selected1, setSelected1] = useState<boolean>(false) 
    const [selected2, setSelected2] = useState<boolean>(false) 
    const [selected3, setSelected3] = useState<boolean>(false) 
    const [selected4, setSelected4] = useState<boolean>(false) 

    useEffect(() => {
        console.log('id de outro loop')
        console.log(idsCard)
        if(idsCard.length !== 0) {
            idsCard ? Array(idsCard).forEach((value: number[]) => {
                value.forEach((v: number) => {
                    if(v === 0) {
                        setSelected0(true)
                    }
                    if(v === 1) {
                        setSelected1(true)
                    }
                    if(v === 2) {
                        setSelected2(true)
                    }
                    if(v === 3) {
                        setSelected3(true)
                    }
                    if(v === 4) {
                        setSelected4(true)
                    }
                })
            }) : null
        }
    }, [])
    
    return (
        <View style={{display: 'flex', flexWrap: 'wrap',flexDirection: 'row', maxWidth: windowWidth -50}}>  
            <CardSelect 
                text={'Comer'} 
                id={0} 
                selected={selected0} 
                funcId={(id) => {
                    console.log(idsCard)
                    if(id === 0) { 
                        setSelected0(!selected0)
                        if(selected0 === true) {
                            idsCard.push(id)
                            idsCard.sort()
                        } else {
                            delete idsCard[idsCard.findIndex((value) => value === id)]
                        }
                        
                    } 
                }}
            >
                <SVGBowl width={'80%'} height={'50%'}/> 
            </CardSelect>

            <CardSelect 
                text={'Passear'} 
                id={1} 
                selected={selected1} 
                funcId={(id) => {
                    console.log(idsCard)
                    if(id === 1) { 
                        setSelected1(!selected1)
                        if(!selected1) {
                            idsCard.push(id)
                            idsCard.sort()
                        } else {
                            delete idsCard[idsCard.findIndex((value) => value === id)]
                        }
                    } 
                }}
            >
                <SVGCollar width={'80%'} height={'50%'}/> 
            </CardSelect>

            <CardSelect 
                text={'Banho'} 
                id={2} 
                selected={selected2} 
                funcId={(id) => {
                    console.log(idsCard)
                    if(id === 2) { 
                        setSelected2(!selected2)
                        if(!selected2) {
                            idsCard.push(id)
                            idsCard.sort()
                        } else {
                            delete idsCard[idsCard.findIndex((value) => value === id)]
                        }
                    } 
                }}
            >
                <SVGShower width={'80%'} height={'50%'}/>
            </CardSelect>

            <CardSelect 
                text={'Remedios'} 
                id={3} 
                selected={selected3} 
                funcId={(id) => {
                    console.log(idsCard)
                    if(id === 3) { 
                        setSelected3(!selected3)
                        if(!selected3) {
                            idsCard.push(id)
                            idsCard.sort()
                        } else {
                            delete idsCard[idsCard.findIndex((value) => value === id)]
                        }
                    } 
                }}
            >
                <SVGMedication width={'80%'} height={'50%'}/> 
            </CardSelect>

            <CardSelect 
                text={'Brincar'} 
                id={4} 
                selected={selected4} 
                funcId={(id) => {
                    console.log(idsCard)
                    if(id === 4) { 
                        setSelected4(!selected4)
                        if(!selected4) {
                            idsCard.push(id)
                            idsCard.sort()
                        } else {
                            delete idsCard[idsCard.findIndex((value) => value === id)]
                        }
                    } 
                }}
            >
                <SVGBall width={'80%'} height={'50%'}/>
            </CardSelect>  
            <HelperText type="error" visible={cardErr}>
                Selecione pelo menos um card!
            </HelperText>  
        </View>
    );
}

export default ContainerCardsSelect;