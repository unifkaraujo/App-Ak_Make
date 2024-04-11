import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect } from 'react';
import StatusBarCustom from './statusbar'
import Icon from 'react-native-vector-icons/FontAwesome';
import Consulta from './navigator/ConsultaNavigator'
import Cadastro from './navigator/CadastroNavigator'
import Relatorios from './navigator/RelatoriosNavigator'
import Agenda from './screens/Agenda'

const Tab = createBottomTabNavigator();


function MyTabs() {

  useEffect(() => {
    StatusBar.setBackgroundColor('#ffffff');
  }, []);
  
  return (

    <Tab.Navigator screenOptions={{ headerShown: false }}> 

      <Tab.Screen
        name="Início"
        component={Consulta}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Cadastro"
        component={Cadastro}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="edit" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Agenda"
        component={Agenda}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Relatórios"
        component={Relatorios}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="bar-chart" color={"green"} size={size} />
          ),
        }}
      />

    </Tab.Navigator>

  );
}

export default function App() {
  return (


    <NavigationContainer>
      <StatusBarCustom />
      <MyTabs /> 
    </NavigationContainer>


  );
}
