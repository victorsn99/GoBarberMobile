import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../hooks/AuthContext';
import { Container, 
    Calendar, 
    OpenDatePicker, 
    OpenDatePickerText, 
    ProvidersListContainer, 
    CalendarTitle, 
    BackButton,
    Header, 
    HeaderTitle, 
    UserAvatar, 
    ProvidersList, 
    ProviderContainer, 
    ProviderAvatar, 
    ProviderName,
    Schedule, 
    SubTitle,
    Section,
    SectionTitle,
    SectionContent,
    Hour,
    FormattedHour,
    Content,
    ConfirmButton,
    ConfirmButtonText } from './styles';
import api from '../../services/api';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Alert, Platform } from 'react-native';
import { format } from 'date-fns';

export interface Provider {
    id: string;
    name: string;
    avatar_url: string;
}

interface ProviderDayAvailability {
    hour: number;
    available: boolean;
}

interface RouteParams {
    providerId: string;
}

const CreateAppointment: React.FC = () => {
    const { user } = useAuth();
    const route = useRoute();
    const { goBack, navigate } = useNavigation();

    const routeParams = route.params as RouteParams;

    const [providers, setProviders] = useState<Provider[]>([]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedHour, setSelectedHour] = useState(0);
    const [selectedProvider, setSelectedProvider] = useState(routeParams.providerId);
    const [providerDayAvailability, setProviderDayAvailability] = useState<ProviderDayAvailability[]>([]);

    const handleSelectProvider = useCallback((providerId: string) => {
        setSelectedProvider(providerId);
    }, []);

    const handleToggleDatePicker = useCallback(() => {
        setShowDatePicker(state => !state);
    }, []);

    const handleDateChanged = useCallback((event: any, date: Date | undefined) => {
        if (Platform.OS === 'android'){
            setShowDatePicker(false);
        }

        if (date) {
            setSelectedDate(date);
            console.log(date.getDate, ":", date.getMonth, ":", date.getFullYear);
            
        }
    }, []);

    const handleShowConfirmationAlert = useCallback(() => {
        try {
            const date = new Date(selectedDate);
            date.setHours(selectedHour);
            date.setMinutes(0);

            Alert.alert(
                "Confirmar o agendamento?",
                `Data: ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} às ${date.getHours()}:00 horas`,
                [
                { text: "Cancelar", onPress: () => console.log("Canceled") },
                {
                    text: "Confirmar",
                    onPress: async () => {
                        
                    await api.post('/appointments/create', {
                        provider_id: selectedProvider,
                        user_id: "95e424fa-464d-4357-8cd2-6748c921b969",
                        date,
                    });

                    console.log("post appoi");
                    

                    navigate('CreatedAppointment', { date: date.getTime() });
                    },
                }
                ],
                { cancelable: false }
            );
        } catch {
            Alert.alert(
                "Erro",
                `Erro ao criar agendamento`,
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
              );
        }
        
    }, [navigate, selectedDate, selectedHour, selectedProvider]);

    const handleSelectHour = useCallback((hour: number) => {
        setSelectedHour(hour);
    }, []);

    const navigateToDash = useCallback(() => {
        goBack();
    }, [goBack]);

    useEffect(() => {
        api.get(`providers/${selectedProvider}/day-availability`, {
            params: {
                day: selectedDate.getDate(),
                month: selectedDate.getMonth() + 1,
                year: selectedDate.getFullYear(),
            }
        }).then(response => {
            setProviderDayAvailability(response.data);
        });
    }, [selectedDate, selectedProvider]);

    useEffect(() => {
        api.get('providers/listAll').then((response) => {
            setProviders(response.data);
        });
    }, []);

    const morningAvailability = useMemo(() => {
        return providerDayAvailability.filter(({ hour }) => hour < 12).map(({ hour, available }) => {
            return {
                hour, 
                available, 
                formattedHour: format(new Date().setHours(hour), 'HH:00'),
            };
        });
    }, [providerDayAvailability]);

    const afternoonAvailability = useMemo(() => {
        return providerDayAvailability.filter(({ hour }) => hour >= 12).map(({ hour, available }) => {
            return {
                hour, 
                available, 
                formattedHour: format(new Date().setHours(hour), 'HH:00'),
            };
        });
    }, [providerDayAvailability]);

    return(
        <Container>
            <Header>
                <BackButton onPress={navigateToDash}> 
                    <Icon name="chevron-left" size={24} color="#999591"/>
                </BackButton>

                <HeaderTitle>Agendamento</HeaderTitle>
                
                <UserAvatar source = {{ uri: user.avatar_url }}/>
            </Header>
            <Content>
                <ProvidersListContainer>
                <ProvidersList 
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={providers}
                        keyExtractor={(provider) => provider.id} 
                        renderItem={({item: provider}) => (
                            <ProviderContainer selected={provider.id === selectedProvider} onPress={() => handleSelectProvider(provider.id)}>
                                <ProviderAvatar source={{ uri: provider.avatar_url}}/>
                                <ProviderName selected={provider.id === selectedProvider}>{provider.name}</ProviderName>
                            </ProviderContainer>
                )} />
                </ProvidersListContainer>

                <Calendar>
                    <CalendarTitle>Configure o seu agendamento</CalendarTitle>
                    <SubTitle>Escolha um dia</SubTitle>
                    <OpenDatePicker onPress={() => {handleToggleDatePicker()}}>
                        <OpenDatePickerText>Escolher a data</OpenDatePickerText>
                    </OpenDatePicker>
                    {showDatePicker && <DateTimePicker mode="date" onChange={handleDateChanged} display="calendar" value={selectedDate}/>}
                </Calendar>

                <Schedule>
                    <SubTitle>Escolha um horário para o dia {selectedDate.getDate()}/{selectedDate.getMonth() + 1}/{selectedDate.getFullYear()}</SubTitle>

                    <Section>
                        <SectionTitle>Manhã</SectionTitle>

                        <SectionContent horizontal showsHorizontalScrollIndicator={false}>
                            {morningAvailability.map(({ formattedHour, hour, available }) => (
                                <Hour enabled={available} selected={selectedHour === hour} onPress={() => handleSelectHour(hour)} available={available} key={formattedHour}>
                                    <FormattedHour selected={selectedHour === hour}>{formattedHour}</FormattedHour>
                                </Hour>
                            ))}
                        </SectionContent>
                    </Section>

                    <Section>
                        <SectionTitle>Tarde</SectionTitle>
                        
                        <SectionContent horizontal showsHorizontalScrollIndicator={false}>
                            {afternoonAvailability.map(({ formattedHour, hour, available }) => (
                                <Hour enabled={available} selected={selectedHour === hour} onPress={() => handleSelectHour(hour)} available={available} key={formattedHour}>
                                    <FormattedHour selected={selectedHour === hour}>{formattedHour}</FormattedHour>
                                </Hour>
                            ))}
                        </SectionContent>
                    </Section>
                </Schedule>

                <ConfirmButton onPress={() => {handleShowConfirmationAlert()}}>
                    <ConfirmButtonText>Agendar
                    </ConfirmButtonText>
                </ConfirmButton>
            </Content>
        </Container>
    );
};

export default CreateAppointment;