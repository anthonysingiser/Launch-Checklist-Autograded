// Write your helper functions here!

require('cross-fetch/polyfill');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    /*
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: </li>
                     <li>Diameter: </li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: </li>
                     <li>Number of Moons: </li>
                 </ol>
                 <img src="">
    */
    document.getElementById("missionTarget").innerHTML = 
    `
    <h2>Mission Destination</h2>
    <ol>
        <li>Name: ${name}</li>
        <li>Diameter: ${diameter}</li>
        <li>Star: ${star}</li>
        <li>Distance from Earth: ${distance}</li>
        <li>Number of Moons: ${moons}</li>
    </ol>
    <img src="${imageUrl}">
    `
}

function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    }
    else if (isNaN(testInput)) {
        return "Not a Number";
    } else {
        return "Is a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
    if (pilot === "" || copilot === "" || fuelLevel === "" || cargoMass === "") {
        alert("All fields are required!");
        return false;
    }
    if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number") {
        alert("Pilot and Co-pilot names should be strings!");
        return false;
    }

    if (validateInput(fuelLevel) !== "Is a Number" || validateInput(cargoMass) !== "Is a Number") {
        alert("Fuel level and Cargo mass should be numbers!");
        return false;
    }

    let launchStatus = document.getElementById("launchStatus");
    let faultyItems = list;
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");

    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;

    let isReadyForLaunch = true;

    if (fuelLevel < 10000) {
        faultyItems.style.visibility = "visible";
        fuelStatus.innerHTML = "Fuel level too low for launch";
        launchStatus.style.color = "red";
        isReadyForLaunch = false;
    } else {
        fuelStatus.innerHTML = "Fuel level high enough for launch";
    }

    if (cargoMass > 10000) {
        faultyItems.style.visibility = "visible";
        cargoStatus.innerHTML = "Cargo mass too heavy for launch";
        launchStatus.style.color = "red";
        isReadyForLaunch = false;
    } else {
        cargoStatus.innerHTML = "Cargo mass low enough for launch";
    }

    if (isReadyForLaunch) {
        faultyItems.style.visibility = "visible";
        launchStatus.innerHTML = "Shuttle is Ready for Launch";
        launchStatus.style.color = "green";
    } else {
        launchStatus.innerHTML = "Shuttle Not Ready for Launch";
    }

    return true;
}

async function myFetch() {
    let planetsReturned;
    planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json')
        .then(response => response.json())
        .then(data => planetsReturned = data)

    return planetsReturned;
}

function pickPlanet(planets) {
    let randomPlanet = planets[Math.floor(Math.random() * planets.length)];
    return randomPlanet;
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;