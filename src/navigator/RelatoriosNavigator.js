import React, { useState } from 'react'
import { Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Relatorios from '../screens/Relatorios'
import Configuracoes from '../screens/Configuracoes'

const Stack = createNativeStackNavigator()

export default props => {

    return (

        <Stack.Navigator initialRouteName='Relatorios' screenOptions={{ headerShown: false }}> 

            <Stack.Screen
                name='Relatorios'
                component={Relatorios}
                options={{
                    title: 'Relatórios',
                }}          
            />

            <Stack.Screen
                name='Configuracoes'
                component={Configuracoes}
                options={{
                    title: 'Configurações',
                }}                
            />

        </Stack.Navigator>

    )

}