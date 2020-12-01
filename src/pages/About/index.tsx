import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Image } from 'react-native';
import { View, Button } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import { useAuth } from '../../hooks/AuthContext';

import { Container, 
    Header, 
    HeaderTitle, 
    Title, 
    AppName,
    Text,
    BackButton,
    Logo } from './styles';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

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

    const navigateToMenu = useCallback(() => {
        navigate('Menu');
    }, [navigate]);

    return(
        <Container>
            <Header>
                <BackButton onPress={navigateToMenu}> 
                    <Icon name="chevron-left" size={24} color="#999591"/>
                </BackButton>
                <HeaderTitle>
                    <Title>Sobre o App</Title>
                </HeaderTitle>
            </Header>

            <Logo source={logoImg}/>

            <AppName>App GoBarber</AppName>

            <Text>Versão Beta 0.1</Text>
            <Text>2020 Swoboda Apps</Text>
            <Text>Todos os direitos reservados</Text>
            <Text></Text>
            <Text>Made using React ❄</Text>
        </Container>
    );
};

export default Menu;