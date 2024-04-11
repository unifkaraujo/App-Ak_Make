import React, {Component} from 'react'
import { View, Text, StyleSheet, SafeAreaView, TextInput, Image, TouchableOpacity, Alert, FlatList, Platform, KeyboardAvoidingView} from 'react-native'

import Estilo from '../components/Estilo'

import Icon from 'react-native-vector-icons/FontAwesome'
import IconIo from 'react-native-vector-icons/Ionicons'

import moment from 'moment'
import 'moment/locale/pt-br'

import DateTimePicker from '@react-native-community/datetimepicker'

import axios from 'axios'

import { ListItem, Button } from '@rneui/themed'

export default class App extends Component {

  state = {
    nomeInput: this.props.route.params.nomeCad ? this.props.route.params.nomeCad : '',
    apelidoInput: this.props.route.params.apelido ? this.props.route.params.apelido : '',
    CPFInput: this.props.route.params.CPF ? this.props.route.params.CPF : '',
    telefoneInput: this.props.route.params.telefone ? this.props.route.params.telefone : '',
    IDInput: this.props.route.params.id ? this.props.route.params.id : '',
    pontosInput: this.props.route.params.pontos ? this.props.route.params.pontos : 0,
    idFirebase: this.props.route.params.idFirebase ? this.props.route.params.idFirebase : 0,
    dataInput: '',
    selectedDate: new Date(),
    showDatePicker: false,
    hrData: null,
    minData: null,
    tipo: '',
    AgendamentosCad: []
  }

