import React, {Component} from 'react'
import { View, Text, StyleSheet, SafeAreaView, TextInput, Alert, Image, TouchableOpacity, 
  ScrollView, Modal, FlatList, TouchableWithoutFeedback } from 'react-native'
import { Button } from '@rneui/themed'
import Estilo from '../components/Estilo'
import MegaNumero from '../components/MegaNumero';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconIo from 'react-native-vector-icons/Ionicons';

import axios from 'axios'

export default class App extends Component {

  state = {
    nomeInput: '',
    nomeCad: '',
    apelidoCad: '',
    CPFCad: '',
    telefoneCad: '',
    pontosCad: 0,
    IDCad: 0,
    AgendamentosCad: [],
    showDatePicker: false,
    selectedDate: new Date(),
    hrData: null,
    minData: null,
    tipo: '',
    isDadosCliVisible: true,
    isAgendVisible: true,
    clientes: [],
    clientesFiltrados: [],
    modalVisible: false,
    idFirebase: 0
  }

  resetState = () => {
    this.setState({ nomeInput: '', nomeCad: '', apelidoCad: '', CPFCad: '', telefoneCad: '', pontosCad: 0, 
    IDCad: 0, AgendamentosCad: [], hrData: null, minData: null, tipo: '', idFirebase: 0 })
  }

  setisDadosCliVisible = () => {
    this.setState({ isDadosCliVisible: !this.state.isDadosCliVisible })
  }

  setisAgendVisible = () => {
    this.setState({ isAgendVisible: !this.state.isAgendVisible })
  }

  // Atualiza o estado do input de pesquisa e filtra a lista de clientes
  setNome = nome => {
    const { clientes } = this.state;
    const clientesFiltrados = clientes.filter(cliente =>
      cliente.nome.toLowerCase().includes(nome.toLowerCase())
    );
    this.setState({ nomeInput: nome, clientesFiltrados });
  };

  setIDCad = (ID) => {
    this.setState({ IDCad: ID })
  }

  setIdFirebase = (ID) => {
    this.setState({ idFirebase: ID })
  }

  setNomeCad = (nome) => {
    this.setState({ nomeCad: nome })
  }

  setApelidoCad = (apelido) => {
    this.setState({ apelidoCad: apelido })
  }

  setCPFCad = (CPF) => {
    this.setState({ CPFCad: CPF })
  }

  setTelefoneCad = (telefone) => {
    this.setState({ telefoneCad: telefone })
  }

  setPontosCad = (pontos) => {
    this.setState({ pontosCad: pontos })
  }

  setAgendamentosCad = (agendamentos) => {
    this.setState({ AgendamentosCad: agendamentos })
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

  compararDatas(a, b) {
    const dataA = new Date(a.data);
    const dataB = new Date(b.data);
    return dataA - dataB;
  }

  imprimeAgendamentos = (idFirebase) => {

    axios.get(`/agendamentos.json`)
      .catch(err => console.log(err))
      .then(res => {

      const posts = res.data
      const agendamentos = []
      let i = 0
              
      for (const postId in posts) {
        if (posts.hasOwnProperty(postId)) {
          const postData = posts[postId];

          if (postData.cliente === idFirebase) {
        
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

              const agendamentoFormatado = {'id' : postData.id, 'data' : dataFormatada, 'tipo' : tipoAgend}
              agendamentos.push(agendamentoFormatado)
            }
          }
        
        }
      }
      
      agendamentos.sort(this.compararDatas)

      agendamentos.forEach(agendamento => {
        const dataHora = new Date(agendamento.data)
        agendamento.data = this.retornaDataHoraFormatada(dataHora)
      });

      this.setAgendamentosCad(agendamentos)

      })
    }

  imprimeReg = (registro, idFirebase) => {
   
      this.setIDCad(registro.id)
      this.setNomeCad(registro.nome)
      this.setApelidoCad(registro.apelido)
      this.setCPFCad(registro.CPF)
      this.setTelefoneCad(registro.telefone)
      this.setPontosCad(registro.pontos)
      this.setIdFirebase(idFirebase)

      this.imprimeAgendamentos(idFirebase)
   
  }

  localizarRegistros = () => {
    
    axios.get('/clientes.json' )
      .catch(err => console.log(err))
      .then(res => {

      const posts = res.data
      const clientes = []
      let i = 0
              
      for (const postId in posts) {
        if (posts.hasOwnProperty(postId)) {
          const postData = posts[postId];
          clientes[i] = postData
          clientes[i].idFirebase = postId
          i++
        }
      }
              
      const clientesFiltrados = clientes.sort((a, b) => a.nome.localeCompare(b.nome));
      this.setState({ clientes: clientes, clientesFiltrados: clientesFiltrados })

    })

  }

