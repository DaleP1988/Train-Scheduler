var config = {
    apiKey: "AIzaSyDM7x7JF3Z2UhkoOz57Ek8djLCUIqZPQvs",
    authDomain: "train-scheduler-69098.firebaseapp.com",
    databaseURL: "https://train-scheduler-69098.firebaseio.com",
    projectId: "train-scheduler-69098",
    storageBucket: "train-scheduler-69098.appspot.com",
    messagingSenderId: "740054688049"
  };
 firebase.initializeApp(config);



  var database = firebase.database();



  database.ref().set({
    chicken: "bbq"
})