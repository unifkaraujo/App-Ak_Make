import React, { Component } from 'react'
import { View, StyleSheet, SafeAreaView, TextInput, Image, TouchableOpacity, 
  FlatList, Alert } from 'react-native'
import { ListItem, Avatar, Button } from '@rneui/themed'

import Icon from 'react-native-vector-icons/Ionicons';

import axios from 'axios'

export default class App extends Component {

  state = {
    users: [],
    usersFiltrados: [],
    atualiza: 0,
    nomeInput: '',
    visibleInput: false
  }

  deletarRegistro = (user) => {

    if (user.id) {

      Alert.alert(
        'Confirmação',
        'Deseja realmente deletar o cliente selecionado?',
        [
          {
            text: 'Sim',
            onPress: () => {
            
              axios.delete(`/clientes/${user.idFirebase}.json`)
                .then(res => {
                  console.log("Registro excluído com sucesso")
                  Alert.alert ('Sucesso', 'Cliente deletado da base de dados!')
                  this.localizarRegistros();

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
            icon={<Icon name="trash-outline" size={25} color="#AAA" />}
          />
        </View>

      </View>

    );
  }

  getUserItem = ({ item: user }) => {
    return (

      <ListItem

       key={user.id} 
        bottomDivider 
        onPress={() => this.props.navigation.navigate('LocCadastro', { user: user, view: 'ListaCad' } )} 
        containerStyle={{ backgroundColor: '#FFF5F8' }}>
          <Avatar source={{uri: 'https://cdn.pixabay.com/photo/2014/04/03/10/32/businessman-310819_1280.png'}} />  
          
          <ListItem.Content>
              <ListItem.Title>{user.nome}</ListItem.Title>
              <ListItem.Subtitle>{user.CPF}</ListItem.Subtitle>
              
          </ListItem.Content>

          {this.getActions(user)}
  
          <ListItem.Chevron />

        </ListItem>
        
  
    );
  }

  setNome = (nomeInput) => {
    this.setState({ nomeInput })
    this.localizarRegistros()
  }

  setUsers = (users) => {
    this.setState({ users })
  }

  setUsersFiltrados = (usersFiltrados) => {
    this.setState({ usersFiltrados })
  }

  localizarRegistros = () => {
    
    axios.get('/clientes.json')
      .catch(err => console.log(err))
      .then(res => {
        
        const posts = res.data
        const users = []
        let i = 0
                
        for (const postId in posts) {
          if (posts.hasOwnProperty(postId)) {
            const postData = posts[postId];
            users[i] = postData
            users[i].idFirebase = postId
            i++
          }
        }
                
        let usersFiltrados = []
        this.setUsers(users) 
        usersFiltrados = users.filter(cliente => cliente.nome.toLowerCase().includes(this.state.nomeInput.toLowerCase()))

        this.setUsersFiltrados(usersFiltrados)

    })

  }

  componentDidMount() {
    this.localizarRegistros()
  }

  render() {

    return (

      <SafeAreaView style={styleApp.App}>
       
      <View style={{flexDirection: 'row'}}> 

          <Image style={{width: '100%', height: 150, marginBottom: 0}} 
          source={require('../../images/fundobranco.jpeg')} />

          <TouchableOpacity
            style={{position: 'absolute', right: 10, top: 10}}
            activeOpacity={0.7}
            onPress={() => this.componentDidMount()}>
            <Icon name="reload" size={27} color='black' />
          </TouchableOpacity>  

      </View>  

      <View style={styleApp.AppCenter} >
          
          <FlatList 
            keyExtractor={(user) => user.id.toString()}
            data={this.state.usersFiltrados}
            renderItem={this.getUserItem}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{ paddingBottom: 10 }}
          />

      </View>

      {this.state.visibleInput &&
      <TextInput style={[styleApp.InputText]}
        placeholder="Localizar Clientes Cadastrados"
        autoFocus={true}
        value={this.state.nomeInput}
        onChangeText={this.setNome}
        onBlur={() => this.setState({ visibleInput: false })}
        placeholderTextColor="white"
      /> 
      }

      <TouchableOpacity style={styleApp.SearchButton}
          activeOpacity={0.7}
          onPress={() => this.setState({ visibleInput: true })}>
          <Icon name="search" size={35} color='white' />
      </TouchableOpacity>

      <TouchableOpacity style={styleApp.addButton}
          activeOpacity={0.7}
          onPress={() => this.props.navigation.navigate('LocCadastro', {user: nome='', view: 'ListaCad'} )}>
          <Icon name="add" size={40} color='white' />
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
    textAlign: "center",
    backgroundColor: '#FFF5F8',
    height: '80%',
  },

  botaoAdd: {
    backgroundColor: 'white', 
    width: '10%', 
    alignItems: 'center', 
    justifyContent: 'center',
  },

  botaoAddContainer: {
    paddingLeft: 20,
    alignItems: 'flex-start',
  },

  addButton: {
    position: 'absolute',
    right: 45,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#b35f6d',
    justifyContent: 'center',
    alignItems: 'center',
    
  },

  SearchButton: {
    position: 'absolute',
    right: 45,
    bottom: 95,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#b35f6d',
    justifyContent: 'center',
    alignItems: 'center',
    
  },

  InputText: {
    position: 'absolute',
    bottom: 95,
    width: '100%',
    height: 50,
    backgroundColor: '#b35f6d',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: 15
  }

})