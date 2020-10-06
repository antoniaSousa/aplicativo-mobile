import React from 'react';
import {Image, View, KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logImg from '../../assets/logo.png';

import { Container, Title, ForgotPassword, ForgotPassworText,
  CreateAccountButtonText, CreateAccountButton } from './styles';

const SignIn: React.FC = () =>{
  return (
    <>
    <KeyboardAvoidingView
    style={{flex: 1}}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    enabled
    >
    <ScrollView
    keyboardShouldPersistTaps="handled"
    contentContainerStyle= {{flex: 1}}>
    <Container>
    <Image source={logImg} />
    <View>
    <Title>Faça seu logon </Title>
    </View>

    <Input name= "email" icon="mail"placeholder="E-mail"/>
    <Input name="password" icon="lock" placeholder="Senha"/>

    <Button onPress={()=>{}}>
      Entrar
      </Button>

    <ForgotPassword onPress={() => {}}>
    <ForgotPassworText>Esqueci minha senha </ForgotPassworText>
    </ForgotPassword>
  </Container>
  </ScrollView>
  <CreateAccountButton onPress={()=>{}}>
    <Icon name="log-in" size={20} color="#ff9000" ></Icon>
    <CreateAccountButtonText>Criar uma conta

    </CreateAccountButtonText>

  </CreateAccountButton>
  </KeyboardAvoidingView>
  </>
 );
};

export default SignIn;
