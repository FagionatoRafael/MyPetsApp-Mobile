import { Text, View, TextInput } from 'react-native';
import styles from './styles';
import { Modal, Portal, Provider, Title, Button } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text'
import React, { SetStateAction, useEffect, useState } from 'react';
import { useFonts, Dosis_400Regular } from '@expo-google-fonts/dosis';
import { StackActions, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment'

import InputCustom from '../../../components/Input';
import Container from '../../../components/Container';
import ModalCustom from '../../../components/Modal';
import { dateValidation, descriptionValidation, nameValidation, weigthValidadtion } from '../../../../util/validations';
import { IItens } from '../../../../interfaces/IModal.interface';
import { apiCatsDogs, apiMain } from '../../../../services/connction';
import asyncStorage from '../../../../util/asyncStorage';

interface IParams {
    nameSpecies: string,
    id: number,
    iDSpeciesId: number,
    name: string,
    dtBirthDay: string,
    Description: string,
    nameBreed: string,
    iDBreed: number,
    weight: string
}

const AddPet = () => {
    const navigation = useNavigation();

    let [fontsLoaded] = useFonts({
        Dosis_400Regular,
    });
    const date = new Date();

    const [name, setName] = useState('');
    const [dateText, setDateText] = useState('')
    const [birthday, setBirthday] = useState<DateTimePickerEvent>();
    const [pet, setPet] = useState('');
    const [idPet, setIdPet] = useState<number>()
    const [breed, setBreed] = useState('');
    const [idBreed, setIdBreed] = useState<number>()
    const [weight, setWeight] = useState('');
    const [media, setMedia] = useState<number>();
    const [description, setDescription] = useState('');
    const [deleteBotton, setDeleteBotton] = useState(false)

    const [nameErr, setNameErr] = useState(false);
    const [birthdayErr, setBirthdayErr] = useState(false);
    const [petErr, setPetErr] = useState(false);
    const [breedErr, setBreedErr] = useState(false);
    const [weightErr, setWeightErr] = useState(false);
    const [descriptionErr, setDescriptionErr] = useState(false);

    const onChangeName = (text: SetStateAction<string>) => setName(text);
    const onChangePet = (text: SetStateAction<string>) => setPet(text);
    const onChangeBreed = (text: SetStateAction<string>) => setBreed(text);
    const onChangeWeight = (text: SetStateAction<string>) => setWeight(text);
    const onChangeDescription = (text: SetStateAction<string>) => setDescription(text);
    const onChangeBirthday = (value: DateTimePickerEvent) => {
        if(value.nativeEvent.timestamp) {
            let novo = moment(new Date(value.nativeEvent.timestamp || 1 * 1000)).format('DD/MM/YYYY');
            setBirthday(value)
            setDateText(novo)
            setVisible(false)
        }
    }
 
    const hasErrorsName = () => {
        return nameValidation(name)
    };
    const hasErrorsBirthday = () => {
        return dateValidation(dateText)
    };
    const hasErrorsPet = () => {
        return nameValidation(pet)
    };
    const hasErrorsBreed = () => {
        return nameValidation(breed)
    };
    const hasErrorsWeight = () => {
        return weigthValidadtion(weight);
    };
    const hasErrorsDescription = () => {
        return descriptionValidation(description);
    };

    const [text, setText] = useState('')

    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleModalBreed, setVisibleModalBreed] = useState(false);
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        clearSelection()
        setVisibleModal(true)
    };
    const hideModal = () => setVisibleModal(false);

    const showModalBreed = () => {
        setPetErr(hasErrorsPet())
        if(!hasErrorsPet()) {
            getName()
            setTimeout(() => {
                setVisibleModalBreed(true)
            }, 200)
        }
    };
    const hideModalBreed = () => setVisibleModalBreed(false);

    const [itens, setItens] = useState<IItens[]>([{
        id: 1,
        nameIcon: 'dog',
        name: 'cachorro',
    }, {
        id: 2,
        nameIcon: 'cat',
        name: 'Gato',
    }])

    const [itensBreedDog, setItensBreed] = useState<IItens[]>([{
        id: 0,
        name: ''
    }])

    const [dogsColec, setDogsColec] = useState<IItens[]>();
    const [catsColec, setCatsColec] = useState<IItens[]>();

    const [title, setTitle] = useState('')
    const [button, setButton] = useState('')
    const [id, setId] = useState<number>()

    const getName = () => {
        if(idPet === 1) {
            if(dogsColec !== undefined) {
                setItensBreed(dogsColec)
            }
        } else if(idPet === 2) {
            if(catsColec !== undefined) {
                setItensBreed(catsColec)
            }
        }
    }

    const clearSelection = () => {
        setItensBreed([])
        setBreed('')
        setIdBreed(undefined)
    }

    const [params, setParams] = useState<IParams>();

    const getSpeciesPets = () => {
        apiMain.get('/species').then((value) => {
            setStatus(value.status)
            value.data.forEach((v: any) => {
                v.nameIcon = v.id === 1 ? 'dog' : 'cat'
            })
            setItens(value.data)
        })
    }

    const getSpecies = () => {
        apiCatsDogs.get('/dogs').then((value) => {
            value.data.forEach((v: any) => {
                delete v.Weight;
                delete v._id
                v.nameIcon = 'dog'
            })
            setDogsColec(value.data)
        }).catch((err) => {
            console.log(err)
        })

        apiCatsDogs.get('/cats').then((value) => {
            value.data.forEach((v: any) => {
                delete v.Weight;
                delete v._id
                v.nameIcon = 'cat'
            })
            setCatsColec(value.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        // getToken();
        getSpeciesPets();
        getSpecies();
        setTitle('Adicione seu pet')
        setButton('Adicionar')
        // const params: IParams = navigation.getState().routes[3].params
        setTitle('Adicione seu pet')
        setButton('Adicionar')
        console.log(navigation.getState().routes)
        if(navigation.getState().routes[navigation.getState().routes.length - 1].params) {
            setParams(navigation.getState().routes[navigation.getState().routes.length - 1].params)
            setId(navigation.getState().routes[navigation.getState().routes.length - 1].params.id)
            setName(navigation.getState().routes[navigation.getState().routes.length - 1].params.name)
            setDateText(navigation.getState().routes[navigation.getState().routes.length - 1].params.dtBirthDay)
            setPet(navigation.getState().routes[navigation.getState().routes.length - 1].params.nameSpecies)
            setBreed(navigation.getState().routes[navigation.getState().routes.length - 1].params.nameBreed) 
            // console.log(navigation.getState().routes[navigation.getState().routes.length - 1].params.weight.toFixed(2))
            setWeight(navigation.getState().routes[navigation.getState().routes.length - 1].params.weight.toString())
            setMedia(navigation.getState().routes[navigation.getState().routes.length - 1].params.media)
            setDescription(navigation.getState().routes[navigation.getState().routes.length - 1].params.Description)
            setIdPet(navigation.getState().routes[navigation.getState().routes.length - 1].params.iDSpeciesId)
            setIdBreed(navigation.getState().routes[navigation.getState().routes.length - 1].params.iDBreed)
            setTitle('Altere seu pet')
            setButton('Alterar')
            setDeleteBotton(true)
        }
        setVisibleModal(false)
        setVisibleModalBreed(false)
        // getParams()
    }, [])

    const [status, setStatus] = useState<number>();

    const getMediaPet = () => {
        if(idPet == 1) {
            apiCatsDogs.get(`/dogs/${idBreed}`).then((value) => {
                setMedia(Number(value.data[0].Weight))
            }).catch((err) => {
                console.log(err)
            })
        } else if(idPet == 2) {
            apiCatsDogs.get(`/cats/${idBreed}`).then((value) => {
                setMedia(Number(value.data[0].Weight))
            }).catch((err) => {
                console.log(err)
            })
        }
    }
    useEffect(() => {
        getMediaPet();
    }, [idBreed])
    
    const editPet = () => {
        asyncStorage.get('token').then((value) => {
            apiMain.patch(`pet/${id}`, {
                name: name,
                Description: description,
                dtBirthDay: dateText,
                weight: weight,
                media: media,
                iDBreed: idBreed,
                iDSpecies: idPet,
                nameBreed: breed,
            }, {
                headers: { Authorization: `Bearer ${value.access_token}` }
            }).then((value) => {
                console.log(value)
                setStatus(value.status)
            }).catch((err) => {
                console.log(401)
                setStatus(401)
            })
        })
    }

    const postNewPet = () => {
        asyncStorage.get('token').then((value) => {
            apiMain.post('pet', {
                name: name,
                Description: description,
                dtBirthDay: dateText,
                weight: weight,
                media: media,
                iDBreed: idBreed,
                iDSpecies: idPet,
                nameBreed: breed,
            }, {
                headers: { Authorization: `Bearer ${value.access_token}` }
            }).then((value) => {
                setStatus(value.status)
            }).catch((err) => {
                setStatus(401)
            })
        })
    }

    const deletePet = () => {
        console.log(id);
        asyncStorage.get('token').then((value) => {
            console.log(value.access_token)
            apiMain.delete(`pet/${id}`, {
                headers: { Authorization: `Bearer ${value.access_token}` }
            }).then((value) => {
                setStatus(value.status)
            }).catch((err) => {
                console.log(401)
                setStatus(401)
            })
        })
    }

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
                        onChange={(value: any) => onChangeBirthday(value)}
                        value={date}
                    />: <></>}

                    <InputCustom label='Nome do Pet' text={name} hasErros={nameErr} onChangeText={onChangeName} invalidText={'O nome precisa se acima de 3 letras!'}/>
                    <InputCustom label='Data de nascimento' text={dateText} hasErros={birthdayErr} onChangeText={() => {}} invalidText={'A data deve ser anterior a de hoje!'} hasTouch={() => setVisible(true)} editable={false}/>
                    <InputCustom label='Pet' text={pet} hasErros={petErr} onChangeText={onChangePet} hasTouch={showModal} invalidText={'Um Pet deve ser selecionado!'} editable={false}/>
                    <InputCustom label='Raça' text={breed} hasErros={breedErr} onChangeText={onChangeBreed} invalidText={'Uma raça precisa ser selecionada!'} hasTouch={showModalBreed} editable={false}/>
                    <InputCustom label='Peso(KG)' text={weight} hasErros={weightErr} onChangeText={onChangeWeight} invalidText={'É necessário colocar um peso!'} keyboardType='numeric'/>    
                    <InputCustom label='Descrição' text={description} hasErros={descriptionErr} onChangeText={onChangeDescription} multiline={true} invalidText={'A descrição não pode ser vazia e nem maior que 200 letras!'}/>    
                    
                    <View style={styles.groupButtons}>
                        <Button 
                            style={[styles.button, !deleteBotton ? {width: '100%'} : {}]} 
                            mode="contained" 
                            onPress={() => {
                                setNameErr(hasErrorsName())
                                setBirthdayErr(hasErrorsBirthday())
                                setPetErr(hasErrorsPet())
                                setBreedErr(hasErrorsBreed())
                                setWeightErr(hasErrorsWeight())
                                setDescriptionErr(hasErrorsDescription())
                                console.log(idPet)
                                if(!hasErrorsName() && !hasErrorsBirthday() && !hasErrorsPet() && !hasErrorsBreed() && !hasErrorsWeight() && !hasErrorsDescription()) {
                                    if(params) {
                                        editPet();
                                    } else {
                                        postNewPet();
                                    }
                                    // navigation.dispatch(StackActions.replace('drawer', true))
                                    navigation.goBack();
                                }
                            }}
                        >
                            {button}
                        </Button>
                        {deleteBotton ? (
                        <Button  
                            mode="contained" 
                            style={styles.deleteButtom} 
                            onPress={() => {
                                deletePet();
                                // navigation.dispatch(StackActions.replace('drawer', true));
                                navigation.goBack();
                            }
                        }>
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
                idIten={idPet}
                getId={(value) => {setIdPet(value)}}
            />
            <ModalCustom 
                title='Escolha a raça:' 
                showModal={visibleModalBreed} 
                hideModal={hideModalBreed} 
                setText={setBreed} 
                Itens={itensBreedDog}
                idIten={idBreed}
                getId={(value) => {setIdBreed(value)}}
            />
        </>
    );
}

export default AddPet;