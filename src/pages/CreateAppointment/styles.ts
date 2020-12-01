import { FlatList, RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import { Provider } from './index';

interface ProviderContainerProps {
    selected: boolean;
}

interface ProviderNameProps {
    selected: boolean;
}

interface HourProps {
    available?: boolean;
    selected?: boolean;
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

export const BackButton = styled.TouchableOpacity`
`;

export const HeaderTitle = styled.Text`
    color: #F4EDE8;
    font-size: 20px; 
    font-family: 'RobotoSlab-Regular';
    line-height: 28px;
    margin-left: 30px;
`;

export const UserAvatar = styled.Image`
    width: 56px;
    height: 56px;
    border-radius: 28px;
    margin-left: auto;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
    padding: 32px 20px 16px;
`;

export const ProviderContainer = styled(RectButton)<ProviderContainerProps>`
    background: ${props => props.selected ? '#FF9000' : '#3E3B47'};
    border-radius: 10px;
    padding: 20px;
    height: 62px;
    margin-bottom: 16px;
    flex-direction: row;
    align-items: center;
    margin-right: 15px;
`;

export const ProvidersListContainer = styled.View`
    height: 112px;
`;


export const ProviderAvatar = styled.Image`
    width: 42px;
    height: 42px;
    border-radius: 21px;
    margin-right: auto;
`;

export const ProviderName = styled.Text<ProviderNameProps>`
    font-family: 'RobotoSlab-Medium';
    font-size: 18px;
    color:  ${props => props.selected ? '#232129' : '#F4EDE8'};;
    margin-left: 15px;
`;

export const Calendar = styled.View`
`;

export const CalendarTitle = styled.Text`
    font-family: 'RobotoSlab-Medium';
    font-size: 24px;
    margin: 0px 24px 24px;
    text-align: center;
    color: #F4EDE8;
`;

export const OpenDatePicker = styled.TouchableOpacity`
    margin: 0px 24px 24px;
    border-radius: 10px;
    background: #FF9000;
`;

export const OpenDatePickerText = styled.Text`
    font-family: 'RobotoSlab-Medium';
    font-size: 18px;
    padding: 12px;
    color: #232129;
    text-align: center;
`;

export const Schedule = styled.View`
    padding: 24px 0 16px;
`;

export const SubTitle = styled.Text`
    color: #F4EDE8;
    font-size: 20px; 
    font-family: 'RobotoSlab-Regular';
    line-height: 28px;
    text-align: center;
    margin-bottom: 20px;
    margin-left: 20px;
    margin-right: 20px;
`;

export const Section = styled.View`
    margin-bottom: 24px;
`;

export const SectionTitle = styled.Text`
    font-family: 'RobotoSlab-Regular';
    font-size: 18px;
    color: #999591;
    text-align: center;
    margin: 0 24px 12px;
`;

export const SectionContent = styled.ScrollView.attrs({
    contentContainerStyle: { paddingHorizontal: 24},
})`
    
`;

export const Hour = styled(RectButton)<HourProps>`
    padding: 12px;
    background: ${props => props.selected ? '#FF9000' : '#3E3B47'};
    border-radius: 10px;
    margin-right: 8px;

    opacity: ${(props) => props.available ? 1 : 0.3}
`;

export const FormattedHour = styled.Text<HourProps>`
    font-family: 'RobotoSlab-Regular';
    font-size: 18px;
    color: ${props => props.selected ? '#232129' : '#F4EDE8'};
    text-align: center;
`;

export const Content = styled.ScrollView`
`;

export const ConfirmButton = styled.TouchableOpacity`
    margin: 0px 24px 24px;
    border-radius: 10px;
    background: #FF9000;
    margin-top: 15px;
    margin-bottom: 60px;
`;

export const ConfirmButtonText = styled.Text`
    font-family: 'RobotoSlab-Medium';
    font-size: 24px;
    padding: 12px;
    color: #232129;
    text-align: center;
`;

