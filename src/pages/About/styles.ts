import styled from 'styled-components/native';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native';

import { Provider } from './index';
import { RectButton } from 'react-native-gesture-handler';

interface OptionProps {
    logout?: boolean;
}

export const Container = styled.View`
    flex: 1;
`;

export const Logo = styled.Image`
    margin: 30px auto;
`;

export const Header = styled.View`
    padding: 24px;
    padding-top: ${getStatusBarHeight() + 24}px;
    background: #28262E;

    flex-direction: row;
    align-items: center;
`;

export const HeaderTitle = styled.Text`
    color: #F4EDE8;
    font-size: 20px; 
    margin-left: 30px;
    font-family: 'RobotoSlab-Regular';
    line-height: 28px;
`;

export const Title = styled.Text`
    color: #FF9000;
    font-family: 'RobotoSlab-Medium';
`;

export const Text = styled.Text<OptionProps>`
    font-family: 'RobotoSlab-Medium';
    font-size: 18px;
    color: ${(props) => props.logout ? '#E60005' : '#F4EDE8'};
    text-align: center;
`;

export const AppName = styled.Text`
    margin-bottom: 24px;
    margin-top: 24px;
    color: #F4EDE8;
    font-family: 'RobotoSlab-Regular';
    font-size: 24px;
    text-align: center;
`;

export const BackButton = styled.TouchableOpacity`
    
`;