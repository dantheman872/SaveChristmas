let snowflake = {

    x: [],
    y: [],
    d: [],
    s: []
}



function preload(){


}

function setup(){

    createCanvas(400,600)
}

function draw(){

    background(200,100)
    snowFall()
}

function snowFall(){

    for(let i = 0; i < snowflake.x.length; i++){

        snowflake.y[i] += snowflake.s[i]
        snowflake.x[i] += random(-1,1)
        noStroke()
        fill(255, 200)
        circle(snowflake.x[i], snowflake.y[i], snowflake.d[i])
    }


    if(frameCount % 20 == 0){

        snowflake.x.push(random(0, width))
        snowflake.y.push(-10)
        snowflake.d.push(random(3,7))
        snowflake.s.push(random(0.2,0.4))
    }
}