window.onload = function(){ 

    CanvasRenderingContext2D.prototype.dashedLine = function (x1, y1, x2, y2, dashLen) {
        if (dashLen == undefined) dashLen = 2;
        this.moveTo(x1, y1);

        var dX = x2 - x1;
        var dY = y2 - y1;
        var dashes = Math.floor(Math.sqrt(dX * dX + dY * dY) / dashLen);
        var dashX = dX / dashes;
        var dashY = dY / dashes;

        var q = 0;
        while (q++ < dashes) {
            x1 += dashX;
            y1 += dashY;
            this[q % 2 == 0 ? 'moveTo' : 'lineTo'](x1, y1);
        }
        this[q % 2 == 0 ? 'moveTo' : 'lineTo'](x2, y2);
    };



    //Fetch canvas and get 2d context for drawing
    var board = document.getElementById("board");
    var game = document.getElementById("game");

    var boardContext = board.getContext("2d");
    var gameContext = game.getContext("2d");

    var gameSize = { width: 700, height: 450 };
    var paddleSize = { width: 10, height: 100 };
    var ballSize = { width: 10, height: 10 }
    var padding = { horizontal: 40, vertical: 20 };


    // Create Board
    boardContext.clearRect(0, 0, gameSize.width, gameSize.height);
    boardContext.fillStyle="#000";
    boardContext.fillRect(0, 0, gameSize.width, gameSize.height);

    boardContext.strokeStyle="#FFF";
    boardContext.lineWidth = 5;
    boardContext.dashedLine(gameSize.width/2, 0, gameSize.width/2, gameSize.height, gameSize.height/41);
    boardContext.stroke();

    //Game loop. repeatOften function is called continuously with requestAnimationFrame
    function repeatOften(){
        prepareDrawing();
        movePaddles();
        moveBall();
        requestAnimationFrame(repeatOften);
    }

    //Begin game loop
    requestAnimationFrame(repeatOften);

    //Create player object to hold player properties
    var playerA = {
        x:0+padding.horizontal,
        y:(gameSize.height/2)-(paddleSize.height/2),
        up:false,
        down:false
    };
    var playerB = {
        x:gameSize.width-padding.horizontal,
        y:(gameSize.height/2)-(paddleSize.height/2),
        up:false,
        down:false
    };

    var ball = {
        x: gameSize.width/2,
        y: gameSize.height/2,
        angle: Math.PI/2,
        velocity: 5
    }

    function prepareDrawing(){
        gameContext.clearRect(0, 0, gameSize.width, gameSize.height);
        gameContext.beginPath();
    }

    function movePaddles(){
        // Draw player paddles
        gameContext.fillStyle="white";
        gameContext.fillRect(playerA.x, playerA.y, paddleSize.width, paddleSize.height);
        gameContext.fillRect(playerB.x, playerB.y, paddleSize.width, paddleSize.height);

        //Move player as per keys pressed, prevent from leaving game area
        if(playerA.up && playerA.y > padding.vertical)
            playerA.y -= 5;
        else if(playerA.down && playerA.y < gameSize.height-padding.vertical-paddleSize.height)
            playerA.y += 5;

        if(playerB.up && playerB.y > padding.vertical)
            playerB.y -= 5;
        else if(playerB.down && playerB.y < gameSize.height-padding.vertical-paddleSize.height)
            playerB.y += 5;
    } 

    function moveBall(){
        // Draw player paddles
        gameContext.fillStyle="white";
        gameContext.fillRect(ball.x, ball.y, ballSize.width, ballSize.height);

        ball.x += ball.velocity * Math.sin(ball.angle);
        ball.y += ball.velocity * Math.cos(ball.angle);
    }


    //Player Controls
    //=======================================================================

    //keyboard key event detection
    window.addEventListener("keydown",keyControl,false);
    window.addEventListener("keyup",clearKeyControl,false);

    function keyControl(e){
        if (e.which == 87) playerA["up"] = true;       //  W
        if (e.which == 83) playerA["down"] = true;     //  S

        if (e.which == 38) playerB["up"] = true;       //  UP
        if (e.which == 40) playerB["down"] = true;     //  DOWN
    }

    //On keyup, clear all "up" and "down" properties
    function clearKeyControl(e){
        if (e.which == 87) playerA["up"] = false;       //  W
        if (e.which == 83) playerA["down"] = false;     //  S

        if (e.which == 38) playerB["up"] = false;       //  UP
        if (e.which == 40) playerB["down"] = false;     //  DOWN
    }

};

