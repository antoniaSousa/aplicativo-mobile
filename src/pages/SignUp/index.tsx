import React from 'react';
import {Image, View, KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logImg from '../../assets/logo.png';

import { Container, Title,
  BackToSignInText, BackToSignIn } from './styles';

const SignUp: React.FC = () =>{
  const navigation = useNavigation();
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
    <Title>Crie sua conts </Title>
    </View>
    <Input name= "name" icon="user"placeholder="Nome"/>
    <Input name= "email" icon="mail"placeholder="E-mail"/>
    <Input name="password" icon="lock" placeholder="Senha"/>

    <Button onPress={()=>{}}>
      Entrar
      </Button>

  </Container>
  </ScrollView>
  <BackToSignIn onPress={()=> navigation.goBack()}>
    <Icon name="arrow-left" size={20} color="#ffff" ></Icon>
    <BackToSignInText>Voltar logon

    </BackToSignInText>
    </BackToSignIn>
  </KeyboardAvoidingView>
  </>
 );
};

export default SignUp;
