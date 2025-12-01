let snowflake = {

    x: [],
    y: [],
    d: [],
    s: []
}

let i1, i2, i3, i4, ribbonTied

let presentWrappingTrue = false
let count = 0


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

        if(!presentWrappingTrue){

            processMove()
        }
    }

    if(player.x > 100){

        presentSpawning()
    }
    rect(obstacle.x, obstacle.y, obstacle.w, obstacle.h)
 //   presentSpawning()
    presentWrapping()
    presentDrawing(player.x, player.y)

    text(count, 50, 50)
    text(ribbonTied, 50, 60)
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

    presentWrappingTrue = true
    i1 = player.y - 50
    i2 = player.y - 50
    i3 = player.y + 150
    i4 = player.y + 150   
}

function presentDrawing(x, y){

    if(presentWrappingTrue){

        fill(255,204,0)

        if(!ribbonTied){

            rect(x - 45, y + 45, 190, 10)
        }
    
        fill(198,140,83)

        triangle(x, y, x + 100, y, x + 50, y + 50)
        triangle(x, y, x, y + 100, x + 50, y + 50)
        triangle(x + 100, y, x + 100, y + 100, x + 50, y + 50)
        triangle(x, y + 100, x + 100, y + 100, x + 50, y + 50)

        fill(100,200,100)

        triangle(x, y, x + 100, y, x + 50, i1)
        triangle(x, y, x, y + 100, i2, y + 50)
        triangle(x + 100, y, x + 100, y + 100, i3, y + 50)
        triangle(x, y + 100, x + 100, y + 100, x + 50, i4)

        if(ribbonTied){

            fill(255, 204, 0)
            rect(x, y + 45, 100, 10)
            rect(x + 45, y + 35, 10, 30)
        }
    }
}

function presentWrapping(){


}

function ifMouseIsOver(){


}

function mousePressed(){

    count++

    if (count == 1){

        i1 = player.y + 50       
    }    

    if(count == 2){

        i3 = player.y + 50
    }

    if(count == 3){

        i4 = player.y + 50
    }

    if(count == 4){

        i2 = player.y + 50
    }

    if (count == 5){

        ribbonTied = true
    }
}