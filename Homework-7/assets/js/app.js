
var config = {
    apiKey: "AIzaSyAjGhpPjjSj57D0-OKbh2hISrdBdBXA3Js",
    authDomain: "gtcbc-carrendale-91f93.firebaseapp.com",
    databaseURL: "https://gtcbc-carrendale-91f93.firebaseio.com",
    projectId: "gtcbc-carrendale-91f93",
    storageBucket: "gtcbc-carrendale-91f93.appspot.com",
    messagingSenderId: "893317523607"
};

firebase.initializeApp(config);

var name = "";
var destination = "";
var time = 0;
var frequency = 0;
var database = firebase.database();

// Capture Button Click
$("#add-train").on("click", function(event) {
    event.preventDefault();

    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    time = $("#time-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    database.ref().push({

        name: name,
        destination: destination,
        time: time,
        frequency: frequency
    });

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {

    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);

    // var trainName = childSnapshot.val().name;
    // var trainDestination = childSnapshot.val().destination;
    var firstTrainArrival = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().frequency;
    var currentTime = moment().format("HH:MM:SS");
    var firstTrainArrivalConverted = moment(firstTrainArrival).format("HH:MM:SS");
    var trainFreqConverted = moment().format(trainFreq, "m");
     console.log(trainFreqConverted);
    //
    var nextTrainArrival = moment().add(firstTrainArrivalConverted, trainFreqConverted);
    var minAway = nextTrainArrival.diff(currentTime, "minutes");
    //var minAway = moment().subtract(nextTrainArrival, currentTime).format("m");
    console.log(minAway);


    $("#updated-schedule").append("<tr><td id='name'> " + childSnapshot.val().name +
        " </td><td id='destination'> " + childSnapshot.val().destination +
        " </td><td id='time'> " + childSnapshot.val().time +
        " </td><td id='frequency'> " + childSnapshot.val().frequency +
        " </td><td>" + minAway + "</td></tr>");




}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
//---------------------------------------------------------------------------------

//Random Experimenting

/*var trainNames = getAllTrainNames();
  trainNames.forEach(function(trainName){
      var lastArrivalTime = getLastArrivalTime(trainName);
      if(lastArrivalTime < moment()) {
          //jquery to update next arrival column for that train (aka lastArrivalTime + frequency)
          lastArrivalTime = moment();
      } else {
          //do nothing because lastArrivalTime is still accurate
      }
      setLastArrivalTime(trainName, lastArrivalTime);
  });*/

// nextArrival = moment.unix(time).format("hh/mm/ss");



/*
next arrival-

var trainsInMemory = [
    {
        name: 'Marta',
        arrivalTime: '11:00'
    },
    {
        name: 'whatever',
        arrivalTime: '1130'
    }
];

function getLastArrivalTime(trainName) {
    var foundTrain = trainsInMemory.filter(function(savedTrain){
        return savedTrain.name = trainName;
    });
    return foundTrain.lastArrival;
}

function setLastArrivalTime(trainName, arrivalTime){
    var indx = null;
    var foundTrain = trainsInMemory.filter(function(savedTrain, index){
        if(savedTrain.name = trainName) {
            indx = index;
            return true;
        }
    });
    foundTrain.lastArrival = arrivalTime;
    trainsInMemory[indx] = foundTrain;
}

function getAllTrainNames (){
    //return array of train names
}
*/