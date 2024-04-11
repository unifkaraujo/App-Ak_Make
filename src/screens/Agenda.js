import React, {Component} from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native'

import IconIo from 'react-native-vector-icons/Ionicons'

import { ListItem } from '@rneui/themed'

import DateTimePicker from '@react-native-community/datetimepicker'

import moment from 'moment'
import 'moment/locale/pt-br'

import AgendaLista from '../components/AgendaLista'

export default class App extends Component {

  retornaData = (addData) => {
        data = moment().add(addData, 'days').format('YYYY-MM-DD')
        return data
    } 

    retornaDataFormatada = (addData) => {
      data = moment().add(addData, 'days')
      let diaSemana = data.format('dddd')
      diaSemana = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1)

      return {
        data: data.format('DD/MM/YYYY'),
        diaSemana: diaSemana
      };
    } 

  diferencaDias = (data) => {
    // Data fornecida
    var dataFornecida = new Date(data);

    // Data de hoje
    var hoje = new Date();

    // Ajusta as horas da data de hoje para meia-noite
    hoje.setHours(0, 0, 0, 0);

    // Ajusta as horas da data fornecida para meia-noite
    dataFornecida.setHours(0, 0, 0, 0);

    // Calcula a diferença em milissegundos
    var diferencaEmMilissegundos = dataFornecida.getTime() - hoje.getTime();

    // Converte a diferença em dias
    var diferencaEmDias = Math.ceil(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));

    return diferencaEmDias
  }

  state = {
    showDatePicker: false,
    selectedDate: new Date(),
    exibeDataEsp: false,
    data: [
      { id: 0, title: 'Hoje ('+this.retornaDataFormatada(0).diaSemana+' - '+this.retornaDataFormatada(0).data+')', dateIni: this.retornaData(0), dateFim: this.retornaData(0) },
      { id: 1, title: 'Amanhã ('+this.retornaDataFormatada(1).diaSemana+' - '+this.retornaDataFormatada(1).data+')', dateIni: this.retornaData(1), dateFim: this.retornaData(1) },
      { id: 2, title: this.retornaDataFormatada(2).diaSemana+' ('+this.retornaDataFormatada(2).data+')', dateIni: this.retornaData(2), dateFim: this.retornaData(2)},
      { id: 3, title: this.retornaDataFormatada(3).diaSemana+' ('+this.retornaDataFormatada(3).data+')', dateIni: this.retornaData(3), dateFim: this.retornaData(3) },
      { id: 4, title: this.retornaDataFormatada(4).diaSemana+' ('+this.retornaDataFormatada(4).data+')', dateIni: this.retornaData(4), dateFim: this.retornaData(4)},
      { id: 5, title: 'A partir de ('+this.retornaDataFormatada(5).data+')', dateIni: this.retornaData(5), dateFim: this.retornaData(99999) },
    ],
    dataEsp: [
      { id: 6, title: this.retornaDataFormatada().diaSemana+' ('+this.retornaDataFormatada().data+')', dateIni: this.retornaData(), dateFim: this.retornaData()},
    ]
  }

  showDatePicker = () => {
    this.setState({ showDatePicker: true });
 }

  handleDateChange = (event, selectedDate) => {
      if (event.type === 'set') {
        // O usuário selecionou uma data, faça algo com ela
        const dias = this.diferencaDias(selectedDate)
        this.setState({ dataEsp: [
          { id: 6, title: this.retornaDataFormatada(dias).diaSemana+' ('+this.retornaDataFormatada(dias).data+')', dateIni: this.retornaData(dias), dateFim: this.retornaData(dias)},
        ] })
        this.setState({ exibeDataEsp: false });
        this.setState({ selectedDate, showDatePicker: false, exibeDataEsp: true });
      } else {
        // O usuário cancelou a seleção, feche o calendário
        this.setState({ showDatePicker: false, exibeDataEsp: false });
      }
    };

  renderItem = ({ item }) => (
    <View>
      <View style={{flexDirection: 'row'}}>
        <Text style={{ color: 'black' }}>{item.title}</Text>
      </View>
      <AgendaLista di={item.dateIni} df={item.dateFim} />
    </View>
  );

  getUserItem = ({ item }) => {

    return (

      <ListItem

        bottomDivider 
        containerStyle={{ backgroundColor: '#FFF5F8', borderBottomWidth: 1, }}>
          
          <View style={{flex: 1}}> 
              <View>
                <ListItem.Title style={{fontWeight: 'bold'}}>{item.title}</ListItem.Title>
              </View>
              <View >
                <AgendaLista di={item.dateIni} df={item.dateFim} />
              </View>
          </View>

        </ListItem>
        
  
    );
  }

render() {

  let data = this.state.data
  if (this.state.exibeDataEsp) { data = this.state.dataEsp}

    return (
      <SafeAreaView style={styleApp.App}>

        <View style={{flexDirection: 'row'}}> 

          <Image style={{width: '100%', height: 150, marginBottom: 0}} 
          source={require('../../images/fundobranco.jpeg')} />

          <TouchableOpacity
            style={{position: 'absolute', right: 10, top: 10}}
            activeOpacity={0.7}
            onPress={() => {
              if (this.state.exibeDataEsp) {
                this.setState({ exibeDataEsp: false })
              }
              else {
                this.setState({ exibeDataEsp: true })
              }
              }}>
            <IconIo name="reload" size={27} color='black' />
          </TouchableOpacity>  

        </View> 

        <View style={styleApp.AppCenter} >

          <FlatList
            data={data}
            renderItem={this.getUserItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 10 }}
          />
          
        </View>

        <TouchableOpacity style={styleApp.confButton}
            activeOpacity={0.7}
            onPress={this.showDatePicker} >
            <IconIo name="search" size={35} color='white' />
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

      </SafeAreaView>
    );
  }
}

const styleApp = StyleSheet.create({
  App: {
    flexGrow: 1,
    backgroundColor: '#27282D',
  },

  AppCenter: {
    textAlign: "center",
    backgroundColor: '#FFF5F8',
    flex: 1
  },

  Row: {
    flexDirection: 'row',
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