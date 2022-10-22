import { Dimensions, Text, View } from 'react-native';
import styles from './styles';
import { Button, HelperText } from 'react-native-paper';
import React, { SetStateAction, useEffect, useState } from 'react';
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
import { apiCatsDogs, apiMain } from '../../../../services/connction';
import asyncStorage from '../../../../util/asyncStorage';

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
    const [idVaccinesData, setIdVaccinesData] = useState<number>()
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
        return dateText === '';
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

    const showModal = () => {
        setVisibleModal(true)
        clearSelection()
    };
    const hideModal = () => setVisibleModal(false);
    const showModalVaccine = () => {
        getVaccines()
        setPetErr(hasErrorsPet())
        if(!hasErrorsPet()) {
            setVisibleModalVaccine(true)
        }
    };
    const hideModalVaccine = () => setVisibleModalVaccine(false);

    const [itens, setItens] = useState<IItens[]>([])

    const [itensVaccines, setItensVaccines] = useState<IItens[]>([])

    const [title, setTitle] = useState('')
    const [button, setButton] = useState('')
    const [id, setId] = useState<number>();
    const [idSpecies, setIdSpecies] = useState<number>()
    const [idVaccine, setIdVaccine] = useState<number>()

    const [vacDogsColec, setVacDogsColec] = useState<any[]>();
    const [vacCatsColec, setVacCatsColec] = useState<any[]>();

    const [params, setParams] = useState();

    const getVaccines = () => {
        if(idSpecies === 1) {
            if(vacDogsColec !== undefined) {
                setItensVaccines(vacDogsColec)
            }
        } else if(idSpecies === 2) {
            if(vacCatsColec !== undefined) {
                setItensVaccines(vacCatsColec)
            }
        }
    }

    const clearSelection = () => {
        setItensVaccines([])
        setVaccines('')
        setIdVaccine(undefined)
    }

    const setPetsItens = () => {
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
                })
                setItens(value.data)
            }).catch((err) => {
                console.log(401)
            })
        })
    }

    const getOnePetById = () => {
        asyncStorage.get('token').then((value) => {
            apiMain.get(`pet/${id}`, {
                headers: { Authorization: `Bearer ${value.access_token}` }
            }).then((value) => {
                setIdSpecies(value.data.iDSpeciesId);
            }).catch((err) => {
                console.log(401)
            })
        })
    }

    useEffect(() => {
        getOnePetById();
    }, [id])

    const postNewVaccines = () => {
        asyncStorage.get('token').then((value) => {
            apiMain.post('vaccines', {
                DtVac: dateText,
                idVaccine: idVaccine,
                vaccine: vaccines,
                description: description,
                iDPet: id
            }, {
                headers: { Authorization: `Bearer ${value.access_token}` }
            }).then((value) => {
                console.log(value);
            }).catch((err) => {
                console.log(401);
            })
        })
    }

    const editVaccine = () => {
        asyncStorage.get('token').then((value) => {
            apiMain.patch(`vaccines/${idVaccinesData}`, {
                DtVac: dateText,
                idVaccine: idVaccine,
                vaccine: vaccines,
                description: description,
                iDPet: id
            }, {
                headers: { Authorization: `Bearer ${value.access_token}` }
            }).then((value) => {
                console.log(value);
            }).catch((err) => {
                console.log(401);
            })
        })
    }

    const deleteVaccine = () => {
        console.log()
        asyncStorage.get('token').then((value) => {
            apiMain.delete(`vaccines/${idVaccinesData}`, {
                headers: { Authorization: `Bearer ${value.access_token}` }
            }).then((value) => {
                console.log(value);
            }).catch((err) => {
                console.log(401);
            })
        })
    }

    useEffect(() => {
        setPetsItens();

        apiCatsDogs.get('/vaccines/dog').then((value) => {
            value.data.forEach((v: any) => {
                delete v._id
                v.name = v.nome
                delete v.nome
            })
            setVacDogsColec(value.data)
        }).catch((err) => {
            console.log(err)
        })

        apiCatsDogs.get('/vaccines/cats').then((value) => {
            value.data.forEach((v: any) => {
                delete v._id
                v.name = v.nome
                delete v.nome
            })
            setVacCatsColec(value.data)
        }).catch((err) => {
            console.log(err)
        })

        setTitle('Adicione uma vacina')
        setButton('Adicionar')
        if(navigation.getState().routes[navigation.getState().routes.length - 1].params) {
            setParams(navigation.getState().routes[navigation.getState().routes.length - 1].params)
            setIdVaccinesData(navigation.getState().routes[navigation.getState().routes.length - 1].params.id)
            setDateText(navigation.getState().routes[navigation.getState().routes.length - 1].params.DtVac)
            setId(navigation.getState().routes[navigation.getState().routes.length - 1].params.iDPetId)
            setPet(navigation.getState().routes[navigation.getState().routes.length - 1].params.name)
            setIdSpecies(navigation.getState().routes[navigation.getState().routes.length - 1].params.iDSpeciesId)
            setVaccines(navigation.getState().routes[navigation.getState().routes.length - 1].params.vaccine)
            setIdVaccine(navigation.getState().routes[navigation.getState().routes.length - 1].params.idVaccine)
            setDescription(navigation.getState().routes[navigation.getState().routes.length - 1].params.description)
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
                        onChange={(value: any) => {
                            onChangeDate(value)
                            if(value.type !== 'set') {
                                setVisible(false);
                            }
                        }}
                        value={date}
                    />: <></>}

                    <InputCustom label='Escolha seu pet' text={pet} hasErros={petErr} onChangeText={onChangePet} hasTouch={showModal} invalidText={'Um Pet deve ser selecionado!'} editable={false}/>
                    <InputCustom label='Selecione a vacina' text={vaccines} hasErros={vaccineErr} onChangeText={onChangeVaccine} hasTouch={showModalVaccine} invalidText={'Uma vacina deve ser selecionado!'} editable={false}/>
                    <InputCustom label='Data da vacina' text={dateText} hasErros={DateErr} onChangeText={() => {}} invalidText={'A data não pode ser vazia!'} hasTouch={() => setVisible(true)} editable={false}/>
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
                                    if(params) {
                                        editVaccine();
                                    } else {
                                        postNewVaccines();
                                    }
                                    navigation.goBack()
                                }
                            }}
                        >
                            {button}
                        </Button>
                        {deleteBotton ? (<Button 
                                mode="contained" 
                                style={styles.deleteButtom}
                                onPress={() => {
                                    deleteVaccine();
                                    navigation.goBack();
                                }}
                            >
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
                title='Escolha a vacina:' 
                showModal={visibleModalVaccine} 
                hideModal={hideModalVaccine} 
                setText={setVaccines} 
                Itens={itensVaccines}
                idIten={idVaccine}
                getId={(value) => {setIdVaccine(value)}}
            />
        </>
    );
}

export default AddVaccine;