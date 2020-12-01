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

export const Header = styled.View`
    padding: 24px;
    padding-top: ${getStatusBarHeight() + 24}px;
    background: #28262E;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const HeaderTitle = styled.Text`
    color: #F4EDE8;
    font-size: 20px; 
    font-family: 'RobotoSlab-Regular';
    line-height: 28px;
`;

export const Username = styled.Text`
    color: #FF9000;
    font-family: 'RobotoSlab-Medium';
`;

export const UserAvatar = styled.Image`
    width: 56px;
    height: 56px;
    border-radius: 28px;
`;

export const OptionButton = styled(RectButton)`
    background: #3E3B47;
    border-radius: 10px;
    padding: 12px;
    margin-right: 20px;
    margin-left: 20px;
    margin-bottom: 15px;
`;

export const OptionName = styled.Text<OptionProps>`
    font-family: 'RobotoSlab-Medium';
    font-size: 18px;
    color: ${(props) => props.logout ? '#E60005' : '#F4EDE8'};
    text-align: center;
`;

export const MenuTitle = styled.Text`
    margin-bottom: 24px;
    margin-top: 24px;
    color: #F4EDE8;
    font-family: 'RobotoSlab-Regular';
    font-size: 24px;
    text-align: center;
`;

export const BackButton = styled.TouchableOpacity`
    
`;