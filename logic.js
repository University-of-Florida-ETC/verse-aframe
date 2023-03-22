/*const videoPathMap = {
  "scene1-0": { 
    "id": "#scene1-0",
    "option1": "Say nothing",
    "option2": "Respond",
    "option1Next": "scene1-a", 
    "option2Next": "scene1-b",
  },
}*/

const videoPathMap = {
  "scene1": {
    id: "#scene1",
    option1Next: "scene3a",
  },
  "scene3a": {
    id: "#scene3a",
    option1: "Say nothing",
    option2: "Greet the hostess",
    option1Next: "scene3b",
    option2Next: "scene3c",
  },
  "scene3b": {
    id: "#scene3b",
    option1Next: "scene3a",
  },
  "scene3c": {
    id: "#scene3c",
    option1Next: "scene4"
  },
  "scene4": {
    id: "#scene4",
    option1Next: "scene5"
  },
  "scene5": {
    id: "#scene5",
    option1: "Wait patiently",
    option2: "Shout for waitress",
    option1Next: "scene6a",
    option2Next: "scene6c",
  },
  "scene6a": { //Waitress introduces self
    id:"#scene6a",
    option1Next: "scene6b"

  },
  "scene6b": {
    id:"#scene6b",
    option1Next: "scene8",
  },
  "scene6c": {
    id:"#scene6c",
    option1Next: "scene6d"//No menus
    },
  "scene6d": {
    id:"#scene6d",
    option1Next: "scene5"
  },
  "scene8": {
    id: "#scene8",
    option1Next: "scene9ambient"
  },
  "scene9ambient": {//Scene11 needs to be reworked, comes before 10-1
    id: "#scene9ambient",
    option1: "Do nothing, it's fine",
    option2: "Ask waitress to turn the volume down", // Need approaches table and waits scene 
    option1Next: "scene10-1",
    option2Next: "scene9b",
  },
  "scene9b": {//Scene 11 needs to be reworked, comes before 10-1
    id: "#scene9b",
    option1Next: "scene10-1"
  },
  "scene10-1": { //Need to the 10_placing_order still 
    id: "#scene10-1",
    option1: "Pizza and Salad",
    option1: "Pizza and Salad",
    option1Next: "scene10-2",
    option2Next: "scene10-2"
  },
  "scene10-2": {
    id: "#scene10-2",
    option1Next: "scene12"
  },
  "scene11": {
    id: "#scene11",
    option1: "Yes",
    option2: "No"
  }, 
  "scene12": {
    id: "#scene12",
    option1Next: "scene13"
  },
  "scene13": {
    id: "#scene13",
    option1: "Do nothing, it's fine.",
    option2: "Cover ears with hands",
    option1Next: "scene14",
    option2next: "scene14",
  },
  "scene14": {
    id:"#scene14",
    option1Next: "scene15",
  },
  "scene15": {
    id:"#scene15",
    option1: "Wait patiently.",
    option2: "Shout for food.",
    option3: "Raise hand",
    option1Next: "scene16c",
    option2Next: "scene16b",
    option3Next: "scene16c"
  },
  
  "scene16b": {
    id:"#scene16b",
    option1Next: "scene16c",
  },
  "scene16c": {
    id:"#scene16c",
    option1Next: "scene17a"
  },

  "scene17a": { //No other option
    id: "#scene17a",
    option1: "Pizza n fries is okay.",
    option2: "Excuse me, I ordered a salad.",
    option1Next: "scene19a",
    option2Next: "scene18b",
  },
  "scene18b": {
    id:"#scene18b",
    option1Next: "scene19a"
  },
  "scene19a": {
    id:"#scene19a",
    option1Next: "scene19b",
  },
  "scene19b": { //Still is going to be added: 19D cleared table still
    id: "#scene19b",
    option1: "Leave tip",
    option2: "Don't leave tip",
    option1Next: "scene19c",
  }
}

//Move all of our elements to global variables

