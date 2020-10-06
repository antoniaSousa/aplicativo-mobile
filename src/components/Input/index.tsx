import React from 'react';
import { TextInputProps } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import  Icon  from 'react-native-vector-icons/Feather';


import { Container } from './styles';
interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

const Input: React.FC <InputProps> = ({name, icon, ...rest}) => (
  <Container>
    <Icon name={icon} size={20} color="#666360" />
<TextInput placeholderTextColor="#666366" {...rest} />

    </Container>

);
export default Input;


