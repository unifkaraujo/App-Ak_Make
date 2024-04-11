import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({

    FontePadrao: {
      fontSize: 32,
      textAlign: "center",
      color: "#000"
    },

    Input: {
        flexDirection: 'row',
        flexWrap: 'wrap', 
        justifyContent: "center", 
        textAlign: "center",
    },

    InputLocCadastroSearch: {
      flexDirection: 'row',
      flexWrap: 'wrap', 
      justifyContent: "center", 
      textAlign: "center",
  },

    InputLocCadastro: {
      flexDirection: 'row',
      flexWrap: 'wrap', 
      justifyContent: "center", 
      textAlign: "center",
  },

    InputText: {
      fontSize: 15,
    },

    InputHrData: {
      width: 35,
      height: 40,
      backgroundColor: 'white',
      borderRadius: 5,
      paddingLeft: 5,
      margin: 3,
      fontSize: 13,
      marginTop: 10
    },

    InputProcedimento: {
      width: '30%',
      height: 40,
      backgroundColor: 'white',
      borderRadius: 5,
      paddingLeft: 5,
      marginLeft: 15,
      fontSize: 13,
      marginTop: 10,
      textAlign: 'center'
    },

    InputTextLocCadastro: {
      width: '55%',
      height: 40,
      backgroundColor: 'white',
      borderRadius: 5,
      paddingLeft: 5,
      margin: 3,
      fontSize: 12,
      marginBottom: 15,
    },

    BotaoCad: {
      width: '79%',
      height: 40,
      backgroundColor: '#b34f5a',
      borderRadius: 20,
      justifyContent: 'center',
      marginTop: 20
    },

    BotaoCadLocCadastro: {
      width: '50%',
      height: 40,
      backgroundColor: '#b34f5a',
      borderRadius: 20,
      justifyContent: 'center',
      marginTop: 20
    },
    
    IconLocCadastro: {
      marginTop: 20,
      marginLeft: 10
    },

    BotaoLocCad: {
      width: '79%',
      height: 40,
      backgroundColor: '#b5888d',
      borderRadius: 20,
      justifyContent: 'center',
      marginTop: 20
    },

    BotaoResetar: {
      width: '70%',
      height: 40,
      backgroundColor: '#f2495f',
      borderRadius: 5,
      justifyContent: 'center',
    },

    BotaoCons: {
      width: '24%',
      height: 40,
      backgroundColor: '#b35f6d',
      borderRadius: 5,
      justifyContent: 'center',
      marginTop: 3,
    },

    BotaoRel1: {
      width: '70%',
      height: 40,
      backgroundColor: '#b35f6d',
      borderRadius: 5,
      justifyContent: 'center',
    },

    BotaoRel: {
      width: '70%',
      height: 40,
      backgroundColor: '#b5888d',
      borderRadius: 5,
      justifyContent: 'center',
      marginTop: 10
    },

    IconConsLocCadastro: {
      marginLeft: 10
    },

    IncFid: {
      width: 40,
      height: 35,
      backgroundColor: '#b34f5a',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },

    IncFid2: {
      width: 80,
      height: 35,
      backgroundColor: '#b34f5a',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },

    DecFid: {
      width: 40,
      height: 35,
      backgroundColor: '#b5888d',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
    },

    ACFid: {
      width: 40,
      height: 35,
      backgroundColor: '#b5888d',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 3,
    },

    ResInput: {
      marginTop: 10,
      marginLeft: 5,
      backgroundColor: '#b5888d',
      borderRadius: 5,
      width: '12%',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center'
    },

    ACFidText: {
      color: 'white', 
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 15
    },

    AgendarBotao: {
      width: '30%',
      height: 40,
      backgroundColor: '#b34f5a',
      borderRadius: 5,
      justifyContent: 'center',
      marginLeft: 5,
      marginTop: 10,
    },

    AgendarText: {
      color: 'white', 
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 15,
    },

    IncFidText: {
      color: 'white', 
      fontWeight: 'bold',
    },

    IncFidText2: {
      color: 'white', 
      textAlign: 'center',
      fontWeight: 'bold',
    },

    BotaoEvent: {
      flexDirection: 'row',
      flexWrap: 'wrap', 
      textAlign: "flex-end",
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },

    BotaoEvent2: {
      flexDirection: 'row',
      flexWrap: 'wrap', 
      textAlign: "flex-end",
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },

    TextBotaoCad: {
      color: 'white', 
      textAlign: 'center',
      fontWeight: 'bold'
    },

    InputCad: {
      width: '80%',
      height: 40,
      backgroundColor: 'white',
      borderRadius: 20,
      paddingLeft: 10,
      margin: 4
    },

    InputCadNome: {
      width: '80%',
      height: 40,
      backgroundColor: '#CCC',
      borderRadius: 5,
      paddingLeft: 10,
      margin: 4
    },

    InputCadDate: {
      flex: 1,
      height: 40,
      backgroundColor: '#CCC',
      borderRadius: 5,
      paddingLeft: 10,
      marginTop: 6,
      marginLeft: 4
    },

    InputCadhrmin: {
      height: 40,
      backgroundColor: 'white',
      borderRadius: 20,
      paddingLeft: 10,
      marginTop: 6,
      flex: 1
    },

    InputCadproc: {
      height: 40,
      backgroundColor: 'white',
      borderRadius: 20,
      paddingLeft: 10,
      marginTop: 6,
      marginLeft: 4,
      flex: 5
    },

    ViewAgCad: {
      width: '80%',
      flexDirection: 'row',
  },

    InputButton: {
        width: (Dimensions.get('window').width / 4)
    },

    CXPesquisa: {
      height: 40,
      borderRadius: 5,
      backgroundColor: 'white',
      flexDirection: 'row',
    },


    DadosUser: {
      justifyContent: "center", 
      textAlign: "center",
      marginTop: 15,
      borderWidth: 0.5,
      borderColor: '#b35f6d',
      borderRadius: 5,
      backgroundColor: 'white',
      shadowOffset: { width: 0, height: 2 }, // Sombreamento para iOS
      shadowOpacity: 0.2, // Sombreamento para iOS
      shadowRadius: 2, // Sombreamento para iOS
      elevation: 5, // para Android
      shadowColor: 'white',
    },
    

      DadosUserText: {
        marginTop: 10,
      },

      DadosUserFont: {
        fontSize: 15,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center'
      },

      DadosUserFontState: {
        fontSize: 15,
        marginTop: 10,
        color: "black",
      },

      DadosUserFontStateAgend: {
        fontSize: 14,
        color: "black",
        paddingHorizontal: 5,
        paddingBottom: 7,
        lineHeight: 25
      },

      TextFid: {
        fontSize: 15,
        padding: 5,
        fontWeight: 'bold',
      },

      LinhaFid: {
        borderBottomWidth: 0.2,
        borderColor: '#b35f6d',
      },

      LinhaFid2: {
        borderBottomWidth: 0.2,
        borderColor: '#b35f6d',
        width: '60%',
      },

     CxPontos: {
      flexDirection: 'row',
      flexWrap: 'wrap', /* Quebra linha caso corte a tela */
      justifyContent: "center",
      marginTop: 10,
      alignItems: 'center'
     },

     AgendInput: {
      flexDirection: 'row',
      flexWrap: 'wrap', /* Quebra linha caso corte a tela */
      justifyContent: "center", 
      marginTop: 25
     },

     AgendBotInput: {
      flexDirection: 'row',
      flexWrap: 'wrap', /* Quebra linha caso corte a tela */
      justifyContent: "center", 

     },

     AgendarInput: {
      marginTop: 10,
      marginLeft: 15,
      backgroundColor: '#b34f5a',
      borderRadius: 5,
      width: '25%',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center'
     },

     JoinRel: {
      flexWrap: 'wrap', /* Quebra linha caso corte a tela */
      justifyContent: "center", 
     },

})