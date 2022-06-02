function randomChoice(arr) {
    return arr[Math.floor(Math.random()*arr.length)]
}
function randInt(min, max) {
    var rand = Math.floor((Math.random() * (max-min)) + min);
    return rand
}
const TWO_PI = 2*Math.PI

function getRandomAmplitude() {
    return randInt(1,5)
}
function getRandomMidline() {
    return randInt(-3,3)
    
}
function getRandomPhaseShift() {
    phaseShifts=[Math.PI, 0]
    return randomChoice(phaseShifts)
}
function getRandomB() {
    return randomChoice([2, Math.PI, 3, 1])
}