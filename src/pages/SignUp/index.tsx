import React, { useCallback, useRef } from 'react';
import { Image, KeyboardAvoidingView, Platform, View, ScrollView, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';

import * as Yup from 'yup';

import {  } from '@unform/mobile';

import api from '../../services/api';

import { Container, Title, BackToSignIn, BackToSignInText, Form } from './styles';

import logoImg from '../../assets/logo.png';
import { FormHandles } from '@unform/core';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const passwordInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const navi = useNavigation();

    const handleSignUp = useCallback(async (data: SignUpFormData) => {
        try {
          formRef.current?.setErrors({});
          const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            email: Yup.string().required('Email obrigatório').email('Digite um e-mail válido'),
            password: Yup.string().min(6, 'Digite uma senha com no mínimo  6 caracteres'),
          });  //schema de validação
    
          await schema.validate(data, {
            abortEarly: false
          });
    
          await api.post('/users', data);

          Alert.alert('Cadastrado com sucesso', 'Já pode efetuar seu logon.');

          navi.goBack();
        } catch (err) {
          if (err instanceof Yup.ValidationError ){
            const errors = getValidationErrors(err);
    
            formRef.current?.setErrors(errors);

            Alert.alert('Erro no cadastro', 'Ocorreu um erro no cadastro, verifique se os dados estão corretos e tente novamente.');
    
            return;
          }
        }
      }, []);

    return (
        <>
            <KeyboardAvoidingView 
            style={{ flex: 1 }} 
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            enabled>

                <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }}>
                    <Container>
                        <Image source={logoImg}/>

                        <View>
                            <Title>Faça seu logon</Title>
                        </View>

                        <Form ref={formRef} onSubmit={handleSignUp}>
                            <Input 
                            name="name" 
                            icon="name" 
                            placeholder="Nome"
                            autoCapitalize="words"
                            returnKeyType="next" 
                            onSubmitEditing={() => {
                                emailInputRef.current.focus();
                            }}
                            />
                            <Input 
                            ref={emailInputRef}
                            name="email" 
                            icon="mail" 
                            placeholder="E-mail"
                            autoCorrect={false} 
                            autoCapitalize="none" 
                            keyboardType="email-address" 
                            returnKeyType="next" 
                            onSubmitEditing={() => {
                                passwordInputRef.current.focus();
                            }}
                            />
                            <Input 
                            ref = {passwordInputRef}
                            name="password" 
                            icon="lock" 
                            placeholder="Senha"
                            secureTextEntry
                            returnKeyType="send" 
                            onSubmitEditing={() => {
                                formRef.current?.submitForm();
                            }}
                            />

                            <Button onPress={() => {formRef.current?.submitForm()}}>Cadastrar</Button>
                        </Form>
                    </Container>

                    <BackToSignIn onPress={() => {navi.goBack()}}>
                        <BackToSignInText>Voltar Para Logon</BackToSignInText>
                    </BackToSignIn>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
}

export default SignUp;