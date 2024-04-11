import React, {Component} from 'react'
import { View, Text, StyleSheet, SafeAreaView, Alert, Image, TouchableOpacity} from 'react-native'

import Estilo from '../components/Estilo'

import IconIo from 'react-native-vector-icons/Ionicons'

import axios from 'axios'

export default class App extends Component {

  resetaTabela  = () => {

      Alert.alert(
        'Confirmação',
        'Deseja realmente resetar a base de dados?',
        [
          {
            text: 'Sim',
            onPress: () => {

                axios.delete(`/clientes.json`)
                .then(res => {
                  axios.delete(`/agendamentos.json`)
                    .then(res => {
                      console.log("Registro excluído com sucesso")
                      Alert.alert ('Sucesso', 'Base de dados resetada com sucesso!')

                      this.props.navigation.reset({
                        index: 0,
                        routes: [{ 
                          name: 'Relatorios',
                        }]
                      })

                    })
                    .catch(err => {
                      console.error("Erro ao resetar tabela:", err);
                    })
                  })
                .catch(err => {
                  console.error("Erro ao resetar tabela:", err);
                })

            }  
          },
        { text: 'Não', onPress: () => console.log('A operação foi cancelada') },
        ]
      )
  }

  back = () => {
    return (
      this.props.navigation.reset({
        index: 0,
        routes: [{ 
          name: this.props.route.params.view,
          params: {
            cliID: this.state.IDInput,
          }
        }]
      })
    )
  }

  render() {

    return (

      <SafeAreaView style={styleApp.App}> 

        <View style={{flexDirection: 'row'}}> 

                <Image style={{width: '100%', height: 150, marginBottom: 10}} 
                source={require('../../images/fundobranco.jpeg')} />

                <TouchableOpacity
                  style={{position: 'absolute', right: 10, top: 10}}
                  activeOpacity={0.7}>
                  <IconIo name="reload" size={27} color='black' />
                </TouchableOpacity>  

        </View>  

        <View style={styleApp.AppCenter} >

          <View style={{alignItems: 'center'}} >

            <TouchableOpacity 
            style={Estilo.BotaoResetar} 
            onPress={this.resetaTabela}>
              <Text style={Estilo.TextBotaoCad}> RESETAR DADOS </Text>
            </TouchableOpacity>

          </View>
        </View> 

        <TouchableOpacity style={styleApp.addButton}
          onPress={() => this.props.navigation.goBack()}
          activeOpacity={1.0}>
          <IconIo name="arrow-back" size={40} color='white' />
        </TouchableOpacity>

      </SafeAreaView>

  )
}}

const styleApp = StyleSheet.create({
  App: {
    flexGrow: 1,
    backgroundColor: '#27282D',
  },

  AppCenter: {
    flexGrow: 1,
    padding: 10,
    textAlign: "center",
    backgroundColor: '#27282D',
  },

  addButton: {
    position: 'absolute',
    left: 45,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#b5888d',
    justifyContent: 'center',
    alignItems: 'center',
  },

})