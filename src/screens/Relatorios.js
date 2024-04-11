import React, {Component} from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, FlatList} from 'react-native'

import Estilo from '../components/Estilo'

import IconIo from 'react-native-vector-icons/Ionicons'

import axios from 'axios'

import { ListItem } from '@rneui/themed'


export default class App extends Component {

  state = {
    nome: '',
    IDArray : [],
    IDArrayData : [],
    nomeArray: [],
    CPFArray: [],
    pontosArray: [],
    DataArray: [],
    TipoArray: [],
    clientePonto: [],
    exibeClientePonto: false,
    AgendamentosCad: [],
    exibeAgendamentos: false,
    clienteOrdenado: []
  }

  setIDArray = (IDArray) => {
    this.setState({ IDArray: IDArray })
  }

  setNome = (nome) => {
    this.setState({ nome })
  }

  setIDArrayData = (IDArrayData) => {
    this.setState({ IDArrayData })
  }

  setNomeArray = (nomeArray) => {
    this.setState({ nomeArray: nomeArray })
  }

  setCPFArray = (CPFArray) => {
    this.setState({ CPFArray: CPFArray })
  }

  setPontosArray = (pontosArray) => {
    this.setState({ pontosArray: pontosArray })
  }

  setDataArray = (DataArray) => {
    this.setState({ DataArray })
  }

  setTipoArray = (TipoArray) => {
    this.setState({ TipoArray })
  }

  setClientePonto = (clientePonto) => {
    this.setState({ clientePonto })
  }

  setClienteOrdenado = (clientePonto) => {
    this.setState({ clienteOrdenado: clientePonto })
  }

  setAgendamentosCad = (agendamentos) => {
    this.setState({ AgendamentosCad: agendamentos })
  }

  resetaRel = () => {
    this.setIDArray([])
    this.setIDArrayData([])
  }

  compararPontos(a, b) {
    const pontoA = a.pontos;
    const pontoB = b.pontos;
    return pontoB - pontoA;
  }

  compararNomes(a, b) {
    const nomeA = a.nome.toUpperCase();
    const nomeB = b.nome.toUpperCase();

    if (nomeA < nomeB) {
      return -1;
    }
    if (nomeA > nomeB) {
      return 1;
    }
    return 0;
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

  localizarRegistros = () => {

    this.setState({ exibeClientePonto: true })
    this.setState({ exibeAgendamentos: false })

    axios.get(`/clientes.json`)
      .catch(err => console.log(err))
      .then(res => {

      const clientes = res.data
      const clientePonto = []
      let i = 0
              
      for (const clienteId in clientes) {
        if (clientes.hasOwnProperty(clienteId)) {
          const clienteData = clientes[clienteId];

          const cliente = {'id' : clienteData.id, 'nome' : clienteData.nome, 'pontos' : clienteData.pontos, 'CPF' : clienteData.CPF}

          clientePonto.push(cliente)
        }
      }
      
      clientePonto.sort(this.compararPontos);
      this.setClientePonto(clientePonto)

      })
    }

    localizarRegistrosOrdenado = () => {

      this.setState({ exibeClientePonto: false })
      this.setState({ exibeAgendamentos: true })
  
      axios.get(`/clientes.json`)
        .catch(err => console.log(err))
        .then(res => {
  
        const clientes = res.data
        const clientePonto = []
        let i = 0
                
        for (const clienteId in clientes) {
          if (clientes.hasOwnProperty(clienteId)) {
            const clienteData = clientes[clienteId];
  
            const cliente = {'id' : clienteData.id, 'nome' : clienteData.nome, 'apelido' : clienteData.apelido, 'CPF' : clienteData.CPF}
  
            clientePonto.push(cliente)
          }
        }
        
        clientePonto.sort(this.compararNomes);
        this.setClienteOrdenado(clientePonto)
  
        })
      }

    localizarRegistrosEsp = async(idFirebase) => {
  
      if (!idFirebase) {
        return
      }
      try {
        const res = await axios.get(`/clientes/${idFirebase}.json`) 
        const registro = res.data
        return registro.nome
          
      } catch(e) {
          showError(e)
      }
  
    }

  localizarProxAgend = async() => {

    try {
      this.setState({ exibeAgendamentos: true })
      this.setState({ exibeClientePonto: false })

      const response = await axios.get(`/agendamentos.json`);
      const posts = response.data;
      const agendamentos = [];
      let i = 0
              
      for (const postId in posts) {
        if (posts.hasOwnProperty(postId)) {
          const postData = posts[postId];

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

              // Obtém o nome do cliente
              const clienteResponse = await axios.get(`/clientes/${postData.cliente}.json`);
              const clienteRegistro = clienteResponse.data;
              const nomeCliente = clienteRegistro.nome;

              const agendamentoFormatado = {'id' : postData.id, 'data' : dataFormatada, 'tipo' : tipoAgend, 'nome' : nomeCliente}
              agendamentos.push(agendamentoFormatado)

            }
        
        }
      }

      agendamentos.sort(this.compararDatas)

      agendamentos.forEach(agendamento => {
      const dataHora = new Date(agendamento.data)
      agendamento.data = this.retornaDataHoraFormatada(dataHora)
      });

      this.setAgendamentosCad(agendamentos)
      
    } catch (error) {
        console.error("Erro ao localizar próximos agendamentos:", error);
    }
  }

getUserItemAg = ({ item: user }) => {
  
  return (

    <ListItem key={user.id} bottomDivider >
        
          <View style={{justifyContent: 'space-between', flex: 1, flexDirection: 'row'}}> 

            <ListItem.Title>{user.nome}</ListItem.Title>
            <ListItem.Title>{user.CPF}</ListItem.Title>
            <ListItem.Title>{user.apelido}</ListItem.Title>
          
          </View>
        
      </ListItem>

    );
  }

getUserItem = ({ item: user }) => {
  
  return (

    <ListItem key={user.id} bottomDivider >
        
          <View style={{justifyContent: 'space-between', flex: 1, flexDirection: 'row'}}> 

            <ListItem.Title>{user.nome}</ListItem.Title>
            <ListItem.Title>{user.CPF}</ListItem.Title>
            <ListItem.Title>{user.pontos}</ListItem.Title>
          
          </View>
        
      </ListItem>

    );
  }

