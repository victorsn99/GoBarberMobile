import styled, { css } from 'styled-components/native';

interface ContainerProps {
    isFocused: boolean;
    isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
    width: 100%;
    height: 60px;
    padding: 0 16px;
    background: #232129;
    border-radius: 10px;
    margin-bottom: 8px;
    border-width: 2px;
    border-color: #232129;
    flex-direction: row;
    align-items: center;

    ${props => props.isFocused && css`
        border-color: #FF9000;
    `}

    ${props => props.isErrored && css`
        border-color: #C53030;
    `}
`;

export const TextInput = styled.TextInput`
    flex: 1;
    color: #FFF;
    font-size: 16px;
    font-family: 'RobotoSlab-Regular';
`;