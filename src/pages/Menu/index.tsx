import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Button } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import { useAuth } from '../../hooks/AuthContext';

import { Container, 
    Header, 
    HeaderTitle, 
    Username, 
    MenuTitle,
    UserAvatar,
    OptionButton,
    OptionName,
    BackButton } from './styles';

import api from '../../services/api';

export interface Provider {
    id: string;
    name: string;
    avatar_url: string;
}

const Menu: React.FC = () => {

    const { signOut, user } = useAuth();
    const { navigate } = useNavigation();

    const handleLogout = useCallback(() => {
        signOut();
    }, [navigate]);

    const handleAbout = useCallback(() => {
        navigate('About');
    }, [navigate]);

    const navigateToDash = useCallback(() => {
        navigate('Dash');
    }, [navigate]);

    return(
        <Container>
            <Header>
                <BackButton onPress={navigateToDash}> 
                    <Icon name="chevron-left" size={24} color="#999591"/>
                </BackButton>
                <HeaderTitle>
                    <Username>{user.name}</Username>
                </HeaderTitle>

                <UserAvatar source={{ uri: user.avatar_url}}></UserAvatar>
            </Header>

            <MenuTitle>Menu</MenuTitle>
                <OptionButton>
                    <OptionName>Perfil</OptionName>
                </OptionButton>

                <OptionButton>
                    <OptionName>Meus Agendamentos</OptionName>
                </OptionButton>

                <OptionButton>
                    <OptionName>Suporte</OptionName>
                </OptionButton>

                <OptionButton onPress={() => handleAbout()}>
                    <OptionName>Sobre o app</OptionName>
                </OptionButton>

                <OptionButton onPress={() => handleLogout()}>
                    <OptionName logout={true}>Logout</OptionName>
                </OptionButton>
        </Container>
    );
};

export default Menu;