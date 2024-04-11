/* Registrando o default do axios, facilita para não preencher a URL em todas as requisições */
import axios from 'axios'
axios.defaults.baseURL = 'https://newfidelidade-default-rtdb.firebaseio.com/'

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
