
//Clock for HTML Page

function goClock() {

        var clock = moment().format("h:mm:ss a");
        
        var seeClock = $("<h2>");
        var clockDisplay = seeClock.append(clock);
        $("#clockDisplay").html(clockDisplay);
        $("<td>").val("");
        
        };
        
        goClock();
        setInterval(goClock, 1000);
       
    
    
      // Initialize Firebase
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
        
            // Button for adding new trains
        $("#newTrainBtn").click(function(event){
            //If an event goes unhandled, its default action should not be taken as it normally would be
          event.preventDefault();
            // Grabs user input and stores them into variables
          var newTrain = $("#trainName").val().trim();
          var newDestination = $("#destination").val().trim();
          var newFirstTrain = $("#firstTrain").val().trim();
          var newFrequency = $("#frequency").val().trim();
        
          // Creates local "temporary" object for holding employee data
        
          trainObject = {
            train: newTrain,
            destination: newDestination,
            firstTrain: newFirstTrain,
            frequency: newFrequency
          };
            // Uploads employee data to the database, this will "trigger" the "child_added" event
            database.ref().push(trainObject);
        
              // Logs everything to console
              console.log(trainObject.train);
              console.log(trainObject.destination);
              console.log(trainObject.firstTrain);
              console.log(trainObject.frequency);
        
            //   alert("Train successfully added!");
        
              // clears the input boxes
              $("#trainName").val("");
              $("#destination").val("");
              $("#firstTrain").val("");
              $("#frequency").val("");
        
        });
        
        // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
        // "child_added" is a firebase event, such as "child-removed", "child_changed", and "child_moved"
        
        database.ref().on("child_added", function(childSnapshot, prevChildKey) {
        
           console.log(childSnapshot.val());
        
             // Store everything into a variable.
              var newTrain = childSnapshot.val().train;
              var newDestination = childSnapshot.val().destination;
              var newFirstTrain = childSnapshot.val().firstTrain;
              var newFrequency = childSnapshot.val().frequency;
        
               // Train Info
                console.log(newTrain);
                console.log(newDestination);
                console.log("FIRST TRAIN DEPARTED AT: " + newFirstTrain);
                console.log("THE TRAIN ARRIVES EVERY " + newFrequency + " MINUTES");
          
        
                // Prettify the first train time 
                // var firstTrainPretty = moment.unix(newFirstTrain).format("HH:mm");
                // console.log("THIS SHOULD BE THE FIRST TRAIN TIME FORMAT IN hh:mm: " + firstTrainPretty)
         
                var firstTrainTime = moment(newFirstTrain, "hh:mm").subtract(1, "days");
                console.log(firstTrainTime);;
              
        
                var diffTime = moment().diff(moment(firstTrainTime), "minutes");
                console.log("DIFFERENCE IN TIME: " + diffTime);
        
                var timeApart = diffTime % newFrequency;
                console.log("MINUTES TO SUBTRACT FROM FREQUENCY: " + timeApart);
        
                var minutesAway = newFrequency - timeApart;
                console.log("MINUTES UNTIL TRAIN: " + minutesAway);
        
                var nextTrain = moment().add(minutesAway, "minutes");
                var nextTrain2 = moment(nextTrain).format("hh:mm");
        
                console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
        
                // Add each train's data into the table
                $("#train-table > tbody").append("<tr><td>" + newTrain + "</td> <td>" + newDestination + "</td> <td>" +
                newFrequency + "</td><td>" + nextTrain2 + "</td><td>" + minutesAway + "</td></tr>");
        
        
        });
        
    