  resetState = () => {
    this.setState({ nomeInput: '', apelidoInput: '', CPFInput: '', telefoneInput: '', IDInput: 0, pontosInput: 0})
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

  setHrData = (hrData) => {
    this.setState({ hrData })
  }

  setMinData = (minData) => {
    this.setState({ minData })
  }

  setTipo = (tipo) => {
    this.setState({ tipo })
  }

  setAgendamentosCad = (agendamentos) => {
    this.setState({ AgendamentosCad: agendamentos })
  }

  compararDatas(a, b) {
    const dataA = new Date(a.data);
    const dataB = new Date(b.data);
    return dataA - dataB;
  }


  retornaDataHoraFormatada = (dataHoraAtual) => {

    // Obter a data e hora atual
    const ano = dataHoraAtual.getFullYear().toString().padStart(4, '0')
    const mes = (dataHoraAtual.getMonth() + 1).toString().padStart(2, '0') // Os meses são zero-indexed (janeiro = 0)
    const dia = dataHoraAtual.getDate().toString().padStart(2, '0')
    const hora = dataHoraAtual.getHours().toString().padStart(2, '0');
    const minutos = dataHoraAtual.getMinutes().toString().padStart(2, '0');

    // Formatar a data e hora como uma string
    const dataHoraFormatada = `${dia}/${mes}/${ano} ${hora}:${minutos}`;

    return dataHoraFormatada
  }

  imprimeAgendamentos = (idFirebase) => {

    axios.get(`/agendamentos.json`)
      .catch(err => console.log(err))
      .then(res => {

      // Pegamos todo o JSON de agendamentos
      const posts = res.data
      const agendamentos = []
      let i = 0
      
      // Primeiro varremos cada elemento do JSON (cada registro de agendamento)
      // Nesse caso gravamos em postId o id principal do agendamento (id do Firebase)
      for (const postId in posts) {
        
        // Verificamos se o agendamento possui o Id que resgatamos acima (creio que sempre vai dar True)
        if (posts.hasOwnProperty(postId)) {

          // Dentro de todo o JSON de agendamentos, filtramos apenas os dados do Id que filtramos e estamos trabalhando
          // postData armazena todo o objeto do agendamento atual
          const postData = posts[postId];

          // Verificamos se o atributo cliente do objeto filtrado é igual ao cliente que estamos querendo localizar
          if (postData.cliente === this.state.idFirebase) {
          
            // Setamos uma data atual e verificamos se a data do nosso registro filtrado é maior que a atual, se sim, inserimos os dados
            const dataHoje = new Date()
            dataHoje.setHours(0, 0, 0, 0)
        
            const dataHoraTemp = new Date(postData.data)
            dataHoraTemp.setHours(0, 0, 0, 0)

            if (dataHoraTemp >= dataHoje) {
              const dataFormatada = postData.data
            
              let tipoAgend = ''
              if (postData.tipo || postData.tipo!='') {
                tipoAgend = postData.tipo
              }

              // Formatamos o objeto que sera inserido no array
              const agendamentoFormatado = {'idFirebase': postId, 'id': postData.id, 'data' : dataFormatada, 'tipo' : tipoAgend}
              agendamentos.push(agendamentoFormatado)
            }
          }
        
        }
      }

      // Utilizamos um sort para ordenar por data, de forma crescente, os elementos do array
      agendamentos.sort(this.compararDatas)

      // Agora varremos o array e alteramos a data para formatar a visualização no formato brasileiro
      // Obs: Até aqui, tivemos que trabalhar com a data no formato americano, para funcionar o sort
      agendamentos.forEach(agendamento => {
        const dataHora = new Date(agendamento.data)
        agendamento.data = this.retornaDataHoraFormatada(dataHora)
      });

      this.setAgendamentosCad(agendamentos)

      })
    
  }

    inserirAgendamento = () => {

        const dataHoraAtual = this.retornaDataHora(this.state.selectedDate)

        const newAgend = {
            id: Math.random(),
            cliente: this.props.route.params.idFirebase,
            data: dataHoraAtual,
            tipo: this.state.tipo
        }
  
        axios.post('/agendamentos.json', { ...newAgend } )
          .catch(err => console.log(err))
          .then(res => {
            
            alert ('Cadastro realizado com sucesso');
            
            this.props.navigation.reset({
              index: 0,
              routes: [{ 
              name: 'Consulta',
              params: {
                cliID: this.props.route.params.idFirebase
                }
              }]
            })
          })

      }

      retornaDataHora = (dataHoraAtual) => {

        // Obter a data e hora atual
        const ano = dataHoraAtual.getFullYear()
        const mes = dataHoraAtual.getMonth() + 1
        const dia = dataHoraAtual.getDate()
        let hora = dataHoraAtual.getHours()
        let minutos = dataHoraAtual.getMinutes()
        let segundos = dataHoraAtual.getSeconds()
        segundos = '00' 
        minutos = '00'
        hora = '00'
    
        if (this.state.minData!='' && this.state.minData && 
        (this.state.minData.toString().length === 2 || this.state.minData.toString().length === 1) &&
        parseInt(this.state.minData) < 60) {
          minutos = this.state.minData.toString().padStart(2, '0')
        }
    
        if (this.state.hrData!='' && this.state.hrData && 
        (this.state.hrData.toString().length === 2 || this.state.hrData.toString().length === 1) &&
        parseInt(this.state.hrData) < 24) {
          hora = this.state.hrData.toString().padStart(2, '0');
        }
    
        // Formatar a data e hora como uma string
        const dataHoraFormatada = `${ano}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;
    
        return dataHoraFormatada
      }

  showDatePicker = () => {
      this.setState({ showDatePicker: true });
   }

  handleDateChange = (event, selectedDate) => {

        if (event.type === 'set') {
          // O usuário selecionou uma data, faça algo com ela
          this.setState({ selectedDate, showDatePicker: false });
        } else {
          // O usuário cancelou a seleção, feche o calendário
          this.setState({ showDatePicker: false });
        }
      };

  componentDidMount() {
    this.imprimeAgendamentos(this.props.route.params.idFirebase)
  }

  deletarRegistro = (user) => {

    if (user.idFirebase) {

      Alert.alert(
        'Confirmação',
        'Deseja realmente deletar o agendamento selecionado?',
        [
          {
            text: 'Sim',
            onPress: () => {
              
              axios.delete(`/agendamentos/${user.idFirebase}.json`)
                .then(res => {
                  Alert.alert ('Sucesso', 'Agendamento deletado da base de dados!')
                  this.imprimeAgendamentos(this.props.route.params.idFirebase)
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

  getActions = (user) => {
    return (

      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent'}}>

        <View style={{ marginLeft: 5 }}>
          <Button
            type='clear'
            onPress={() => this.deletarRegistro(user)}
            icon={<Icon name="trash-o" size={25} color="#AAA" />}
          />
        </View>

      </View>

    );
  }

  getUserItem = ({ item: user }) => {
    return (

      <ListItem key={user.id} bottomDivider >
          
          <ListItem.Content>
              <ListItem.Title>{user.data}</ListItem.Title>
              <ListItem.Subtitle>{user.tipo}</ListItem.Subtitle>
              
          </ListItem.Content>

          {this.getActions(user)}

        </ListItem>
        
  
    );
  }

  back = () => {
    return (
      this.props.navigation.reset({
        index: 0,
        routes: [{ 
          name: 'Consulta',
          params: {
            cliID: this.props.route.params.idFirebase,
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
                onPress={() => this.componentDidMount()}>
                <IconIo name="reload" size={27} color='black' />
              </TouchableOpacity>  

            </View>  

            <View style={styleApp.AppCenter} >

              <View style={{alignItems: 'center'}} > 

                <View style={[Estilo.InputCadNome, {justifyContent: 'center',}]} >
                  <Text style={{color: 'black'}}> {this.props.route.params.nomeCad} </Text>
                </View> 

                <View style={Estilo.ViewAgCad}> 

                  <TouchableOpacity
                      onPress={this.showDatePicker} >
                      <Icon name="calendar-check-o" size={50} color="white" />
                  </TouchableOpacity>
                
                  {this.state.showDatePicker && (
                  <DateTimePicker
                    value={this.state.selectedDate}
                    mode="date" // Você pode usar 'date' para apenas data
                    is24Hour={true}
                    display="default"
                    onChange={this.handleDateChange}
                  />
                  )}

                  <View style={[Estilo.InputCadDate, {justifyContent: 'center',}]} >
                      <Text style={{color: 'black'}}> {moment(this.state.selectedDate).locale('pt-br').format('ddd, D [de] MMMM').toString()} </Text>
                  </View>

                </View>

                <View style={Estilo.ViewAgCad} >

                      <TextInput style={Estilo.InputCadhrmin}
                        placeholder="HR"
                        value={this.state.hrData}
                        onChangeText={this.setHrData}
                      />

                    <Text style={{color:'white', alignItems: 'center', justifyContent: 'center', marginTop: 15, paddingHorizontal: 3}}> 
                        : 
                    </Text>

                    <TextInput style={[Estilo.InputCadhrmin, {marginRight: 4}]}
                        placeholder="MIN"
                        value={this.state.minData}
                        onChangeText={this.setMinData}
                      />

                      <TextInput style={Estilo.InputCadproc}
                        placeholder="Procedimento"
                        value={this.state.tipo}
                        onChangeText={this.setTipo}
                      />

                </View>

                <View style={Estilo.InputLocCadastro}>
              
                  <TouchableOpacity
                    style={Estilo.BotaoCadLocCadastro}
                    onPress={this.inserirAgendamento} >
                    <Text style={Estilo.AgendarText}> AGENDAR </Text>
                  </TouchableOpacity>

                </View>

              </View> 

            </View>

            <View style={styleApp.joinagendamento}> 

                <FlatList 
                  keyExtractor={(user) => user.id.toString()}
                  data={this.state.AgendamentosCad}
                  renderItem={this.getUserItem}
                />

            </View>
          
            <TouchableOpacity style={styleApp.addButton}
              onPress={this.back}
              activeOpacity={1.0}>
              <IconIo name="arrow-back" size={40} color='white' />
            </TouchableOpacity>

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
    textAlign: "center",
    backgroundColor: '#27282D',
  },

  joinagendamento: {
    flex: 1,
    marginTop: 20
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