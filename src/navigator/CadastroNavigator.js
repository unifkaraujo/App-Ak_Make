import React, {} from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LocCadastro from '../screens/CadastroForm'
import CadastroListItem from '../screens/CadastroLista'


const Stack = createNativeStackNavigator()

export default props => {
    
    return (

        <Stack.Navigator initialRouteName='ListaCad' screenOptions={{ headerShown: false }}> 

            <Stack.Screen
                name='ListaCad'
                component={CadastroListItem}   
                options={{
                    title: 'Lista de Usuário',
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

const style = StyleSheet.create ( {

    form: {
        padding: 12,
    },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15
    }

})