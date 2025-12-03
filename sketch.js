function preload(){

//    santaSprite = [loadImage("assets/santa/r1")]
}

let i1, i2, i3, i4, ribbonTied, santaSprite

let presentWrappingTrue = false
let count = 0
let presentCount = 0
let gameover = false

let snowflake = {

    x: [],
    y: [],
    d: [],
    s: []
}

let present = {

    x: 175,
    y: 275,
    w: 50
}

let player = {

    x: 100,
    y: 100,
    s: 50,
    dirX: 0,
    dirY: 0,
    m: 2
}

let obstacle = {

    x: 0,
    y: 600,
    w: 400,
    h: 1200
}

function setup(){

    createCanvas(400,600)
    noStroke()
    for(let i = 0; i < 50; i++){

        snowflake.x.push(random(0, width))
        snowflake.y.push(random(0, height))
        snowflake.d.push(random(3,7))
        snowflake.s.push(random(1.2,1.6))
    }
}

function draw(){

    background(200,100)
    snowFall()

    fill(198,140,83)
    rect(present.x, present.y, present.w)

    playerDraw()
    if(keyIsPressed){

        if(!presentWrappingTrue){

            processMove()
        }
        presentSpawning(width/2, height/2)
    }
    
    fill(220)
    rect(obstacle.x, obstacle.y, obstacle.w, obstacle.h)
    ellipse(20, obstacle.y, 100, 50)
    ellipse(350, obstacle.y + 10, 300, 80)
    ellipse(150, obstacle.y + 15, 300, 60)
    ellipse(80, obstacle.y - 5, 80, 60)

    if(!gameover){
        
        presentDrawing(width/2, height/2)
    } else {

        fill(200,10,100)
        textSize(40)
        text("Snowed In!!", width/2, height/2)
        textSize(30)
    }

    textAlign(CENTER,CENTER)

    fill(200,100,200)
    textSize(20)
    text(presentCount + " Christmas Mornings Saved", width/2, 550)
    

    if(playerIsOverPresent(present.x, present.y, present.w) && presentWrappingTrue == false){

        textSize(30)
        text("Press F to Wrap", width/2, 500)
    }

    if(presentWrappingTrue){

        textSize(30)
        text("Click to Wrap", width/2, 500)
    }
}

function snowFall(){

    for(let i = 0; i < snowflake.x.length; i++){

        snowflake.y[i] += snowflake.s[i]
        snowflake.x[i] += random(-1,1)
        noStroke()
        fill(255, 200)
        circle(snowflake.x[i], snowflake.y[i], snowflake.d[i])
        

        if(round(snowflake.y[i]) == obstacle.y){

            obstacle.y--
        }

        if(obstacle.y < 0 || obstacle.y < player.y){

            gameover = true
        }
    }


    if(frameCount % 10 == 0){

        snowflake.x.push(random(0, width))
        snowflake.y.push(-10)
        snowflake.d.push(random(3,7))
        snowflake.s.push(random(1.2, 1.6))
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

    if(!gameover){
        
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
}

function canMove(xDir, yDir){

    let newX = player.x + (xDir * player.m)
    let newY = player.y + (yDir * player.m)
    return newX + player.s <= obstacle.x || newX >= obstacle.x + obstacle.w
        || newY + player.s <= obstacle.y || newY >= obstacle.y + obstacle.h
}

function presentSpawning(x, y){

    if(key === "f" && playerIsOverPresent(present.x, present.y, present.w)){
        
        count = 0
        presentWrappingTrue = true
        i1 = y- 50
        i2 = x - 50
        i3 = x + 150
        i4 = y + 150 
    }  
}

function presentDrawing(x, y){

    if(presentWrappingTrue){
        fill(255,204,0)
        rectMode(CENTER)

        if(!ribbonTied){
            
            rect(x, y, 190, 10)
        }
    
        fill(198,140,83)

        triangle(x - 50, y - 50, x + 50, y - 50, x, y)
        triangle(x - 50, y - 50, x - 50, y + 50, x, y)
        triangle(x + 50, y - 50, x + 50, y + 50, x, y)
        triangle(x - 50, y + 50, x + 50, y + 50, x, y)

        fill(100,200,100)

        triangle(x - 50, y - 50, x + 50, y - 50, x, i1 - 50)
        triangle(x - 50, y - 50, x - 50, y + 50, i2 - 50, y)
        triangle(x + 50, y - 50, x + 50, y + 50, i3 - 50, y)
        triangle(x - 50, y + 50, x + 50, y + 50, x, i4 - 50)

        if(ribbonTied){

            fill(255, 204, 0)
            rect(x, y, 100, 10)
            rect(x, y, 10, 30)
        }

        rectMode(CORNER)
    } 
}

function playerIsOverPresent(x, y, w){

    return player.x + player.s <= x + w + 50 && player.x >= x - 50
        && player.y + player.s <= y + w + 50 && player.y >= y - 50;  
}

function mousePressed(){

   // count++
    let p1 = false
    let p2 = false
    let p3 = false
    let p4 = false

    if (count == 0 || count == 1 || count == 2 || count == 3){

        if(mouseY < 250 && mouseY > 200 && mouseX < 250 && mouseX > 150){

            i1 = height/2 +50
            count++
        }

        if(mouseY > 350 && mouseY < 400 && mouseX < 250 && mouseX > 150){

            i4 = height/2 + 50
            count++
        }

        if(mouseX < 150 && mouseX > 100 && mouseY < 350 && mouseY > 250){

            i2 = width/2 + 50
            count++
        }

        if(mouseX < 300 && mouseX > 250 && mouseY < 350 && mouseY > 250){

            i3 = width/2 + 50
            count++
        }
    }   

    if(count == 4 && mouseIsPressed){

        count++
    }

    if (count == 5 && mouseIsPressed){

        ribbonTied = true
        count++
    }

    if(count == 6 && presentWrappingTrue && mouseIsPressed){

        ribbonTied = false
        count = 0 
        presentCount += 1
        presentWrappingTrue = false
        present.x = random(50, width - 50)

        if(player.y > obstacle.y/2){

            present.y = random(50, obstacle.y /2)
        } else {

            present.y = random(obstacle.y/2, obstacle.y - 50)
        }
    }
}