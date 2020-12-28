import React, { useCallback, useEffect, useMemo, useState } from 'react';
import  {useNavigation, useRoute} from '@react-navigation/native';
import  Icon from 'react-native-vector-icons/Feather';
import { HeaderTitle } from '@react-navigation/stack';
import { useAuth } from '../../hooks/auth';
//import DateTimePicker from '@react-native-community/datepicker';
import { format } from 'date-fns'
import api from '../../services/api';
import {
  Container,
  BackButton,
  Header,
  UserAvatar,
  Content,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  Schedule,
  Section,
  SectionContent,
  Hour,
  HourText,
  SectionTitle,
  CreateAppointmentButtonText,
  CreateAppointmentButton

} from './styles';
import { Alert, Platform } from 'react-native';


interface RouteParams {
  providerId: String;
}
export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}
interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const route = useRoute();
  const { goBack, navigate} = useNavigation();

  const routeParams = route.params as RouteParams;

  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectDate] = useState(new Date());
  const [selectedHour, setSelectHour] = useState(0);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId);

  useEffect(() => {
    api.get('providers').then((response) => {
      setProviders(response.data);
    });
  }, []);
  useEffect(() => {
    api.get(`providers/${selectedProvider}/day-availability`,{
    params:{
    year: selectedDate.getFullYear(),
    month: selectedDate.getMonth() + 1,
    day: selectedDate.getDate(),
    }
  }).then(response =>{
    setAvailability(response.data);
  });
  }, [selectedDate, selectedProvider]);

  const navigateBack = useCallback(() =>{
    goBack();
  }, [ goBack]);
  const handleSelectProvider = useCallback((providerId: string) =>{
    setSelectedProvider(providerId);
  }, []);
  const handleToggleDatePicker = useCallback(() =>{
    setShowDatePicker((state) => !state);
  }, []);
 const handleDateChanged = useCallback(
   (event: any, date: Date | undefined)=> {
   if (Platform.OS === 'android'){
     setShowDatePicker(false);
   }
   if(date){
   setSelectDate(date);
  }
},[],);

 const handleSelectHour = useCallback((hour: number)=>{
  setSelectHour(hour)
 }, []);

 const handleCreateAppointment = useCallback(async ()=>{
 try{
  const date = new Date(selectedDate);
  date.setHours(selectedHour);
  date.setMinutes(0);

  await api.post('appointments', {
    provider_id: selectedProvider,
    date,
  })
  navigate( 'AppointmentCreate', {date: date.getTime()})
 }catch(err){
  Alert.alert('Erro ao criar agendamento',
  'Ocorreu um erro ao tentar criar o agendamento, tente novamente');
 }
 }, [navigate, selectedDate, selectedHour, selectedProvider]);
 const morningAvailability = useMemo(()=> {
 return availability.filter(({hour}) => hour < 12)
 .map(({hour, available})=>{
   return {
   hour,
   hourFormatted: format(new Date().setHours(hour), 'HH:00'),
   available,
   };
  });
 }, [availability]);
 const afternoonAvailability = useMemo(()=> {
  return availability.filter(({hour}) => hour >=12)
  .map(({hour, available})=>{
    return {
    hour,
    hourFormatted: format(new Date().setHours(hour), 'HH:00'),
    available,
    };
   });
  }, [availability]);

  return(
  <Container>
   <Header>
     <BackButton onPress={navigateBack}>
      <Icon name="cheveron-letf" size={24} color="#999591" />
      <HeaderTitle>Cabeleireiros</HeaderTitle>
      <UserAvatar source={{uri: user.avatar_url}}/>
     </BackButton>
   </Header>
   <Content>
   <ProvidersListContainer>
   <ProvidersList
   horizontal
   showsHorizontalScrollIndicator={false}
     data={providers}
     keyExtractor={(provider) => provider.id}
    renderItem={({item: provider})=> (
    <ProviderContainer onPress={()=> handleSelectProvider(provider.id)}
    selected={provider.id === selectedProvider}>
     <ProviderAvatar source={{uri: provider.avatar_url}}/>
    <ProviderName selected={provider.id === selectedProvider}>
      {provider.name}
    </ProviderName>
    </ProviderContainer>
     )}
   />
   </ProvidersListContainer>
   <Calendar>
     <Title>Escolha a data</Title>
     <OpenDatePickerButton onPress={handleToggleDatePicker}></OpenDatePickerButton>
     <OpenDatePickerButtonText>Selecionar outra data</OpenDatePickerButtonText>
     {showDatePicker && (
     <DateTimePicker
    mode="date"
    display="calendar"
    onChange={handleDateChanged}
    // textColor="#f4ede8"
    value={selectedDate}
    />
     )}
   </Calendar>
   <Schedule>
          <Title>Escolha o horário</Title>

          <Section>
            <SectionTitle>Manhã</SectionTitle>

            <SectionContent>
              {morningAvailability.map(({ hourFormatted, hour, available }) => (
                <Hour
                enabled={available}
                  selected={ selectedHour === hour}
                  available={available}
                  key={hourFormatted}
                  onPress={() => handleSelectHour(hour)}>
                  <HourText selected={selectedHour === hour}>{hourFormatted}</HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>
       {afternoonAvailability.map(({hourFormatted, hour, available}) =>(
        <Hour
        enabled={available}
        selected={ selectedHour === hour}
        available={available}
        key={hourFormatted}
        onPress={() => handleSelectHour(hour)}>
       <HourText selected={selectedHour === hour}>{hourFormatted}</HourText>
   </Hour>
   ),
   )}
  </Schedule>
   <CreateAppointmentButton onPress={handleCreateAppointment}>
  <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
  </CreateAppointmentButton>
   </Content>
  </Container>
 );
 }
export default CreateAppointment;