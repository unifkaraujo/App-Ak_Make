import React, { Component } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TextInput, Image, TouchableOpacity, Alert, KeyboardAvoidingView} from 'react-native'

import Estilo from '../components/Estilo'

import Icon from 'react-native-vector-icons/FontAwesome'
import IconIo from 'react-native-vector-icons/Ionicons'

import axios from 'axios'

export default class App extends Component {

  state = {
    nomeInput: this.props.route.params.user.nome ? this.props.route.params.user.nome : '',
    apelidoInput: this.props.route.params.user.apelido ? this.props.route.params.user.apelido : '',
    CPFInput: this.props.route.params.user.CPF ? this.props.route.params.user.CPF : '',
    telefoneInput: this.props.route.params.user.telefone ? this.props.route.params.user.telefone : '',
    IDInput: this.props.route.params.user.id ? this.props.route.params.user.id : 0,
    pontosInput: this.props.route.params.user.pontos ? this.props.route.params.user.pontos : '',
    idFirebase: this.props.route.params.user.idFirebase ? this.props.route.params.user.idFirebase : 0,
  }

  resetState = () => {
    this.setState({ nomeInput: '', apelidoInput: '', CPFInput: '', telefoneInput: '', IDInput: 0, pontosInput: '', idFirebase: 0})
  }

  setNome = (nome) => {
    this.setState({ nomeInput: nome })
  }

  setID = (ID) => {
    this.setState({ IDInput: ID })
  }

  setApelido = (apelido) => {
    this.setState({ apelidoInput: apelido })
  }

  setCPF = (CPF) => {
    this.setState({ CPFInput: CPF })
  }

  setTelefone = (telefone) => {
    this.setState({ telefoneInput: telefone })
  }

  setPontos = (pontos) => {
    this.setState({ pontosInput: pontos })
  }

  validarNumero(texto) {
    // Remove espaços em branco do início e do fim do texto
    texto = texto.toString().trim();
    
    // Verifica se o texto é vazio
    if (texto === "") {
        return false;
    }

    // Verifica se o texto é um número inteiro
    return !isNaN(texto) && Number.isInteger(parseFloat(texto));
  }

  inserirRegistro = () => {

    const pontos = this.validarNumero(this.state.pontosInput) ? parseInt(this.state.pontosInput) : 0

    if (this.state.nomeInput &&  this.state.nomeInput != '') {

      const newCliente = {
          id: Math.random(), //Isso tenho que arrumar, a ideia vai ser um post/update em um outro JSON, que serve apenas para armazenar o ultimo id usado
          nome: this.state.nomeInput,
          apelido: this.state.apelidoInput,
          CPF: this.state.CPFInput,
          telefone: this.state.telefoneInput,
          pontos: pontos,
      }
      
      axios.post('/clientes.json', { ...newCliente } )
        .catch(err => console.log(err))
        .then(res => {
          
          alert ('Cadastro realizado com sucesso');
          
          this.props.navigation.reset({
            index: 0,
            routes: [{ 
            name: this.props.route.params.view,
            params: {
              cliID: res.data.name,
              }
            }]
          })
        })

      }
  } 

  deletarRegistro  = () => {

    if (this.state.idFirebase) {

      Alert.alert(
        'Confirmação',
        'Deseja realmente deletar o cliente consultado?',
        [
          {
            text: 'Sim',
            onPress: () => {

                axios.delete(`/clientes/${this.state.idFirebase}.json`)
                .then(res => {
                  console.log("Registro excluído com sucesso")
                  Alert.alert ('Sucesso', 'Cliente deletado da base de dados!')

                  this.props.navigation.reset({
                    index: 0,
                    routes: [{ 
                      name: this.props.route.params.view,
                      params: {
                        cliID: this.state.idFirebase,
                      }
                    }]
                  })

                })
                .catch(err => {
                  console.error("Erro ao excluir registro:", err);
                })
            }  
          },
        { text: 'Não', onPress: () => console.log('A operação foi cancelada') },
        ]
      )
    }
  }