  render() {

    return (

      
      <SafeAreaView style={styleApp.App}> 
      
              <View style={{flexDirection: 'row'}}> 

                <Image style={{width: '100%', height: 150, marginBottom: 10}} 
                source={require('../../images/fundobranco.jpeg')} />

                <TouchableOpacity
                  style={{position: 'absolute', right: 10, top: 10}}
                  activeOpacity={0.7}
                  onPress={() => {
                    if (this.state.exibeClientePonto) {
                      this.localizarRegistros()
                    }
                    else if (this.state.exibeAgendamentos) {
                      this.localizarRegistrosOrdenado()
                    }
                  }}>
                  <IconIo name="reload" size={27} color='black' />
                </TouchableOpacity>  

              </View>  

              <View style={styleApp.AppCenter} >

                <View style={{alignItems: 'center'}} >

                  <TouchableOpacity 
                  style={Estilo.BotaoRel1} 
                  onPress={this.localizarRegistros}>
                    <Text style={Estilo.TextBotaoCad}> CLIENTES P/ PONTOS </Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                  style={Estilo.BotaoRel} 
                  onPress={this.localizarRegistrosOrdenado}>
                    <Text style={Estilo.TextBotaoCad}> CLIENTES P/ ORDEM ALFABÉTICA </Text>
                  </TouchableOpacity>

                </View>

                {this.state.exibeClientePonto && (

                  <View style={{marginTop: 10}}> 

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', 
                                  paddingHorizontal: 15, paddingTop: 15, paddingBottom: 10 }}>
                        <Text style={{color: 'black', fontWeight: 'bold'}}>Nome</Text>
                        <Text style={{color: 'black', fontWeight: 'bold'}}>CPF</Text>
                        <Text style={{color: 'black', fontWeight: 'bold'}}>Pontos</Text>
                    </View>

                    <View style={{height: '80%'}} >
                      <FlatList 
                          keyExtractor={(user) => user.id.toString()}
                          data={this.state.clientePonto}
                          renderItem={this.getUserItem}
                          contentContainerStyle={{ paddingBottom: 100 }}
                      />
                    </View>


                  </View>

                )}

                {this.state.exibeAgendamentos && (

                  <View style={{marginTop: 10}}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', 
                                  paddingHorizontal: 15, paddingTop: 15, paddingBottom: 10 }}>
                        <Text style={{color: 'black', fontWeight: 'bold'}}>Nome</Text>
                        <Text style={{color: 'black', fontWeight: 'bold'}}>CPF</Text>
                        <Text style={{color: 'black', fontWeight: 'bold'}}>Apelido</Text>
                    </View>

                    <View style={{height: '80%'}} >
                      <FlatList 
                          keyExtractor={(user) => user.id.toString()}
                          data={this.state.clienteOrdenado}
                          renderItem={this.getUserItemAg}
                          contentContainerStyle={{ paddingBottom: 100 }}
                      />
                    </View>


                  </View>

                )}
 

              </View> 

          <TouchableOpacity style={styleApp.confButton}
            activeOpacity={0.7}
            onPress={() => this.props.navigation.navigate('Configuracoes')}>
            <IconIo name="settings-sharp" size={35} color='white' />
          </TouchableOpacity> 

      </SafeAreaView>
      

  )
}}

const styleApp = StyleSheet.create({
  App: {
    flex: 1,
    backgroundColor: '#27282D',
  },

  AppCenter: {
    padding: 10,
    textAlign: "center",
    backgroundColor: '#27282D',
    justifyContent: 'center',
  },


  AppJoin: {
    backgroundColor: '#FFF',
    width: '100%',
    borderRadius: 5,
    marginTop: 10
  },

  confButton: {
    position: 'absolute',
    right: 45,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b35f6d',
  },

})