  localizarRegistrosEsp = (idFirebase) => {

    this.resetState()

    if (!idFirebase) {
      return
    }

    axios.get(`/clientes/${idFirebase}.json`)
      .catch(err => console.log(err))
      .then(res => {

      const registro = res.data

      this.imprimeReg(registro,idFirebase)
      this.setState({ isDadosCliVisible: true, isAgendVisible: true })

      })

  }

  adicionaPonto = () => {
    
    if (this.state.idFirebase) {

        let pontos = 0

        if (this.state.pontosCad=='') {
          pontos = 1
        } else {
          pontos = this.state.pontosCad + 1
        }

        const newCliente = {
          id: this.state.IDCad,
          nome: this.state.nomeCad,
          apelido: this.state.apelidoCad,
          CPF: this.state.CPFCad,
          telefone: this.state.telefoneCad,
          pontos: pontos,
        }

        // Usando o método PATCH para atualizar parcialmente o registro
        axios.patch(`/clientes/${this.state.idFirebase}.json`, newCliente)
          .then(res => {
            console.log('Sucesso')
            this.setPontosCad(pontos)
          })
          .catch(err => {
            console.error("Erro ao atualizar registro:", err);
          });
    }
    else
      console.log('Cliente não selecionado')
  }

  subtraiPonto = () => {
    
    if (this.state.idFirebase) {

        let pontos = 0

        if (this.state.pontosCad=='') {
          pontos = 0
        } else {
          pontos = this.state.pontosCad - 1
        }

        const newCliente = {
          id: this.state.IDCad,
          nome: this.state.nomeCad,
          apelido: this.state.apelidoCad,
          CPF: this.state.CPFCad,
          telefone: this.state.telefoneCad,
          pontos: pontos,
        }

        // Usando o método PATCH para atualizar parcialmente o registro
        axios.patch(`/clientes/${this.state.idFirebase}.json`, newCliente)
          .then(res => {
            console.log('Sucesso')
            this.setPontosCad(pontos)
          })
          .catch(err => {
            console.error("Erro ao atualizar registro:", err);
          });
    }
    else
      console.log('Cliente não selecionado')
  }
  
  resetaPonto = () => {

    if (this.state.IDCad > 0) {
      Alert.alert(
        'Confirmação',
        'Deseja realmente zerar os pontos do cliente consultado?',
        [
          {
            text: 'Sim',
            onPress: () => {
              const pontos = 0
              
              const newCliente = {
                id: this.state.IDCad,
                nome: this.state.nomeCad,
                apelido: this.state.apelidoCad,
                CPF: this.state.CPFCad,
                telefone: this.state.telefoneCad,
                pontos: pontos,
              }

              // Usando o método PATCH para atualizar parcialmente o registro
              axios.patch(`/clientes/${this.state.idFirebase}.json`, newCliente)
              .then(res => {
                console.log('Sucesso')
                this.setPontosCad(pontos)
              })
              .catch(err => {
                console.error("Erro ao atualizar registro:", err);
              });

            }
          },
          { text: 'Não', onPress: () => console.log('A operação foi cancelada') },
        ]
      )
    }
  }

  transfNum = () => {
    const pontos = this.state.pontosCad
    let pontosArray = ['']

    for (let i=1; i<=pontos; i++) {
      pontosArray.push(`${i}`)
    }

    return pontosArray.map(num => {
        return <MegaNumero key={num} num={num} />
    })
}

  buscarClientes = async () => {
    this.localizarRegistros()
  };

  // Função para abrir o modal e buscar clientes ao clicar no input
  abrirModal = () => {
    this.setState({ modalVisible: true });
    this.buscarClientes();
  };

  // Função para fechar o modal
  fecharModal = () => {
    this.setState({ modalVisible: false }); 
  };

  getActions = (user) => {
    return (

      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: 'transparent'}}>

        <View style={{ marginLeft: 5 }}>
          <Button
            type='clear'
            onPress={() => this.props.navigation.navigate('LocCadastro', { user: user, view: 'Consulta' } )} 
            icon={<IconIo name="pencil" size={25} color="#AAA" />}
          />
        </View>

