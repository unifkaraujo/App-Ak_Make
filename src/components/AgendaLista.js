import React, {Component} from 'react'
import { View, Text, FlatList} from 'react-native'

import axios from 'axios'

export default class App extends Component {

  state = {
    agendamentos: []
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

  imprimeAgendamentos = async(di, df) => {

    try {

      const response = await axios.get(`/agendamentos.json`);
      const posts = response.data;
      const agendamentos = [];
      let i = 0
              
      for (const postId in posts) {
        if (posts.hasOwnProperty(postId)) {
          const postData = posts[postId];

            const dataHoje = new Date()
            dataHoje.setHours(0, 0, 0, 0)

            // Transformo a data no timezone de são paulo, porém, após fazer isso 1 dia é subtraido da data
            // Para resolver, adiciono 1 dia manualmente
            // Sendo assim, esse código só vai funcionar na timezone do Brasil
            const dataDi = new Date(di)
            dataDi.setHours(0, 0, 0, 0)
            dataDi.setDate(dataDi.getDate() + 1);

            const dataDf = new Date(df)
            dataDf.setHours(0, 0, 0, 0)
            dataDf.setDate(dataDf.getDate() + 1);
          
            const dataHoraTemp = new Date(postData.data)
            dataHoraTemp.setHours(0, 0, 0, 0)
            
            if (dataHoraTemp >= dataDi && dataHoraTemp <= dataDf) {
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

      this.setState({ agendamentos })
      
    } catch (error) {
        console.error("Erro ao localizar próximos agendamentos:", error);
    }
  }

    componentDidMount() {
      this.imprimeAgendamentos(this.props.di, this.props.df)
    }

  renderItem = ({ item }) => {
    return (

        <View style={{ flexDirection: 'row',  paddingTop: 10, justifyContent: 'space-between'}}>
          <Text style={{color: '#b34f5a', fontWeight: 'bold'}}>{item.nome}</Text>
          <Text style={{color: '#b34f5a', fontWeight: 'bold'}}>{item.tipo}</Text>
          <Text style={{color: '#b34f5a', fontWeight: 'bold'}}>{item.data}</Text>
        </View>

    );
  };

  render() {

    return (
      <View >
        <FlatList
          data={this.state.agendamentos}
          renderItem={this.renderItem}
          keyExtractor={(user) => user.id.toString()}
        />
      </View>
    )
}}