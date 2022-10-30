import { Dimensions, Text, View } from 'react-native';
import styles from './styles';
import { Button, HelperText } from 'react-native-paper';
import React, { SetStateAction, useEffect, useState } from 'react';
import { useFonts, Dosis_400Regular } from '@expo-google-fonts/dosis';
import { StackActions, useNavigation, NavigationAction, DrawerActions } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerResult } from '@react-native-community/datetimepicker';
import moment from 'moment'
import * as Notifications from 'expo-notifications';

import InputCustom from '../../../components/Input';
import Container from '../../../components/Container';
import ModalCustom from '../../../components/Modal';
import { cardAgendaValidation, dateAgendaValidation, dateValidation, nameValidation, timeValidation } from '../../../../util/validations';
import { IItens } from '../../../../interfaces/IModal.interface';
import CardSelect from '../../../components/CardSelect';

import SVGBowl from '../../../../assets/dog-dish-icon.svg';
import SVGCollar from '../../../../assets/dog-collar-icon.svg';
import SVGShower from '../../../../assets/shower-icon.svg';
import SVGMedication from '../../../../assets/medication_icon.svg';
import SVGBall from '../../../../assets/ball-icon.svg';
import { apiMain } from '../../../../services/connction';
import asyncStorage from '../../../../util/asyncStorage';
import ContainerCardsSelect from '../../../components/ContainerCardsSelect';

interface IParams {
    id: number
    icon: string
    name: string
    DtToDO: string
    TimeStart: string
    TimeEnd: string
    iDitems: number[]
    iDPetId: 1,
    iDSpeciesId: 1,
}