  editarRegistro = () => {

    const pontos = this.validarNumero(this.state.pontosInput) ? parseInt(this.state.pontosInput) : 0

    if (this.state.idFirebase) {

        const novosDados = {
          id: this.state.IDInput,
          nome: this.state.nomeInput,
          apelido: this.state.apelidoInput,
          CPF: this.state.CPFInput,
          telefone: this.state.telefoneInput,
          pontos: pontos,
        }

        // Usando o método PATCH para atualizar parcialmente o registro
        axios.patch(`/clientes/${this.state.idFirebase}.json`, novosDados)
          .then(res => {
            alert ('Cliente atualizado com sucesso!')
            this.props.navigation.reset({
              index: 0,
              routes: [{ 
                name: this.props.route.params.view,
                params: {
                  cliID: this.state.idFirebase,
                }
               }]
            })
          })
          .catch(err => {

            console.error("Erro ao atualizar registro:", err);
          });
    }
    else
      alert ('Cliente não selecionado')
  }

    imprimeReg = (registro) => {
   
      this.setID(registro.id)
      this.setNome(registro.nome)
      this.setApelido(registro.apelido)
      this.setCPF(registro.CPF)
      this.setTelefone(registro.telefone)
    
    }

    back = () => {
      return (
        this.props.navigation.reset({
          index: 0,
          routes: [{ 
            name: this.props.route.params.view,
            params: {
              cliID: this.state.idFirebase,
            }
           }]
        })
      )
    }


  render() {

    return (

      <SafeAreaView style={styleApp.App}>

      <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >

          <View style={{flexDirection: 'row'}}> 
          
            <Image style={{width: '100%', height: 150, marginBottom: 10}} 
            source={require('../../images/fundobranco.jpeg')} />

            <TouchableOpacity
                style={{position: 'absolute', right: 10, top: 10}}
                activeOpacity={0.7}
                >
                <IconIo name="reload" size={27} color='black' />
            </TouchableOpacity>  
          </View>

          <View style={styleApp.AppCenter} >

            <View style={{alignItems: 'center'}} >  

              <TextInput style={Estilo.InputCad}
                placeholder="Nome"
                value={this.state.nomeInput}
                onChangeText={this.setNome}
              />

              <TextInput style={Estilo.InputCad}
                placeholder="Apelido"
                value={this.state.apelidoInput}
                onChangeText={this.setApelido}
              />

              <TextInput style={Estilo.InputCad}
                placeholder="CPF"
                value={this.state.CPFInput}
                onChangeText={this.setCPF}
              />

              <TextInput style={Estilo.InputCad}
                placeholder="Telefone"
                value={this.state.telefoneInput}
                onChangeText={this.setTelefone}
              />

              <TextInput style={Estilo.InputCad}
                placeholder="Pontos"
                value={this.state.pontosInput.toString()}
                onChangeText={this.setPontos}
              />

              <View style={Estilo.InputLocCadastro}>
                {this.state.IDInput !== null && this.state.IDInput !== 0 ? (
                  <TouchableOpacity
                    style={Estilo.BotaoCadLocCadastro}
                    onPress={this.editarRegistro}>
                    <Text style={Estilo.TextBotaoCad}> EDITAR </Text>
                  </TouchableOpacity>
                ) : 
                  <TouchableOpacity
                  style={Estilo.BotaoCadLocCadastro}
                  onPress={this.inserirRegistro}>
                  <Text style={Estilo.TextBotaoCad}> CADASTRAR </Text>
                </TouchableOpacity>}

                {this.state.IDInput !== null && this.state.IDInput !== 0 ? (
                <TouchableOpacity 
                style={Estilo.IconLocCadastro}
                onPress={this.deletarRegistro}>
                  <Icon name="trash" size={40} color="white" />
                </TouchableOpacity>
                ) : null}

              </View>
              
            </View>  

            <TouchableOpacity style={styleApp.addButton}
              onPress={this.back}
              activeOpacity={1.0}>
              <IconIo name="arrow-back" size={40} color='white' />
            </TouchableOpacity>

            </View>

        </KeyboardAvoidingView> 

      </SafeAreaView>

  )
}}

const styleApp = StyleSheet.create({
  App: {
    flex: 1,
    backgroundColor: '#27282D',
  },

  AppCenter: {
    flex: 1,
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