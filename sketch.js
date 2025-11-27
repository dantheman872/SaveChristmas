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
    dirY: 0,
    m: 1
}

let obstacle = {

    x: 0,
    y: 600,
    w: 400,
    h: 600
}
function preload(){


}

function setup(){

    createCanvas(400,600)
    noStroke()
    for(let i = 0; i < 50; i++){

        snowflake.x.push(random(0, width))
        snowflake.y.push(random(0, height))
        snowflake.d.push(random(3,7))
        snowflake.s.push(random(0.2, 0.4))
    }
}

function draw(){

    background(200,100)
    snowFall()
    playerDraw()
    if(keyIsPressed){

        processMove()
    }
    rect(obstacle.x, obstacle.y, obstacle.w, obstacle.h)

    triangle(100,100, 200,100, 150,150)
    triangle(100,100, 100,200, 150,150)
    triangle(200,100,200,200, 150,150)
    triangle(100,200, 200,200,150,150)

    fill(100,200,100)

    triangle(100,100 ,200,100, 150,50)
    triangle(100,100, 100, 200, 50, 150)
    triangle(200,100,200, 200, 250, 150)
    triangle(100, 200, 200, 200, 150, 250)
}

function snowFall(){

    for(let i = 0; i < snowflake.x.length; i++){

        snowflake.y[i] += snowflake.s[i]
        snowflake.x[i] += random(-1,1)
        noStroke()
        fill(255, 200)
        circle(snowflake.x[i], snowflake.y[i], snowflake.d[i])
        ellipse(20, obstacle.y, 100, 50)
        ellipse(350, obstacle.y + 10, 300, 80)
        ellipse(150, obstacle.y + 15, 300, 60)
        ellipse(80, obstacle.y - 5, 80, 60)

        if(round(snowflake.y[i]) == obstacle.y){

            obstacle.y--
        }

        if(obstacle.y < 0 || obstacle.y < player.y){

            background(0)
        }
    }


    if(frameCount % 20 == 0){

        snowflake.x.push(random(0, width))
        snowflake.y.push(-10)
        snowflake.d.push(random(3,7))
        snowflake.s.push(random(0.2, 0.4))
    }
}

function playerDraw(){

    fill(200,50,50)
    square(player.x, player.y, player.s)
    square(player.x + 10, player.y - 30, 10)
    fill(255)
    square(player.x + player.s/4, player.y - 20, player.s /2)
}

function processMove(){

    if (key === "d" || keyCode === RIGHT_ARROW && canMove(1, 0)){

        player.x += player.m
    } else if (key === "a" || keyCode === LEFT_ARROW && canMove(-1, 0)){

        player.x -= player.m
    } else if (key === "s" || keyCode === DOWN_ARROW && canMove(0, 1)){

        player.y += player.m
    } else if (key === "w" || keyCode === UP_ARROW && canMove(0, -1)){

        player.y -= player.m
    }
}

function canMove(xDir, yDir){

    let newX = player.x + (xDir * player.m)
    let newY = player.y + (yDir * player.m)
    return newX + player.s <= obstacle.x || newX >= obstacle.x + obstacle.w
        || newY + player.s <= obstacle.y || newY >= obstacle.y + obstacle.h
}

function presentSpawning(){


}

function presentWrapping(){


}