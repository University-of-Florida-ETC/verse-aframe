const videoPathMap = {
  "scene0": { //Parking lot
    "id": "#scene0",
    "next": "#scene1-0",
  },
  "scene1-0": { //welcome to the restaurant
    "id": "#scene1-0",
    "option1": "Say nothing",
    "option2": "Respond",
    "option1Next": "scene1-a", 
    "option2Next": "scene1-b",
  },
  "scene1-a": { //host sorry
    "id": "#scene1-a",
    "option1Next": "scene1-0",
  },
  "scene1-b": { //host follow me
    "id": "#scene1-b",
    "option1Next": "scene2",
  },
  "scene2-ambient": { //at the table ambient after host walks you out
    "id": "#scene2-ambient",
    "option1": "Wait for server",
    "option2": "Call loudly for server",
    "option1Next": "scene3",
    "option2Next": "scene4b"
  },
  "scene2": { //Waiter will be right with you
    "id": "#scene2",
    "option1Next": "scene2-ambient",
  },
  "scene3": { //Server comes to table, introduces self
    "id": "#scene3",
    "option1Next": "scene4a", //result: "Hi, I'll be your server today, brb with water and menu"
  },
  "scene4a": { // Server comes back with water and menu
    "id": "#scene4a",
    "option1": "Say thank you",
    "option2": "Say nothing",
    "option1Next": "scene6",
    "option2Next": "scene6"//result: here is your water and menu thx for waiting
  },
  "scene4b": { //Shut up 
    "id": "#scene4b",
    "option1Next": "scene2-ambient",
  },
  "scene6": { // ambient noise choice
    "id": "#scene2-ambient",
    "option1": "Thank you for trying.",
    "option2": "Experience is over",
    "option1Next": "scene0",
    "option2Next": "scene0"
  }
}



//Move all of our elements to global variables

function beginExperience() {
  let myVideo = document.getElementById("scene0");
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
  document.getElementById("scene0").pause();
  let videoSphere = document.getElementById("videoSphere");
  let option1 = document.getElementById("option1");
  let option1Plane = document.getElementById("option1Plane");
  let option2 = document.getElementById("option2");
  let option2Plane = document.getElementById("option2Plane");
  let myVideo = document.querySelector("#scene1-0");
  let enterButton = document.getElementById("enterButton");
  videoSphere.setAttribute("src", "#scene1-0");
  videoSphere.setAttribute("loop", false);
  enterButton.setAttribute("visible", "false");
  document.getElementById("enterPlane").removeAttribute("data-clickable");
  option1.setAttribute("visible", "true");
  option1Plane.setAttribute("data-clickable");
  option2.setAttribute("visible", "true");
  option2Plane.setAttribute("data-clickable");
  populateButtons("scene1-0");



  myVideo.play();

}


