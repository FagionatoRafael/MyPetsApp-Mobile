import { Dimensions, Text, View } from 'react-native';
import styles from './styles';
import { Button, HelperText } from 'react-native-paper';
import React, { SetStateAction, useState } from 'react';
import { useFonts, Dosis_400Regular } from '@expo-google-fonts/dosis';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import moment from 'moment'

import InputCustom from '../../../components/Input';
import Container from '../../../components/Container';
import ModalCustom from '../../../components/Modal';
import { cardAgendaValidation, dateAgendaValidation, dateValidation, descriptionValidation, nameValidation, timeValidation } from '../../../../util/validations';
import { IItens } from '../../../../interfaces/IModal.interface';

interface IParams {
    icon: string
    namePet: string
    day: string
    vaccine: string
    description: string
}

const AddVaccine = () => {
    const navigation = useNavigation();

    const windowWidth = Dimensions.get('window').width;

    let [fontsLoaded] = useFonts({
        Dosis_400Regular,
    });
    const date = new Date();

    const [dateText, setDateText] = useState('')
    const [dateTime, setDate] = useState<DateTimePickerEvent>();
    const [pet, setPet] = useState('');
    const [vaccines, setVaccines] = useState('');
    const [description, setDescription] = useState('');
    const [deleteBotton, setDeleteBotton] = useState(false)

    const [DateErr, setDateErr] = useState(false);
    const [petErr, setPetErr] = useState(false);
    const [vaccineErr, setVaccineErr] = useState(false);
    const [descriptionErr, setDescriptionErr] = useState(false);

    const onChangePet = (text: SetStateAction<string>) => setPet(text);
    const onChangeVaccine = (text: SetStateAction<string>) => setVaccines(text);
    const onChangeDescription = (text: SetStateAction<string>) => setDescription(text);

    const onChangeDate = (value: DateTimePickerEvent) => {
        if(value.nativeEvent.timestamp) {
            let novo = moment(new Date(value.nativeEvent.timestamp || 1 * 1000)).format('DD/MM/YYYY');
            setDate(value)
            setDateText(novo)
            setVisible(false)
        }
    }

    const hasErrorsDate = () => {
        return dateAgendaValidation(dateText)
    };
    const hasErrorsPet = () => {
        return nameValidation(pet)
    };
    const hasErrorsVAccine = () => {
        return nameValidation(vaccines)
    };
    const hasErrorsDescription = () => {
        return descriptionValidation(description);
    };

    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleModalVaccine, setVisibleModalVaccine] = useState(false);
    const [visible, setVisible] = useState(false);

    const showModal = () => setVisibleModal(true);
    const hideModal = () => setVisibleModal(false);
    const showModalVaccine = () => setVisibleModalVaccine(true);
    const hideModalVaccine = () => setVisibleModalVaccine(false);

    const [itens, setItens] = useState<IItens[]>([{
        id: 0,
        name: 'dog',
        ShowedName: 'Frank',
    }, {
        id: 1,
        name: 'cat',
        ShowedName: 'Link',
    }])

    const [itensVaccines, setItensVaccines] = useState<IItens[]>([{
        id: 0,
        ShowedName: 'Canine Distemper',
    }, {
        id: 1,
        ShowedName: 'Feline Infectious Peritonitis',
    }])

    const [title, setTitle] = useState('')
    const [button, setButton] = useState('')
    const [id, setId] = useState<number>()
    const [idVAccine, setIdVaccine] = useState<number>()


    useState(() => {
        const params: IParams = navigation.getState().routes[3].params
        setTitle('Adicione uma vacina')
        setButton('Adicionar')
        if(params) {
            setDateText(params.day)
            setPet(params.namePet)
            setVaccines(params.vaccine)
            setDescription(params.description)
            setTitle('Altere a vacina')
            setButton('Alterar')
            setDeleteBotton(true)
        }
        setVisibleModal(false)
        setVisibleModalVaccine(false)
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

                    <InputCustom label='Escolha seu pet' text={pet} hasErros={petErr} onChangeText={onChangePet} hasTouch={showModal} invalidText={'Um Pet deve ser selecionado!'} editable={false}/>
                    <InputCustom label='Selecione a vacina' text={vaccines} hasErros={vaccineErr} onChangeText={onChangeVaccine} hasTouch={showModalVaccine} invalidText={'Uma vacina deve ser selecionado!'} editable={false}/>
                    <InputCustom label='Data da atividade' text={dateText} hasErros={DateErr} onChangeText={() => {}} invalidText={'A data deve ser posterior a de hoje!'} hasTouch={() => setVisible(true)} editable={false}/>
                    <InputCustom label='Nota' text={description} hasErros={descriptionErr} onChangeText={onChangeDescription} multiline={true} invalidText={'A descrição não pode ser vazia e nem maior que 200 letras!'}/> 
                    
                    <View style={styles.groupButtons}>
                        <Button 
                            style={[styles.button, !deleteBotton ? {width: '100%'} : {}]} 
                            mode="contained" 
                            onPress={() => {
                                setDateErr(hasErrorsDate())
                                setPetErr(hasErrorsPet())
                                setVaccineErr(hasErrorsVAccine())
                                setDescriptionErr(hasErrorsDescription())
                                if(!hasErrorsDate() && !hasErrorsPet() && !hasErrorsVAccine()) {
                                    navigation.goBack()
                                }
                            }}
                        >
                            {button}
                        </Button>
                        {deleteBotton ? (<Button  mode="contained" style={styles.deleteButtom}>
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
            <ModalCustom 
                title='Escolha o pet:' 
                showModal={visibleModalVaccine} 
                hideModal={hideModalVaccine} 
                setText={setVaccines} 
                Itens={itensVaccines}
                idIten={idVAccine}
                getId={(value) => {setIdVaccine(value)}}
            />
        </>
    );
}

export default AddVaccine;