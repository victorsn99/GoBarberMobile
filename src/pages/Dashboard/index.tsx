import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Button } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import { useAuth } from '../../hooks/AuthContext';

import { Container, Header, HeaderTitle, Username, ProvidersListFooterTitle, ProvidersListTitle, ProfileButton, UserAvatar, ProvidersList, ProviderMetaText, ProviderAvatar, ProviderMeta, ProviderInfo, ProviderContainer, ProviderName } from './styles';

import api from '../../services/api';

export interface Provider {
    id: string;
    name: string;
    avatar_url: string;
}

const Dashboard: React.FC = () => {
    const [providers, setProviders] = useState<Provider[]>([]);

    const { signOut, user } = useAuth();
    const { navigate } = useNavigation();

    useEffect(() => {
        api.get('providers/listAll').then((response) => {
            setProviders(response.data);
        });
    }, []);

    const navigateToProfile = useCallback(() => {
        navigate('Menu');
    }, [navigate]);

    const navigateToCreateAppointment = useCallback((providerId: string) => {
        navigate('CreateAppointment', {providerId});
    }, [navigate]);

    return(
        <Container>
            <Header>
                <HeaderTitle>
                    Bem vindo, {"\n"}
                    <Username>{user.name}</Username>
                </HeaderTitle>

                <ProfileButton onPress={navigateToProfile}>
                    <UserAvatar source={{ uri: user.avatar_url}}></UserAvatar>
                </ProfileButton>
            </Header>

            <ProvidersList data={providers} 
            keyExtractor={(provider) => provider.id} 
            ListHeaderComponent={
                <ProvidersListTitle>Barbeiros(as)</ProvidersListTitle>
            }
            ListFooterComponent={
                <ProvidersListFooterTitle>Fim da lista</ProvidersListFooterTitle>
            }
            renderItem={({item: provider}) => (
                <ProviderContainer onPress={() => navigateToCreateAppointment(provider.id)}>
                    <ProviderAvatar source={{ uri: provider.avatar_url}}/>
                    
                    <ProviderInfo>
                        <ProviderName>{provider.name}</ProviderName>

                        <ProviderMeta>
                            <Icon name="calendar" size={14} color="#FF9000" ></Icon>
                            <ProviderMetaText>Segunda à Sexta</ProviderMetaText>
                        </ProviderMeta>
                        <ProviderMeta>
                            <Icon name="clock" size={14} color="#FF9000" ></Icon>
                            <ProviderMetaText>Das 08:00 às 18:00</ProviderMetaText>
                        </ProviderMeta>
                    </ProviderInfo>
                </ProviderContainer>
            )} />
        </Container>
    );
};

export default Dashboard;