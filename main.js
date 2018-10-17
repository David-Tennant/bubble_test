var amountOfBubbles = 20;
var bubbleRadiusSize = 15;
var randomShakingPixelOffset = 1;

var borderColor = 225;
var startColor = 255;

var randomColorStart = 0;
var randomColorEnd = 200;

var bubbles = [];

function setup() {
    createCanvas(700, 400);
    for (var i = 0; i < amountOfBubbles; i++) {
        bubbles[i] = new Bubble(random(width), random(height));
    }
}

function Bubble(x, y) {
    this.x = x;
    this.y = y;
    this.r = bubbleRadiusSize;
    this.col = color(startColor);

    this.display = function () {
        stroke(borderColor);
        fill(this.col);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }

    this.update = function () {
        this.x = this.x + random(-randomShakingPixelOffset, randomShakingPixelOffset);
        this.y = this.y + random(-randomShakingPixelOffset, randomShakingPixelOffset);
    }

    this.changeColor = function (s, e) {
        this.col = color(random(s, e), random(s, e), random(s, e));
    }

    this.intersects = function (other) {
        var d = dist(this.x, this.y, other.x, other.y);

        if (d < this.r + other.r) {
            return true;
        } else {
            return false;
        }
    }
}

function draw() {
    background(0);

    for (var i = 0; i < bubbles.length; i++) {
        bubbles[i].update();
        bubbles[i].display();
        for (var j = i + 1; j < bubbles.length; j++) {
            if (bubbles[i].intersects(bubbles[j])) {
                bubbles[i].changeColor(randomColorStart, randomColorEnd);
                bubbles[j].changeColor(randomColorStart, randomColorEnd);
            }
        }
    }
}