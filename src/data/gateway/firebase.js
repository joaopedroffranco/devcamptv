import firebase from 'firebase';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyABwF5HQp1P2Vi6IC0XSYalZuOM-wyXCAc",
    authDomain: "dextra-lights.firebaseapp.com",
    databaseURL: "https://dextra-lights.firebaseio.com",
    projectId: "dextra-lights",
    storageBucket: "dextra-lights.appspot.com",
    messagingSenderId: "998442383851"
};

console.log(firebase);
firebase.initializeApp(config);
const database = firebase.database();

class Firebase {
    static devices() {
        return database.ref('sections/');
    }

    static device(name) {
        return database.ref(`sections/${name}/`);
    }

    static deviceOn(name) {
        return database.ref(`sections/${name}/on`);
    }
}

export default Firebase;