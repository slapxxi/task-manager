import firebase from 'firebase/app';
import 'firebase/database';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebaseConfig from './firebaseConfig';
import './styles/index.css';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));
