// Designed by dtokita unless otherwise noted

// Global animation variables
var simulationAnimation;

// Global timing interval variables
var infectionInterval;
var deathInterval;
var recoveryInterval;
var graphInterval;
var simulationInterval;

// Function to initialize simulation that is passed the number of blocks and the socialDistancingFactor
// which determines the percentage of blocks that will move during the simulation
function initSimulation(numOfBlocks, socialDistancingFactor) {

    // Get the simulation space element
    let simulationContainer = document.getElementById('simulation-container');

    // Define an infected patient zero, assigning an id allows tracking and the class determines the styling
    let patientZero = document.createElement('div');
    patientZero.id = 0;
    patientZero.className = 'infected';

    // Assign the portion of moving individuals in the simulation based on the socialDistancingFactor
    if (Math.random() >= socialDistancingFactor) {
        patientZero.className += ' moving';
    }

    simulationContainer.appendChild(patientZero);

    // Create the remaining vulnerable blocks in the simulation with ids
    for (var i = 1; i <= numOfBlocks; i++) {
        let vulnerable = document.createElement('div');
        vulnerable.id = i;
        vulnerable.className = 'vulnerable';

        if (Math.random() >= socialDistancingFactor) {
            vulnerable.className += ' moving';
        }

        simulationContainer.appendChild(vulnerable);
    }

    // Get simulation space dimensions
    let simulationRect = getSimulationRect();

    // Randomly distribute the individuals in the simulation space
    var animation = anime.timeline({
        targets: '#simulation-container div',
        easing: 'linear',
        duration: 1000,
    }).add({
        left: function(el, i, l) {
            return anime.random(20, simulationRect['width'])
        },
        top: function (el, i, l) {
            return anime.random(20, simulationRect['height'])
        },
    });

    // Once the individuals have been distributed, animate those who should be moving in a random manner
    animation.finished.then(function() {
        simulationAnimation = anime({
            targets: '.moving',
            left: function(el, i, l) {
                return anime.random(20, simulationRect['width'])
            },
            top: function (el, i, l) {
                return anime.random(20, simulationRect['height'])
            },
            easing: 'linear',
            duration: 5000,
            loop: true,
            direction: 'alternate',
            delay: function() { return anime.random(0, 1000) }
        });
    })
}

// Helper function to get the dimensions of the simulation space
function getSimulationRect() {
    let simulationContainer = document.getElementById('simulation-container');
    let simulationContainerRect = simulationContainer.getBoundingClientRect();

    return simulationContainerRect;
}

// Function to determine if an infected individual infects a vulnerable individual
async function infectionCheck() {

    // Get infected individuals
    let infected = document.getElementsByClassName('infected');

    // Get vulnerable individuals
    let vulnerable = document.getElementsByClassName('vulnerable');

    // Get current transmission rate
    let transmissionRate = document.getElementById('transmission-rate').value / 100;

    // Iterate over the infected individuals
    for (var i = 0; i < infected.length; i++) {

        // Iteratively check if the vulnerable are within the radius of an infected individual
        for (var j = 0; j < vulnerable.length; j++) {

            if (isInRadius(
                [infected[i].style['left'].slice(0, -2), infected[i].style['top'].slice(0, -2)],
                [vulnerable[j].style['left'].slice(0, -2), vulnerable[j].style['top'].slice(0, -2)],
                document.getElementById('infection-radius').value
            )) {

                if(Math.random() < transmissionRate) {
                    // Infect the vulnerable individual
                    vulnerable[j].className = 'infected';
                }

            }

        }
    }

}

// Function to check if an infected individual will die on this tick
async function deathCheck() {

    // Get infected individuals
    let infected = document.getElementsByClassName('infected');

    // Get current death rate
    let deathRate = document.getElementById('death-rate').value / 100;

    // Iterate through the infected individuals
    for (var i = 0; i < infected.length; i++) {

        if(Math.random() < deathRate) {
            // Infected individual dies
            infected[i].className = 'dead';
        }
    }

}

