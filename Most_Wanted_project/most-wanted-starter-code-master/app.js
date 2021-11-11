"use strict"

//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = searchByTrait(people);
  // TODO: search by traits
      break;
      default:
    app(people); // restart app
      break;
  }
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
      displayPerson(person);
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByTrait(people){
  let userInput = promptFor("Would you like to search by eye color, gender, or occupation?", autoValid).toLocaleLowerCase();
  let resultTrait = "";
  switch(userInput) {
    case "eye color":
      resultTrait = searchByEyeColor(people);
      displayPeople(foundPeople);
      break;
      
      case "gender":
      resultTrait = searchByGender(people)
      onePerson(resultTrait, people)
      break;
      case "occupation":
      resultTrait = searchByOccupation(people)
      onePerson(resultTrait, people)
      break;
      default:
      searchByTrait(people);
  }
}

// function onePerson(searchResults, people){
//   if (searchResults.length == 1){
//     mainMenu(searchResults, people)
//   } else{
//       alert("Your search includes more than one person, redirect to filter by traits");
//       searchByTrait(searchResults)
//   }
// }

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person single person object using the name they entered.
  return foundPerson;
}

// unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people){
  let eyeColor = promptFor("What is the person's eye color?", autoValid);
  let foundPeople = people.filter(function(potentialMatch){
    if(potentialMatch.eyeColor === eyeColor){
      return true;
    }
    else{
      return false;
    }
  })
  displayPeople(foundPeople);
  return foundPeople;
}

// //TODO: add other trait filter functions here.
function searchByGender(people){
  let gender = promptFor("What is the person's gender?", autoValid).toLowerCase();
  let foundPeople = people.filter(function(potentialMatch){
    if(potentialMatch.gender === gender){
      return true;
  }
    else{
      return false;
  }

})
displayPeople(foundPeople);
  return foundPeople;
  
}

function searchByOccupation(people){
  let occupation = promptFor("What is the person's occupation", autoValid);
  let foundPeople = people.filter(function(potentialMatch){
    if(potentialMatch.occupation === occupation){
      return true;
    }
    else{
      return false;
    }
  })
  displayPeople(foundPeople);
  return foundPeople;
  
}


//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let firstName = "First Name:" + person[0].firstName;
  let lastName = "Last Name:" + person[0].lastName;
  let gender = "Gender:" + person[0].gender;
  let dob = "Date of Birth:" + person[0].dob;
  let height = "Height:" + person[0].height;
  let weight = "Weight:" + person[0].weight;
  let eyeColor = "Eye Color:" + person[0].eyeColor;
  let occupation = "Occupation:" + person[0].occupation;

  
  alert(firstName+'/n'+lastName+'/n'+gender+'/n'+dob+'/n'+height+'/n'+weight+'/n'+eyeColor+'/n'+occupation+'/n');
    
}


// function displayFamily(family){
//   let familyInfo = "Parents: " + person.parents + "\n";
//     familyInfo += 

//   alert(personInfo);
//     return personInfo
// }


//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  
}

//#endregion



























