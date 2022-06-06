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
    phaseShifts=[Math.PI, 0, Math.PI/2]
    return randomChoice(phaseShifts)
}
function getRandomB() {
    return randomChoice([2, Math.PI, 3, 1])
}

function texFromExpression(str){
    var pos = -1, ch;
    function nextChar(){
        ch = (++pos < str.length) ? str.charAt(pos) : -1;
    }
    function eat(charToEat) {
        while (ch == ' ') nextChar();
        if (ch == charToEat) {
            nextChar();
            return true;
        }
        return false;
    }
    function parse(){
        nextChar();
        var x = parseExpression();
        if (pos < str.length) {
            throw 'Unexpected: ' + ch
        }
        return x;
    }
    function parseExpression() {
        var x = parseTerm();
        for (;;) {
            if      (eat('+')) x = `${x} + ${parseTerm()}` // addition
            else if (eat('-')) x = `${x} - ${parseTerm()}` // subtraction
            else return x;
        }
    }
    function parseTerm() {
        var x = parseFactor();
        for (;;) {
            if      (eat('*')) x=`${x} \\cdot ${parseTerm()}`; // multiplication
            else if (eat('/')) x= `\\frac{${x}}{${parseTerm()}}`; // division
            else return x;
        }
    }
    function parseFactor() {
        if (eat('+')) return `${parseFactor()}`; // unary plus
        if (eat('-')) return `-${parseFactor()}`; // unary minus

        var x;
        var startPos = pos;
        if (eat('(')) { // parentheses
            x = `{(${parseExpression()})}`
            eat(')');
        } else if ((ch >= '0' && ch <= '9') || ch == '.') { // numbers
            while ((ch >= '0' && ch <= '9') || ch == '.') nextChar();
            x = str.substring(startPos, pos);
        } else if (ch >= 'a' && ch <= 'z') { // variables
            while (ch >= 'a' && ch <= 'z') nextChar();
            x= str.substring(startPos, pos);
            if(x.length>1){
                x = `\\${x} {${parseFactor()}}`;
            }
        } else {
            throw `Unexpected: ${ch}`
        }
        if (eat('^')) x = `${x} ^ {${parseFactor()}}` //superscript
        if(eat('_')) x = `${x}_{${parseFactor()}}`;

        return x;
    }
    return `$${parse()}$`;
}