// Function to check if infected individual recovers
async function recoveryCheck() {

    // Get infected individuals
    let infected = document.getElementsByClassName('infected');

    // Get current recovery rate which is a function of death rate and incubation period
    let recoveryRate = (100 - document.getElementById('death-rate').value) / (100 * document.getElementById('incubation-period').value);

    console.log(recoveryRate);

    for (var i = 0; i < infected.length; i++) {
        if(Math.random() < recoveryRate) {
            // Infected individual recovered
            infected[i].className = 'recovered';
        }
    }
}

// Helper function to determine if two individuals are within a radius of each other
function isInRadius(pointA, pointB, radius) {
    let distance = (pointA[0] - pointB[0]) * (pointA[0] - pointB[0]) + (pointA[1] - pointB[1]) * (pointA[1] - pointB[1]);
    radius *= radius;

    if (distance < radius) {
        return true;
    }

    return false;
}

// Initialize plotly graph in the graph container
function initGraph() {
    Plotly.plot('graph-container', [{
        y: [document.getElementsByClassName('vulnerable').length],
        type: 'line',
        name: 'Vulnerable',
        line: {
            color: 'black'
        }
    }, {
        y: [document.getElementsByClassName('infected').length],
        type: 'line',
        name: 'Infected',
        line: {
            color: 'red'
        }
    }, {
        y: [document.getElementsByClassName('dead').length],
        type: 'line',
        name: 'Dead',
        line: {
            color: 'purple'
        }
    }, {
        y: [document.getElementsByClassName('recovered').length],
        type: 'line',
        name: 'Recovered',
        line: {
            color: 'green'
        }
    }, {
        y: [document.getElementsByClassName('dead').length + document.getElementsByClassName('recovered').length],
        type: 'line',
        name: 'Resistant',
        line: {
            color: 'blue'
        }
    }], {
        height: document.getElementById('graph-container').clientHeight,
        width: document.getElementById('graph-container').clientWidth - 20,
        margin: {
            t: 20,
            l: 30,
            r: 20,
            b: 20
        }
    });
}

// Update the traces of the graph with the real-time values of the simulation
function updateGraph() {
    Plotly.extendTraces('graph-container', {
        y: [[document.getElementsByClassName('vulnerable').length],
            [document.getElementsByClassName('infected').length],
            [document.getElementsByClassName('dead').length],
            [document.getElementsByClassName('recovered').length],
            [document.getElementsByClassName('dead').length + document.getElementsByClassName('recovered').length]]
    }, [0, 1, 2, 3, 4]);
}

// Check to see if the simulation is over, the condition for the simulation to finish is if there are no
// infected individuals left in the simulation
function simulationEndCheck() {

    if (document.getElementsByClassName('infected').length == 0) {

        // Pause the animation and stop the checks that occur every tick
        simulationAnimation.pause();
        clearInterval(infectionInterval);
        clearInterval(deathInterval);
        clearInterval(recoveryInterval);
        clearInterval(graphInterval);
        clearInterval(simulationInterval);

        // Enable the control panel for use after simulation ends
        document.getElementById('number-of-blocks').disabled = false;
        document.getElementById('transmission-rate').disabled = false;
        document.getElementById('death-rate').disabled = false;
        document.getElementById('incubation-period').disabled = false;
        document.getElementById('infection-radius').disabled = false;
        document.getElementById('social-distancing-factor').disabled = false;

        // Hide the stop simulation button and show the start button
        $('#stop-simulation').hide();
        $('#start-simulation').show();
    }

}