const AddAgenda = () => {
    const navigation = useNavigation();

    const windowWidth = Dimensions.get('window').width;

    let [fontsLoaded] = useFonts({
        Dosis_400Regular,
    });
    const date = new Date();

    const [dateText, setDateText] = useState('')
    const [timeTextDas, setTimeTextDas] = useState('')
    const [timeTextTill, setTimeTextTill] = useState('')
    const [dateTime, setDate] = useState<DateTimePickerResult>();
    const [timeDas, setTimeDas] = useState<DateTimePickerResult>();
    const [timeTill, setTimeTill] = useState<DateTimePickerResult>();
    const [pet, setPet] = useState('');
    const [deleteBotton, setDeleteBotton] = useState(false)

    const [DateErr, setDateErr] = useState(false);
    const [timeDasErr, setTimeDasErr] = useState(false);
    const [timeTillErr, setTimeTillErr] = useState(false);
    const [petErr, setPetErr] = useState(false);
    const [cardErr, setCardErr] = useState(false);

    const onChangePet = (text: SetStateAction<string>) => setPet(text);
    const onChangeDate = (value: DateTimePickerResult) => {
        if(value.nativeEvent.timestamp) {
            let novo = moment(new Date(value.nativeEvent.timestamp || 1 * 1000)).format('DD/MM/YYYY');
            setDate(value)
            setDateText(novo)
            setVisible(false)
        }
    }

    const onChangeDas = (value: DateTimePickerResult) => {
        if(value.nativeEvent.timestamp) {
            let novo = moment(new Date(value.nativeEvent.timestamp || 1 * 1000)).format('HH:mm');
            setTimeDas(value)
            setTimeTextDas(novo)
            setVisibleDas(false)
        }
    }

    const onChangeTill = (value: DateTimePickerResult) => {
        if(value.nativeEvent.timestamp) {
            let novo = moment(new Date(value.nativeEvent.timestamp || 1 * 1000)).format('HH:mm');
            setTimeTill(value)
            setTimeTextTill(novo)
            setVisibleTill(false)
        }
    }
 
    const hasErrorsDate = () => {
        return dateText === '';
    };
    const hasErrorsTimeDas = () => {
        return timeValidation(timeTextDas, timeTextTill)
    };
    const hasErrorsTimeTill = () => {
        return timeValidation(timeTextDas, timeTextTill)
    };
    const hasErrorsPet = () => {
        return nameValidation(pet)
    };
    const hasCardSelectedErr = () => {
        return cardAgendaValidation(idsCard.filter((value) => value !== undefined))
    }

    const [visibleModal, setVisibleModal] = useState(false);
    const [visible, setVisible] = useState(false);
    const [visibleDas, setVisibleDas] = useState(false);
    const [visibleTill, setVisibleTill] = useState(false);

    const showModal = () => setVisibleModal(true);
    const hideModal = () => setVisibleModal(false);

    const [itens, setItens] = useState<IItens[]>([])

    const [token, setToken] = useState();
    const [status, setStatus] = useState<number>();

    const getToken = () => {
        asyncStorage.get('token').then((value) => {
            setToken(value.access_token)
        })
    }

    const setPetsItens = () => {
        getToken();
        asyncStorage.get('token').then((value) => {
            // setToken(value.access_token)
            apiMain.get('pet', {
                headers: { Authorization: `Bearer ${value.access_token}` }
            }).then((value) => {
                value.data.forEach((v: any) => {
                    delete v.Description;
                    delete v.weight;
                    delete v.dtBirthDay;
                    delete v.iDBreed;
                    delete v.nameBreed;
                    delete v.iDUserId;
                    delete v.nameSpecies;
                    v.nameIcon = v.iDSpeciesId === 1 ? 'dog' : 'cat';
                    delete v.iDSpeciesId;
                })
                setItens(value.data)
            }).catch((err) => {
                console.log(401)
            })
        })
    }

    const postNewAgenda = () => {
        console.log(idsCard)
        asyncStorage.get('token').then((value) => {
            apiMain.post('agenda', {
                DtToDO: dateText, 
                TimeStart: timeTextDas,
                TimeEnd: timeTextTill, 
                iDPet: id,
                iDitems: idsCard
            }, {
                headers: { Authorization: `Bearer ${value.access_token}` }
            }).then((value) => {
                console.log(value)
                setStatus(value.status);
            }).catch((err) => {
                setStatus(401)
                console.log(401)
            })
        })

        sendNotiFication();
    }

    const sendNotiFication = async() => {
        const token = await asyncStorage.get('token');
        const result = await apiMain.get('config', {
            headers: { Authorization: `Bearer ${token.access_token}` }
        });

        if(result.data.config_isNoteOne == 1) {
            const startdate = `${dateText} ${timeTextDas}`; 
            const exp = moment(startdate, "DD/MM/YYYY HH:mm");
            const seconds = Math.abs(moment().diff(exp, 'seconds'))
            Notifications.scheduleNotificationAsync({
                content: {
                    data: {
                        token: token
                    },
                    title: "Temos uma atividade para realizar! ",
                    body: 'Olhe as sua atividades no seu app dos pets!',
                },
                trigger: {
                    seconds: seconds
                },
            }); 
        }
    }

    const editAgenda = () => {
        asyncStorage.get('token').then((value) => {
            apiMain.patch(`agenda/${idAgenda}`, {
                DtToDO: dateText, 
                TimeStart: timeTextDas,
                TimeEnd: timeTextTill, 
                iDPet: id,
                iDitems: idsCard
            }, {
                headers: { Authorization: `Bearer ${value.access_token}` }
            }).then((value) => {
                console.log(value.status)
                setStatus(value.status);
            }).catch((err) => {
                console.log(err)
            })
        })

        sendNotiFication();
    }

    const deleteAgenda = () => {
        asyncStorage.get('token').then((value) => {
            apiMain.delete(`agenda/${idAgenda}`, {
                headers: { Authorization: `Bearer ${value.access_token}` }
            }).then((value) => {
                setStatus(value.status);
            })
        })
    }

    const [title, setTitle] = useState('')
    const [button, setButton] = useState('')
    const [idsCard, setIdsCard] = useState<number[]>([])
    // const [itensCard, setItensCard] = useState<number[]>([])
    const [id, setId] = useState<number>()
    const [idAgenda, setIdAgenda] = useState<number>();

    const [selected0, setSelected0] = useState<boolean>(false) 
    const [selected1, setSelected1] = useState<boolean>(false) 
    const [selected2, setSelected2] = useState<boolean>(false) 
    const [selected3, setSelected3] = useState<boolean>(false) 
    const [selected4, setSelected4] = useState<boolean>(false) 

    const [params, setParams] = useState<IParams>();

    useEffect(() => {
        setPetsItens()
        setTitle('Adicione uma agenda')
        setButton('Adicionar')
        if(navigation.getState().routes[navigation.getState().routes.length - 1].params) {
            setParams(navigation.getState().routes[navigation.getState().routes.length - 1].params)
            setDateText(navigation.getState().routes[navigation.getState().routes.length - 1].params.DtToDO)
            setPet(navigation.getState().routes[navigation.getState().routes.length - 1].params.name)
            setTimeTextDas(navigation.getState().routes[navigation.getState().routes.length - 1].params.TimeStart)
            setTimeTextTill(navigation.getState().routes[navigation.getState().routes.length - 1].params.TimeEnd)
            setIdAgenda(navigation.getState().routes[navigation.getState().routes.length - 1].params.id)
            setId(navigation.getState().routes[navigation.getState().routes.length - 1].params.iDPetId)
            setIdsCard(JSON.parse(navigation.getState().routes[navigation.getState().routes.length - 1].params.iDitems))
            setTitle('Altere a agenda')
            setButton('Alterar')
            setDeleteBotton(true)
        }
        setVisibleModal(false)
    }, [])


    useEffect(() => {
        console.log('id de outro loop')
        console.log(typeof idsCard);

        if(typeof idsCard === 'object') {
            idsCard.forEach((value: number) => {
                if(value === 0) {
                    setSelected0(true)
                }
                if(value === 1) {
                    setSelected1(true)
                }
                if(value === 2) {
                    setSelected2(true)
                }
                if(value === 3) {
                    setSelected3(true)
                }
                if(value === 4) {
                    setSelected4(true)
                }
            })
        }
    }, [idsCard])
    return (
        <>
            <Container margin={false}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>{title}</Text>
                </View>
                <View style={styles.form}>
                    {visible ? 
                    <DateTimePicker 
                        onTouchEnd={() => console.log('alooo')}
                        onTouchCancel={(event) => {setVisible(false); console.log(event)}}
                        onChange={(value: any) => {
                            onChangeDate(value)
                            if(value.type !== 'set') {
                                setVisible(false);
                            }
                        }}
                        minimumDate={new Date()}
                        value={date}
                    />: <></>}

                    {visibleDas ? 
                    <DateTimePicker 
                        onTouchEnd={() => console.log('alooo')}
                        onTouchCancel={(event) => {setVisibleDas(false); console.log(event)}}
                        onChange={(value: any) => {
                            onChangeDas(value)
                            if(value.type !== 'set') {
                                setVisibleDas(false);
                            }
                        }}
                        value={date}
                        is24Hour={true}
                        mode={'time'}
                    />: <></>}

                    {visibleTill ? 
                    <DateTimePicker 
                        onTouchEnd={() => console.log('alooo')}
                        onTouchCancel={(event) => {setVisibleTill(false); console.log(event)}}
                        onChange={(value: any) => {
                            onChangeTill(value)
                            if(value.type !== 'set') {
                                onChangeTill(false);
                            }
                        }}
                        is24Hour={true}
                        value={date}
                        mode={'time'}
                    />: <></>}

                    <InputCustom label='Escolha seu pet' text={pet} hasErros={petErr} onChangeText={onChangePet} hasTouch={showModal} invalidText={'Um Pet deve ser selecionado!'} editable={false}/>
                    <InputCustom label='Data da atividade' text={dateText} hasErros={DateErr} onChangeText={() => {}} invalidText={'A data deve ser posterior a de hoje!'} hasTouch={() => setVisible(true)} editable={false}/>
                    <View style={{display: 'flex', flexDirection: 'row', width: windowWidth * 0.5}}>
                        <InputCustom  label='Das' text={timeTextDas} hasErros={timeDasErr} onChangeText={() => {}} invalidText={'Tempo deve ser anterior o tempo até!'} hasTouch={() => setVisibleDas(true)} editable={false} smallInput={true}/>
                        <InputCustom label='Até' text={timeTextTill} hasErros={timeTillErr} onChangeText={() => {}} invalidText={'Tempo deve ser Posterior o tempo Das!'} hasTouch={() => setVisibleTill(true)} editable={false} smallInput={true}/>
                    </View>

                    <View style={{display: 'flex', flexWrap: 'wrap',flexDirection: 'row', maxWidth: windowWidth * 0.9}}>  
                        
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
                    
 
                    {/* <ContainerCardsSelect idsCard={idsCard} cardErr={cardErr}/> */}
                    <View style={styles.groupButtons}>
                        <Button 
                            style={[styles.button, !deleteBotton ? {width: '100%'} : {}]} 
                            mode="contained" 
                            onPress={() => {
                                setDateErr(hasErrorsDate())
                                setTimeDasErr(hasErrorsTimeDas())
                                setTimeTillErr(hasErrorsTimeTill())
                                setPetErr(hasErrorsPet())
                                setCardErr(hasCardSelectedErr())
                                // console.log(idsCard)
                                if(!hasErrorsDate() && !hasErrorsPet() && !hasErrorsTimeDas() && !hasErrorsTimeTill() && !hasCardSelectedErr()) {
                                    if(params) {
                                        console.log('editei')
                                        editAgenda();
                                    } else {
                                        postNewAgenda();
                                    }
                                    navigation.goBack();
                                }
                            }}
                        >
                            {button}
                        </Button>
                        {deleteBotton ? (<Button  
                            mode="contained" 
                            style={styles.deleteButtom} 
                            onPress={() => {
                                deleteAgenda()
                                // navigation.dispatch(StackActions.replace('Agenda', true))
                                navigation.goBack();
                            }}>
                            <Feather name="trash-2" size={22} color="white" />
                        </Button>): <></>}
                    </View>
                </View>
            </Container>
            <ModalCustom 
                title='Escolha o pet:' 
                showModal={visibleModal} 
                hideModal={hideModal} 
                setText={setPet} 
                Itens={itens}
                idIten={id}
                getId={(value) => {setId(value)}}
            />
        </>
    );
}

export default AddAgenda;