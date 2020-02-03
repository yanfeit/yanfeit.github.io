// Alright, rose time.
var d = 8;
var n = 5;
var sliderD;
var sliderN;

function setup() {

    canvas = createCanvas(500, 500);
    canvas.parent('canvas-holder');

    sliderN = createSlider(1, 20, 10, 1);
    sliderD = createSlider(1, 20, 10, 1);
    
    sliderN.parent('button-holder1');
    sliderD.parent('button-holder2');
    
    sliderN.input(draw);
    sliderD.input(draw);
    
}

function draw() {

    n = sliderN.value();
    d = sliderD.value();
    
    var k = n / d;
    background('black');
    push();
    translate(width / 2, height / 2);

    beginShape();
    stroke(255);
    noFill();
    strokeWeight(1);
    for (var a = 0; a < TWO_PI * reduceDenominator(n, d); a += 0.02) {
        var r = 250 * cos(k * a);
        var x = r * cos(a);
        var y = r * sin(a);
        vertex(x, y);
    }
    endShape(CLOSE);
    pop();

    var spantagn = document.getElementById("rose-params-n");
    spantagn.innerHTML = sliderN.value();
    var spantagd = document.getElementById("rose-params-d");
    spantagd.innerHTML = sliderD.value();

    noLoop();
}

function reduceDenominator(numerator, denominator) {
    function rec(a, b) {
        return b ? rec(b, a % b) : a;
    }
    return denominator / rec(numerator, denominator);
}