      </View>

    );
  }

   // Renderiza cada item da lista de clientes
   renderItem = ({ item }) => {
    return (

      <TouchableOpacity onPress={() => this.selecionarCliente(item)}>
        <View style={{ flexDirection: 'row',  paddingTop: 10, justifyContent: 'space-between' }}>

          <View style={{flexDirection: 'row'}}>
            <Icon name="user" size={30} color="black" style={{ paddingRight: 5 }} />
            <View>
              <Text style={{fontSize: 17, color: 'black', paddingLeft: 5, paddingTop: 5}}>{item.nome}</Text>
              <Text style={{fontSize: 13, color: 'black', paddingLeft: 5, paddingBottom: 5}}>{item.CPF}</Text>
            </View>
          </View>
          {this.getActions(item)}
        </View>
        <View style={{borderWidth: 0.2, borderColor: '#CCC'}} />
      </TouchableOpacity>

    );
  };

   // Função para selecionar um cliente e atualizar o input
   selecionarCliente = cliente => {
    this.setState({ nomeInput: cliente.nome, modalVisible: false });
    this.localizarRegistrosEsp(cliente.idFirebase)
    // Você pode fazer outras ações aqui, como enviar o cliente selecionado para outro componente, etc.
  };

  componentDidMount() {

    try {
      if (this.props.route.params.clinome) {
        this.localizarRegistrosEsp(this.props.route.params.clinome)
      }
      if (this.props.route.params.cliID) {
        this.localizarRegistrosEsp(this.props.route.params.cliID)
      }
    } catch(e) {

    }
  }

  render() {

    return (

      <SafeAreaView style={styleApp.App}>

        <ScrollView >

        <View style={{flexDirection: 'row'}}> 

          <Image style={{width: '100%', height: 150, marginBottom: 0}} 
          source={require('../../images/fundobranco.jpeg')} />

          <TouchableOpacity
            style={{position: 'absolute', right: 10, top: 10}}
            activeOpacity={0.7}
            onPress={() => this.componentDidMount()}>
            <IconIo name="reload" size={27} color='black' />
          </TouchableOpacity>  

        </View>  

        <View style={styleApp.AppCenter} >

        <View style={Estilo.CXPesquisa} >

            <TouchableOpacity 
              onPress={() => this.abrirModal()} >
              <Icon name="search" size={25} color="black" style={{padding: 5}}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.abrirModal}>
              <TextInput style={Estilo.InputText}
                placeholder="Localizar Clientes Cadastrados"
                value={this.state.nomeInput}
                onChangeText={this.setNome}
                onFocus={this.abrirModal} // Abre o modal ao clicar no input
              />
            </TouchableOpacity>

        {/* Modal para exibir a lista de clientes */}
        <Modal
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={this.fecharModal}
        >      

        <TouchableWithoutFeedback 
          onPress={this.fecharModal}>
        <View style={{alignItems: 'center'}}> 
          <Image style={{width: '100%', height: 150, marginBottom: 10}} 
          source={require('../../images/fundobranco.jpeg')} />
        </View>
        </TouchableWithoutFeedback>
        
        <View style={{flex: 1}}>

        <View style={styleApp.AppCenterModal} >


        <View style={Estilo.CXPesquisa} >
      
        <TouchableOpacity 
              onPress={() => this.abrirModal} >
              <Icon name="search" size={25} color="black" style={{padding: 5}}/>
            </TouchableOpacity>

          <TextInput style={[Estilo.InputText]}
                placeholder="Localizar Clientes Cadastrados"
                value={this.state.nomeInput} 
                onChangeText={this.setNome}
                autoFocus={true}
                onPress={() => this.abrirModal()}
              />

          </View>
        </View>

        
        <View style={styleApp.CenterModal} >

          <View style={styleApp.modalContainer}>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}> 
            <TouchableOpacity onPress={this.fecharModal} >
                <Text style={{color:'red', fontWeight: 'bold'}}>Fechar (X)</Text>
            </TouchableOpacity>

            <TouchableOpacity  onPress={() => this.props.navigation.navigate('LocCadastro', { user: {nome: ''}, view: 'Consulta'})} >
                <Text style={{color:'green', fontWeight: 'bold'}}>Adicionar (+)</Text>
            </TouchableOpacity>
          </View>

            <FlatList
              data={this.state.clientesFiltrados}
              renderItem={this.renderItem}
              keyExtractor={(user) => user.id.toString()}
              keyboardShouldPersistTaps="always" // Mantém o teclado ativo enquanto o modal estiver aberto
              contentContainerStyle={{ paddingBottom: 50 }}
            />

          </View>
        </View>
      

        </View>        
        
        </Modal>

        </View>

        <View style={Estilo.DadosUser}> 

          <View> 
             <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center', marginRight: 5}}> 
                <Text style={Estilo.TextFid}> Dados do Cliente </Text>
                <TouchableOpacity onPress={this.setisDadosCliVisible} >
                      <Icon name={this.state.isDadosCliVisible ? 'chevron-up' : 'chevron-down'} size={15} color="black"/>
                </TouchableOpacity>
              </View>
             <View style={Estilo.LinhaFid} /> 
          </View>

        
          <TouchableOpacity onPress={() => this.props.navigation.navigate('LocCadastro', { user: {nome: this.state.nomeCad, id: this.state.IDCad, apelido: this.state.apelidoCad, CPF: this.state.CPFCad, pontos: this.state.pontosCad, telefone: this.state.telefoneCad, idFirebase: this.state.idFirebase}, view: 'Consulta'})}>
          {this.state.isDadosCliVisible && (
          <View style={{paddingLeft: 5}}> 

          
          <Text style={Estilo.DadosUserText}>
             <Text style={Estilo.DadosUserFont}>Nome: </Text> 
             <Text style={Estilo.DadosUserFontState}>{this.state.nomeCad}</Text>
          </Text>

          <Text style={Estilo.DadosUserText}>
             <Text style={Estilo.DadosUserFont}>Apelido: </Text> 
             <Text style={Estilo.DadosUserFontState}>{this.state.apelidoCad}</Text>
          </Text>

          <Text style={Estilo.DadosUserText}>
             <Text style={Estilo.DadosUserFont}>CPF: </Text> 
             <Text style={Estilo.DadosUserFontState}>{this.state.CPFCad}</Text>
          </Text>


          <View style={{marginTop: 20,alignItems: 'center',justifyContent: 'center'}} >
            <View style={Estilo.LinhaFid2} /> 

                <View style={{marginBottom: 10, alignItems: 'center', justifyContent: 'center'}}>

                  <Text style={Estilo.DadosUserFont}> Fidelidade </Text> 
                  
                  <View style={Estilo.CxPontos} >
                      {this.transfNum()}
                    </View>
                  
                
                </View>

            </View>

          </View>

          )}
          </TouchableOpacity>

        </View>
       

        <View style={Estilo.BotaoEvent}>

          <TouchableOpacity
              style={Estilo.IncFid} 
              onPress={this.adicionaPonto} >
              <Icon name="plus" size={20} color="white"/>
          </TouchableOpacity>

          <TouchableOpacity
              style={Estilo.DecFid} 
              onPress={this.subtraiPonto} >
              <Icon name="minus" size={20} color="white"/>
          </TouchableOpacity>

          <TouchableOpacity
              style={Estilo.ACFid}
              onPress={this.resetaPonto} >
              <Text style={Estilo.ACFidText}> AC </Text>
          </TouchableOpacity>

        </View>

        
            <View style={Estilo.DadosUser}> 

                <View> 
                    <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center', marginRight: 5}}> 
                      <Text style={Estilo.TextFid}> Próximos Agendamentos </Text>
                      <TouchableOpacity onPress={this.setisAgendVisible} >
                            <Icon name={this.state.isAgendVisible ? 'chevron-up' : 'chevron-down'} size={15} color="black"/>
                      </TouchableOpacity>
                    </View>
                  <View style={Estilo.LinhaFid} /> 
                </View>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('CadAgend', { nomeCad: this.state.nomeCad, idFirebase: this.state.idFirebase})}>
                {this.state.isAgendVisible && (

                <View style={{flexDirection: 'row', marginTop: 10}}> 

                  <View >
                  {this.state.AgendamentosCad.map(agendamento => (
                    <View key={agendamento.id} style={{flexDirection: 'row'}}>
                      <Text style={Estilo.DadosUserFontStateAgend}>{agendamento.data}</Text>
                      <Text style={Estilo.DadosUserFontStateAgend}>{agendamento.tipo}</Text>
                    </View>
                  ))}
                </View>

                </View>

                )}
                </TouchableOpacity>

              </View>
          

        <View style={Estilo.BotaoEvent2}>

          <TouchableOpacity
            style={Estilo.IncFid2} 
            onPress={() => this.props.navigation.navigate('CadAgend', { nomeCad: this.state.nomeCad, idFirebase: this.state.idFirebase})}>
            <Text style={Estilo.IncFidText2}> AGENDAR </Text>
          </TouchableOpacity>
        
        </View>

          </View>

        </ScrollView>        

      </SafeAreaView>

  )
}}

const styleApp = StyleSheet.create({

  App: {
    flex: 1,
    backgroundColor: '#27282D',
  },

  AppCenter: {
    flexGrow: 1,
    padding: 10,
    textAlign: "center",
    backgroundColor: '#27282D',
  },

  AppCenterModal: {
    padding: 10,
    textAlign: "center",
    flex: 1
  },

  CenterModal: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  Calendar: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },

  AddPonto: {
    paddingRight: 10
  },

  modalContainer: {
    backgroundColor: 'white',
    width: '100%',
    padding: 10,
    marginTop: 50,
  },

  closeButton: {
    marginTop: 20
  },

  background: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)'
  },

})