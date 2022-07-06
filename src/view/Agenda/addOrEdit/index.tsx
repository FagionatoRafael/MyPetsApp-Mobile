import { Dimensions, Text, View } from 'react-native';
import styles from './styles';
import { Button, HelperText } from 'react-native-paper';
import React, { SetStateAction, useState } from 'react';
import { useFonts, Dosis_400Regular } from '@expo-google-fonts/dosis';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import moment from 'moment'

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

interface IParams {
    pet: string,
    petId: number,
    namePet: string,
    birthday: string,
    description: string,
    breed: string,
    breedId: number,
    weight: string
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
    const [dateTime, setDate] = useState<DateTimePickerEvent>();
    const [timeDas, setTimeDas] = useState<DateTimePickerEvent>();
    const [timeTill, setTimeTill] = useState<DateTimePickerEvent>();
    const [pet, setPet] = useState('');

    const [DateErr, setDateErr] = useState(false);
    const [timeDasErr, setTimeDasErr] = useState(false);
    const [timeTillErr, setTimeTillErr] = useState(false);
    const [petErr, setPetErr] = useState(false);
    const [cardErr, setCardErr] = useState(false);

    const onChangePet = (text: SetStateAction<string>) => setPet(text);
    const onChangeDate = (value: DateTimePickerEvent) => {
        if(value.nativeEvent.timestamp) {
            let novo = moment(new Date(value.nativeEvent.timestamp || 1 * 1000)).format('DD/MM/YYYY');
            setDate(value)
            setDateText(novo)
            setVisible(false)
        }
    }

    const onChangeDas = (value: DateTimePickerEvent) => {
        if(value.nativeEvent.timestamp) {
            let novo = moment(new Date(value.nativeEvent.timestamp || 1 * 1000)).format('HH:mm');
            setTimeDas(value)
            setTimeTextDas(novo)
            setVisibleDas(false)
        }
    }

    const onChangeTill = (value: DateTimePickerEvent) => {
        if(value.nativeEvent.timestamp) {
            let novo = moment(new Date(value.nativeEvent.timestamp || 1 * 1000)).format('HH:mm');
            setTimeTill(value)
            setTimeTextTill(novo)
            setVisibleTill(false)
        }
    }
 
    const hasErrorsDate = () => {
        return dateAgendaValidation(dateText)
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

    const [itens, setItens] = useState<IItens[]>([{
        id: 0,
        name: 'dog',
        ShowedName: 'Frank',
    }, {
        id: 1,
        name: 'cat',
        ShowedName: 'Link',
    }])

    const [title, setTitle] = useState('')
    const [button, setButton] = useState('')
    const [idsCard, setIdsCard] = useState<number[]>([])
    const [id, setId] = useState<number>()

    const [selected0, setSelected0] = useState<boolean>(false) 
    const [selected1, setSelected1] = useState<boolean>(false) 
    const [selected2, setSelected2] = useState<boolean>(false) 
    const [selected3, setSelected3] = useState<boolean>(false) 
    const [selected4, setSelected4] = useState<boolean>(false) 

    useState(() => {
        const params: IParams = navigation.getState().routes[3].params
        setTitle('Adicione uma agenda')
        setButton('Adicionar')
        if(params) {
            setDateText(params.birthday)
            setPet(params.pet)
            setTitle('Altere a agenda')
            setButton('Alterar')
        }
        setVisibleModal(false)
    }, [])

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
                        onChange={(value: any) => onChangeDate(value)}
                        value={date}
                    />: <></>}

                    {visibleDas ? 
                    <DateTimePicker 
                        onTouchEnd={() => console.log('alooo')}
                        onTouchCancel={(event) => {setVisible(false); console.log(event)}}
                        onChange={(value: any) => onChangeDas(value)}
                        value={date}
                        mode={'time'}
                    />: <></>}

                    {visibleTill ? 
                    <DateTimePicker 
                        onTouchEnd={() => console.log('alooo')}
                        onTouchCancel={(event) => {setVisible(false); console.log(event)}}
                        onChange={(value: any) => onChangeTill(value)}
                        value={date}
                        mode={'time'}
                    />: <></>}

                    <InputCustom label='Escolha seu pet' text={pet} hasErros={petErr} onChangeText={onChangePet} hasTouch={showModal} invalidText={'Um Pet deve ser selecionado!'} editable={false}/>
                    <InputCustom label='Data da atividade' text={dateText} hasErros={DateErr} onChangeText={() => {}} invalidText={'A data deve ser posterior a de hoje!'} hasTouch={() => setVisible(true)} editable={false}/>
                    <View style={{display: 'flex', flexDirection: 'row', width: 200}}>
                        <InputCustom  label='Das' text={timeTextDas} hasErros={timeDasErr} onChangeText={() => {}} invalidText={'Tempo deve ser anterior o tempo até!'} hasTouch={() => setVisibleDas(true)} editable={false} smallInput={true}/>
                        <InputCustom label='Até' text={timeTextTill} hasErros={timeTillErr} onChangeText={() => {}} invalidText={'Tempo deve ser Posterior o tempo Das!'} hasTouch={() => setVisibleTill(true)} editable={false} smallInput={true}/>
                    </View>

                    <View style={{display: 'flex', flexWrap: 'wrap',flexDirection: 'row', maxWidth: windowWidth -50}}>  
                        <CardSelect 
                            text={'Comer'} 
                            id={0} 
                            selected={selected0} 
                            funcId={(id) => {
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

                    <Button 
                        style={styles.button} 
                        mode="contained" 
                        onPress={() => {
                            setDateErr(hasErrorsDate())
                            setTimeDasErr(hasErrorsTimeDas())
                            setTimeTillErr(hasErrorsTimeTill())
                            setPetErr(hasErrorsPet())
                            setCardErr(hasCardSelectedErr())
                            console.log(idsCard.filter((value) => value !== undefined))
                            if(!hasErrorsDate() && !hasErrorsPet() && !hasErrorsTimeDas() && !hasErrorsTimeTill()) {
                                navigation.goBack()
                            }
                        }}
                    >
                        {button}
                    </Button>
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