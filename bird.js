// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&


function mutate(x) {

    if (random(1) < 0.1) {
        let offset = randomGaussian() * 0.5;
        let newx = x + offset;
        return newx;
    } else {
        return x;
    }
}

function Bird(brain) {
    this.y = height / 2;
    this.x = 64;

    this.gravity = 0.7;
    this.lift = -12;
    this.velocity = 0;
    this.score = 0;
    this.fitness = 0;

    if (brain) {
        this.brain = brain.copy();
    } else {
        this.brain = new NeuralNetwork(5, 8, 1);
    }

    this.copy = function() {
        return new Bird(this.brain);
    }


    this.show = function() {
        stroke(255);
        fill(255, 50);
        ellipse(this.x, this.y, 32, 32);
    }

    this.up = function() {
        this.velocity += this.lift;
    }

    this.offScreen = function() {
        return (this.y > height || this.y < 0);
    }

    this.findClosestPipe = function(pipes) {
        let closest = null;
        let Dmin = Infinity;

        for (let i = 0; i < pipes.length; i++) {
            let d = pipes[i].x + pipes[i].w - this.x;
            if (d < Dmin && d > 0) {
                Dmin = d;
                closest = pipes[i];
            }
        }
        return closest;
    }

    this.mutate = function() {
        this.brain.mutate(0.1);
    }

    this.think = function(pipes) {

        let inputs = [];
        let closest = this.findClosestPipe(pipes);
        inputs[0] = this.y / height;

        inputs[1] = closest.top / height;
        inputs[2] = closest.bottom / height;
        inputs[3] = closest.x / width;
        inputs[4] = this.velocity / 10;
        let output = this.brain.predict(inputs);

        if (output[0] > 0.5) {
            this.up();
        }
    }

    this.update = function() {
        this.score++;
        this.velocity += this.gravity;
        // this.velocity *= 0.9;
        this.y += this.velocity;



    }

}