// Alright, rose time.
var d = 8;
var n = 5;
var sliderD;
var sliderN;

function setup() {

    canvas = createCanvas(500, 500);
    canvas.parent('canvas-holder');

    sliderN = createSlider(1, 20, 15, 1);
    sliderD = createSlider(1, 20, 5, 1);
    sliderK = createSlider(1, 80, 23, 1);
    
    sliderN.parent('button-holder1');
    sliderD.parent('button-holder2');
    sliderK.parent('button-holder3');
    
    sliderN.input(draw);
    sliderD.input(draw);
    sliderK.input(draw);
    
}

function draw() {

    n = sliderN.value();
    d = sliderD.value();
    k = sliderK.value();
    
    var p = n / d;
    background('white');
    push();
    translate(width / 2, height / 2);

    beginShape();
    stroke('#999999');
    // stroke(color(`hsl(160, 100%, 50%)`));
    noFill();
    strokeWeight(2);
    for (let a = 0; a < TWO_PI * reduceDenominator(n, d); a += 0.02) {

        let r = 250 * sin(p * a);
        let x = r * cos(a);
        let y = r * sin(a);
        vertex(x, y);
    }
    endShape(CLOSE);

    pop();

    push();
    translate(width / 2, height / 2);
    beginShape();
    stroke('#66CCFF');
    // stroke(color('hsl(210, 100%, 50%)'));
    noFill();
    strokeWeight(2);
    
    for (let a = 0; a < 360 * k ; a += k) {
        
        var r = 250 * sin(p * a * PI / 180);
        var x = r * cos(a * PI/180);
        var y = r * sin(a * PI/180);
        vertex(x, y);
    }

    endShape(CLOSE);

    pop();

    var spantagn = document.getElementById("rose-params-n");
    spantagn.innerHTML = sliderN.value();
    var spantagd = document.getElementById("rose-params-d");
    spantagd.innerHTML = sliderD.value();
    var spantagk = document.getElementById("rose-params-k");
    spantagk.innerHTML = sliderK.value();
    noLoop();

    
}

function reduceDenominator(numerator, denominator) {
    function rec(a, b) {
        return b ? rec(b, a % b) : a;
    }
    return denominator / rec(numerator, denominator);
}