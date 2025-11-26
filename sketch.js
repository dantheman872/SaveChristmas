let snowflake = {

    x: [],
    y: [],
    d: [],
    s: []
}

let player = {

    x: 100,
    y: 100,
    s: 50,
    dirX: 0,
    dirY: 0
}

function preload(){


}

function setup(){

    createCanvas(400,600)
}

function draw(){

    background(200,100)
    snowFall()
    playerDraw()
    playerMovement()
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

function playerMovement(){

    player.x += 0.5 * player.dirX
    player.y += 0.5 * player.dirY
}

function playerDraw(){

    fill(200,50,50)
    square(player.x, player.y, player.s)
    square(player.x + 10, player.y - 30, 10)
    fill(255)
    square(player.x + player.s/4, player.y - 20, player.s /2)
}

function keyPressed(){

    if(keyCode == LEFT_ARROW){

        player.dirX = -1
    } else

    if(keyCode == RIGHT_ARROW){

        player.dirX = 1
    } else

    if(keyCode == UP_ARROW){

        player.dirY = -1
    } else

    if(keyCode == DOWN_ARROW){

        player.dirY = 1
    } else {

        player.dirX = 0
        player.dirY = 0
    }


}

