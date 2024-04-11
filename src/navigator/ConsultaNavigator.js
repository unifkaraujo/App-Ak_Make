import React, { useState } from 'react'
import { Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Consulta from '../screens/Consulta'
import CadAgend from '../screens/CadAgend'
import LocCadastro from '../screens/CadastroForm'

const Stack = createNativeStackNavigator()

export default props => {

    const [atualizaAgend, setatualizaAgend] = useState(0) // Defina o estado aqui

    const CadAgendNav = (props) => <CadAgend setatualizaAgend={setatualizaAgend} atualizaAgend={atualizaAgend} {...props} />

    return (

        <Stack.Navigator initialRouteName='Consulta' screenOptions={{ headerShown: false }}> 

            <Stack.Screen
                name='Consulta'
                component={Consulta}
                options={{
                    title: 'Consulta',
                }}          
            />

            <Stack.Screen
                name='CadAgend'
                component={CadAgendNav}
                options={{
                    title: 'CadAgend',
                }}                
            />

            <Stack.Screen
                name='LocCadastro'
                component={LocCadastro}
                options={({ route }) => ({
                    title: 'Formulário de Usuários',
                })}             
            />

        </Stack.Navigator>

    )

}