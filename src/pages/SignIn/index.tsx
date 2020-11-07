import React, { useCallback, useRef } from 'react';
import { Image, KeyboardAvoidingView, Platform, View, ScrollView, TextInput, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import {  } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { useAuth } from '../../hooks/AuthContext';

import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText, Form } from './styles';

import logoImg from '../../assets/logo.png';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const passwordInputRef = useRef(null);
    const navigation = useNavigation();

    const { signIn, user } = useAuth();

    console.log(user);

    const handleSignIn = useCallback(async (data: SignInFormData) => {
        try {
          formRef.current?.setErrors({});
          const schema = Yup.object().shape({
            email: Yup.string().required('Email obrigatório').email('Digite um e-mail válido'),
            password: Yup.string().min(6, 'Digite uma senha com no mínimo 6 caracteres'),
          });  //schema de validação
    
          await schema.validate(data, {
            abortEarly: false
          });
    
          await signIn({
            email: data.email,
            password: data.password,
          });

        } catch (err) {
          if (err instanceof Yup.ValidationError ){
            const errors = getValidationErrors(err);
    
            formRef.current?.setErrors(errors);
    
            return;
          }
          Alert.alert('Erro na autenticação', 'Verifique se suas informações estão corretas.');
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

                        <Form ref={formRef} onSubmit={handleSignIn}>

                            <Input 
                            name="email" 
                            icon="mail" 
                            placeholder="E-mail" 
                            autoCorrect={false} 
                            autoCapitalize="none" 
                            keyboardType="email-address" 
                            returnKeyType="next" 
                            onSubmitEditing={() => {
                                passwordInputRef.current.focus();
                            }}/>

                            <Input 
                            ref = {passwordInputRef}
                            name="password" 
                            icon="lock" 
                            placeholder="Senha" 
                            secureTextEntry 
                            returnKeyType="send" 
                            onSubmitEditing={() => {
                                formRef.current?.submitForm();
                            }}/>
                            
                            <Button onPress={() => {formRef.current?.submitForm()}}>Entrar</Button>

                        </Form>

                        <ForgotPassword onPress={() => {navigation.navigate("Dash")}}>
                            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
                        </ForgotPassword>
                    </Container>

                    <CreateAccountButton onPress={() => {navigation.navigate("SignUp")}} >
                        <CreateAccountButtonText>Criar conta</CreateAccountButtonText>
                    </CreateAccountButton>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
}

export default SignIn;