$(function() {

    // Onload, show the instruction modal
    $('#instruction-modal').modal('show');

    // Check if a preset was used
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);

    let preset = urlParams.get('preset');

    // Definition of presets defined here
    if (preset == 'covid19') {
        console.log("Using COVID-19 Preset");
        document.getElementById('transmission-rate').value = 21;
        document.getElementById('death-rate').value = 1.5;
        document.getElementById('incubation-period').value = 14;
        document.getElementById('infection-radius').value = 20;

    } else if (preset == 'spanishflu') {
        console.log("Using Spanish Flu Preset");
        document.getElementById('transmission-rate').value = 50;
        document.getElementById('death-rate').value = 33;
        document.getElementById('incubation-period').value = 7;
        document.getElementById('infection-radius').value = 30;
    }

    // Animate the borders of the control panel container
    anime({
        targets: '.control-panel-container',
        borderColor: '#000000',
        marginTop: '10px',
        height: 'flex',
        easing: 'easeInOutQuad'
    });

    // Animate the borders of the simulation container
    anime({
        targets: '.simulation-container',
        borderColor: '#000000',
        marginTop: '10px',
        height: document.getElementsByClassName('control-panel-container')[0].offsetHeight,
        easing: 'easeInOutQuad'
    });

    // Animate the borders of the graph container
    anime({
        targets: '.graph-container',
        borderColor: '#000000',
        marginTop: '10px',
        height: '30vh',
        easing: 'easeInOutQuad'
    });

    // Hide the stop and resume buttons
    $('#stop-simulation').hide();
    $('#resume-simulation').hide();

    // When the user hits the start simulation button
    $('#start-simulation').click(function(){

        // Clear the simulation space of all individuals
        document.getElementById('simulation-container').innerHTML = '';

        // Hide the start button and show the stop button
        $('#start-simulation').hide();
        $('#stop-simulation').show();

        // Get simulation parameters from control panel inputs
        let numOfBlocks = document.getElementById('number-of-blocks').value;
        let socialDistancingFactor = document.getElementById('social-distancing-factor').value / 100;

        // Disable the inputs in the control panel to prevent change without pausing the simulation
        document.getElementById('number-of-blocks').disabled = true;
        document.getElementById('transmission-rate').disabled = true;
        document.getElementById('death-rate').disabled = true;
        document.getElementById('incubation-period').disabled = true;
        document.getElementById('infection-radius').disabled = true;
        document.getElementById('social-distancing-factor').disabled = true;

        initSimulation(numOfBlocks, socialDistancingFactor);
        initGraph();

        // Set the calling of these functions every tick
        infectionInterval = setInterval(infectionCheck, 1000);
        deathInterval = setInterval(deathCheck, 1000);
        recoveryInterval = setInterval(recoveryCheck, 1000);
        graphInterval = setInterval(updateGraph, 1000);
        simulationInterval = setInterval(simulationEndCheck, 1000);

    });

    // When the user wants to stop the simulation
    $('#stop-simulation').click(function() {

        // Hide the stop button and show the resume and start buttons
        $('#stop-simulation').hide();
        $('#resume-simulation').show();
        $('#start-simulation').show();

        // Reenable the control panel for inputs during suspended animation
        document.getElementById('number-of-blocks').disabled = false;
        document.getElementById('transmission-rate').disabled = false;
        document.getElementById('death-rate').disabled = false;
        document.getElementById('incubation-period').disabled = false;
        document.getElementById('infection-radius').disabled = false;
        document.getElementById('social-distancing-factor').disabled = false;

        simulationAnimation.pause();

        // Stop the calling of these functions every tick
        clearInterval(infectionInterval);
        clearInterval(deathInterval);
        clearInterval(recoveryInterval);
        clearInterval(graphInterval);
        clearInterval(simulationInterval);

    });

    // When the resume button is pressed
    $('#resume-simulation').click(function() {

        // Start the animation again
        simulationAnimation.play();

        // Hide the start and resume button and show the stop button
        $('#start-simulation').hide();
        $('#resume-simulation').hide();
        $('#stop-simulation').show();

        // Disable the control panel inputs
        document.getElementById('number-of-blocks').disabled = true;
        document.getElementById('transmission-rate').disabled = true;
        document.getElementById('death-rate').disabled = true;
        document.getElementById('incubation-period').disabled = true;
        document.getElementById('infection-radius').disabled = true;
        document.getElementById('social-distancing-factor').disabled = true;

        // Restablish the intervals
        infectionInterval = setInterval(infectionCheck, 1000);
        deathInterval = setInterval(deathCheck, 1000);
        recoveryInterval = setInterval(recoveryCheck, 1000);
        graphInterval = setInterval(updateGraph, 1000);
        simulationInterval = setInterval(simulationEndCheck, 1000);
    })

    $('#simulation-instructions').click(function() {
        $('#instruction-modal').modal('show');
    });

    $('#control-panel-instructions').click(function() {
        $('#control-panel-modal').modal('show');
    })

});
