import firebase from 'firebase/app';
import 'firebase/auth';
import loginButton from '../components/buttons/loginButton';
import logoutButton from '../components/buttons/logoutButton';
import domBuilder from '../components/domBuilder';
import navBar from '../components/navBar';
import domEvents from '../events/domEvents';
import navigationEvents from '../events/navigationEvents';
import firebaseConfig from './apiKeys';

const checkLoginStatus = () => {
  // This line initializes your firebase app using the values from your .env file
  firebase.initializeApp(firebaseConfig);

  // This function is looking for anytime the Auth State Changes.
  // In this app, this happens on 2 occasions:
  // 1. When a user logs in, their auth state changes to logged in
  // 2. When a user logs out, their auth state changes to logged out
  // Inside of this function, we will determine what happens when a user logs in and what happens when they log out
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // person is logged in do something...
      domBuilder(); // BUILD THE DOM
      domEvents(); // ADD THE EVENT LISTENTERS TO THE DOM
      navBar(); // DYNAMICALLY ADD THE NAV
      logoutButton(); // ADD THE LOGOUT BUTTON COMPONENT
      navigationEvents(); // ATTACH THE EVENT LISTENERS TO THE NAVBAR
    } else {
      // person is NOT logged in do something...
      loginButton(); // CLEAR THE DOM AND SHOW THE LOGIN BUTTON
    }
  });
};

export default checkLoginStatus;
