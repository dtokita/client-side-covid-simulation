// Global animation variables
var simulationAnimation;

// Global interval variables
var infectionInterval;
var deathInterval;
var recoveryInterval;
var graphInterval;
var simulationInterval;

function initSimulation(numOfBlocks, socialDistancingFactor) {
    let simulationContainer = document.getElementById('simulation-container');

    let patientZero = document.createElement('div');
    patientZero.id = 0;
    patientZero.className = 'infected';

    if (Math.random() >= socialDistancingFactor) {
        patientZero.className += ' moving';
    }

    simulationContainer.appendChild(patientZero);

    for (var i = 1; i <= numOfBlocks; i++) {
        let vulnerable = document.createElement('div');
        vulnerable.id = i;
        vulnerable.className = 'vulnerable';

        if (Math.random() >= socialDistancingFactor) {
            vulnerable.className += ' moving';
        }

        simulationContainer.appendChild(vulnerable);
    }

    let simulationRect = getSimulationRect();

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

function getSimulationRect() {
    let simulationContainer = document.getElementById('simulation-container');
    let simulationContainerRect = simulationContainer.getBoundingClientRect();

    return simulationContainerRect;
}

function infectionCheck() {
    let infected = document.getElementsByClassName('infected');
    let vulnerable = document.getElementsByClassName('vulnerable');
    let transmissionRate = document.getElementById('transmission-rate').value / 100;

    for (var i = 0; i < infected.length; i++) {
        for (var j = 0; j < vulnerable.length; j++) {

            if (isInRadius(
                [infected[i].style['left'].slice(0, -2), infected[i].style['top'].slice(0, -2)],
                [vulnerable[j].style['left'].slice(0, -2), vulnerable[j].style['top'].slice(0, -2)],
                document.getElementById('infection-radius').value
            )) {

                if(Math.random() < transmissionRate) {
                    vulnerable[j].className = 'infected';
                }

            }

        }
    }

}

function deathCheck() {
    let infected = document.getElementsByClassName('infected');
    let deathRate = document.getElementById('death-rate').value / 100;

    for (var i = 0; i < infected.length; i++) {
        if(Math.random() < deathRate) {
            infected[i].className = 'dead';
        }
    }

}

function recoveryCheck() {
    let infected = document.getElementsByClassName('infected');
    let recoveryRate = (100 - document.getElementById('death-rate').value) / (100 * document.getElementById('incubation-period').value);

    console.log(recoveryRate);

    for (var i = 0; i < infected.length; i++) {
        if(Math.random() < recoveryRate) {
            infected[i].className = 'recovered';
        }
    }
}

function isInRadius(pointA, pointB, radius) {
    let distance = (pointA[0] - pointB[0]) * (pointA[0] - pointB[0]) + (pointA[1] - pointB[1]) * (pointA[1] - pointB[1]);
    radius *= radius;

    if (distance < radius) {
        return true;
    }

    return false;
}

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

function updateGraph() {
    Plotly.extendTraces('graph-container', {
        y: [[document.getElementsByClassName('vulnerable').length],
            [document.getElementsByClassName('infected').length],
            [document.getElementsByClassName('dead').length],
            [document.getElementsByClassName('recovered').length],
            [document.getElementsByClassName('dead').length + document.getElementsByClassName('recovered').length]]
    }, [0, 1, 2, 3, 4]);
}

function simulationEndCheck() {

    if (document.getElementsByClassName('infected').length == 0) {
        simulationAnimation.pause();
        clearInterval(infectionInterval);
        clearInterval(deathInterval);
        clearInterval(recoveryInterval);
        clearInterval(graphInterval);
        clearInterval(simulationInterval);

        document.getElementById('number-of-blocks').disabled = false;
        document.getElementById('transmission-rate').disabled = false;
        document.getElementById('death-rate').disabled = false;
        document.getElementById('incubation-period').disabled = false;
        document.getElementById('infection-radius').disabled = false;
        document.getElementById('social-distancing-factor').disabled = false;

        $('#stop-simulation').hide();
        $('#start-simulation').show();
    }

}

$(function() {



    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);

    let preset = urlParams.get('preset');

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

    anime({
        targets: '.control-panel-container',
        borderColor: '#000000',
        marginTop: '10px',
        height: 'flex',
        easing: 'easeInOutQuad'
    });

    anime({
        targets: '.simulation-container',
        borderColor: '#000000',
        marginTop: '10px',
        height: document.getElementsByClassName('control-panel-container')[0].offsetHeight,
        easing: 'easeInOutQuad'
    });

    anime({
        targets: '.graph-container',
        borderColor: '#000000',
        marginTop: '10px',
        height: '30vh',
        easing: 'easeInOutQuad'
    });

    $('#stop-simulation').hide();
    $('#resume-simulation').hide();

    $('#start-simulation').click(function(){

        document.getElementById('simulation-container').innerHTML = '';

        $('#start-simulation').hide();
        $('#stop-simulation').show();

        let numOfBlocks = document.getElementById('number-of-blocks').value;
        let socialDistancingFactor = document.getElementById('social-distancing-factor').value / 100;

        document.getElementById('number-of-blocks').disabled = true;
        document.getElementById('transmission-rate').disabled = true;
        document.getElementById('death-rate').disabled = true;
        document.getElementById('incubation-period').disabled = true;
        document.getElementById('infection-radius').disabled = true;
        document.getElementById('social-distancing-factor').disabled = true;

        initSimulation(numOfBlocks, socialDistancingFactor);
        initGraph();
        infectionInterval = setInterval(infectionCheck, 1000);
        deathInterval = setInterval(deathCheck, 1000);
        recoveryInterval = setInterval(recoveryCheck, 1000);
        graphInterval = setInterval(updateGraph, 1000);
        simulationInterval = setInterval(simulationEndCheck, 1000);

    });

    $('#stop-simulation').click(function() {

        $('#stop-simulation').hide();
        $('#resume-simulation').show();
        $('#start-simulation').show();

        document.getElementById('number-of-blocks').disabled = false;
        document.getElementById('transmission-rate').disabled = false;
        document.getElementById('death-rate').disabled = false;
        document.getElementById('incubation-period').disabled = false;
        document.getElementById('infection-radius').disabled = false;
        document.getElementById('social-distancing-factor').disabled = false;

        simulationAnimation.pause();
        clearInterval(infectionInterval);
        clearInterval(deathInterval);
        clearInterval(recoveryInterval);
        clearInterval(graphInterval);
        clearInterval(simulationInterval);

    });

    $('#resume-simulation').click(function() {
        simulationAnimation.play();

        $('#start-simulation').hide();
        $('#resume-simulation').hide();
        $('#stop-simulation').show();

        document.getElementById('number-of-blocks').disabled = true;
        document.getElementById('transmission-rate').disabled = true;
        document.getElementById('death-rate').disabled = true;
        document.getElementById('incubation-period').disabled = true;
        document.getElementById('infection-radius').disabled = true;
        document.getElementById('social-distancing-factor').disabled = true;

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