function beginExperience() {
  let myVideo = document.getElementById("scene1");
  document.getElementById("videoSphere").setAttribute("loop", true);
  document.getElementById("startButton").setAttribute("visible", "false");
  document.getElementById("playPlane").removeAttribute("data-clickable");
  document.getElementById("enterButton").setAttribute("visible", "true");
  document.getElementById("enterPlane").setAttribute("data-clickable");
  myVideo.play();
}
/**
* @param {string} choiceID - the ID
*/
function handleChoice(choiceID) {
  console.log("This is your choice " + choiceID);
  let videoSphere = document.getElementById("videoSphere");
  //set current option buttons to invisible
  let option1 = document.getElementById("option1");
  let option2 = document.getElementById("option2");
  let option1Plane = document.getElementById("option1Plane");
  let option2Plane = document.getElementById("option2Plane");
  option1Plane.removeAttribute("data-clickable");
  option2Plane.removeAttribute("data-clickable");
  option1.setAttribute("visible", "false");
  option2.setAttribute("visible", "false");
  //get the current scene and remove the id tag. 
  let currentScene = videoSphere.getAttribute("src").substring(1);
  let option1Next = videoPathMap[currentScene]["option1Next"];
  let option2Next = videoPathMap[currentScene]["option2Next"];

  if (choiceID == "option1") {
    console.log(videoPathMap[currentScene]);
    let nextScene = videoPathMap[currentScene]["option1Next"];
    console.log("Moving to next scene: " + nextScene);
    console.log(videoPathMap[nextScene]);
    let nextID = videoPathMap[nextScene]["id"];
    let nextVideo = document.querySelector(nextID)
    videoSphere.setAttribute("src", nextID);
    document.querySelector("#"+currentScene).pause();

    nextVideo.addEventListener("ended", function() {
      console.log("Video ended");
      if (videoPathMap[nextScene].hasOwnProperty("option1")) {
        console.log("This scene has options");
        populateButtons(nextScene);
      }
      else {
        console.log("This scene has no options");
        handleChoice("option1");
        //nextScene = videPathMap[nextScene]["option1Next"];
        //nextID = videoPathMap[nextScene]["id"];
        //videoSphere.setAttribute("src", nextID);
      }
    });
    nextVideo.play();
  } 
  else {
    console.log("entering option2 block")
    console.log(videoPathMap[currentScene]);
    let nextScene = videoPathMap[currentScene]["option2Next"];
    console.log("Moving to next scene: " + nextScene);
    console.log(videoPathMap[nextScene]);
    let nextID = videoPathMap[nextScene]["id"];
    let nextVideo = document.querySelector(nextID);
    videoSphere.setAttribute("src", nextID);
    document.querySelector("#"+currentScene).pause();
    nextVideo.addEventListener("ended", function() {
      console.log("Video ended");
      if (videoPathMap[nextScene].hasOwnProperty("option1")) {
        console.log("This scene has options");
        populateButtons(nextScene);
      }
      else {
        console.log("This scene has no options");
        handleChoice("option1");
      }
    });
    document.querySelector(nextID).play();
  }
}

function populateButtons(scene) {
  let videoSphere = document.getElementById("videoSphere");
  //get the current scene and remove the id tag. 
  let currentScene = videoSphere.getAttribute("src").substring(1);
  let option1Plane = document.getElementById("option1Plane");
  let option2Plane = document.getElementById("option2Plane");
  if(videoPathMap[currentScene].hasOwnProperty("option1")) {
    console.log("This scene has options");
  }
  else {
    console.log("This scene has no options");
    //play current video, then move to next scene
    videoSphere.setAttribute("src", videoPathMap[currentScene]["id"]);
    currentScene = videoPathMap[currentScene]["option1Next"];
    console.log(currentScene);
    handleChoice("option1");
  }
  let option1 = videoPathMap[currentScene].option1;
  let option2 = videoPathMap[currentScene].option2;
  let option1Next = videoPathMap[scene].option1Next;
  let option2Next = videoPathMap[scene].option2Next;
  let option1Button = document.getElementById("option1");
  let option2Button = document.getElementById("option2");
  option1Button.setAttribute("value", option1);
  option2Button.setAttribute("value", option2);
  option1Button.setAttribute("onclick", "handleChoice('option1')");
  option2Button.setAttribute("onclick", "handleChoice('option2')");
  option1Button.setAttribute("visible", "true");
  option2Button.setAttribute("visible", "true");
  option1Plane.setAttribute("data-clickable");
  option2Plane.setAttribute("data-clickable");
}

function enterRestaurant() {
  document.getElementById("scene1").pause();
  let videoSphere = document.getElementById("videoSphere");
  let option1 = document.getElementById("option1");
  let option1Plane = document.getElementById("option1Plane");
  let option2 = document.getElementById("option2");
  let option2Plane = document.getElementById("option2Plane");
  let myVideo = document.querySelector("#scene3a");
  let enterButton = document.getElementById("enterButton");
  videoSphere.setAttribute("src", "#scene3a");
  videoSphere.setAttribute("loop", false);
  enterButton.setAttribute("visible", "false");
  document.getElementById("enterPlane").removeAttribute("data-clickable");
  option1.setAttribute("visible", "true");
  option1Plane.setAttribute("data-clickable");
  option2.setAttribute("visible", "true");
  option2Plane.setAttribute("data-clickable");
  populateButtons("scene3a");
  myVideo.play();
}
