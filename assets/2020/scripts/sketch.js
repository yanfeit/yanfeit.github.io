// Alright, rose time.
var d = 8;
var n = 5;
var sliderD;
var sliderN;

function setup() {

    canvas = createCanvas(400, 400);
    canvas.parent('canvas-holder');

    sliderD = createSlider(1, 20, 10, 1);
    sliderN = createSlider(1, 20, 10, 1);

    sliderD.parent('button-holder');
    sliderN.parent('button-holder');

    sliderD.input(draw);
    sliderN.input(draw);
}

function draw() {

    d = sliderD.value();
    n = sliderN.value();
    var k = n / d;
    background('black');
    push();
    translate(width / 2, height / 2);

    beginShape();
    stroke(255);
    noFill();
    strokeWeight(1);
    for (var a = 0; a < TWO_PI * reduceDenominator(n, d); a += 0.02) {
        var r = 200 * cos(k * a);
        var x = r * cos(a);
        var y = r * sin(a);
        vertex(x, y);
    }
    endShape(CLOSE);
    pop();
    noLoop();
}

function reduceDenominator(numerator, denominator) {
    function rec(a, b) {
        return b ? rec(b, a % b) : a;
    }
    return denominator / rec(numerator, denominator);
}