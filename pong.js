window.onload = function(){ 

    //Fetch canvas and get 2d context for drawing
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    var gameSize = { width: 700, height: 400};
    var paddleSize = { width: 10, height: 100};
    var padding = { horizontal: 40, vertical: 20};

    //Game loop. repeatOften function is called continuously with requestAnimationFrame
    function repeatOften(){ 
        movePaddles();
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


    function movePaddles(){
        //Clear canvas ready for drawing new frame
        context.clearRect(0, 0, gameSize.width, gameSize.height);
        context.fillStyle="#000";
        context.fillRect(0,0,canvas.width,canvas.height);

        // Draw player paddles
        context.beginPath();
        context.fillStyle="white";
        context.fillRect(playerA.x,playerA.y,paddleSize.width,paddleSize.height);
        context.fillRect(playerB.x,playerB.y,paddleSize.width,paddleSize.height);

        //Move player as per keys pressed, prevent from leaving game area
        if(playerA.up && playerA.y > padding.vertical)
            playerA.y -= 3;
        else if(playerA.down && playerA.y < gameSize.height-padding.vertical-(paddleSize.height/2))
            playerA.y += 3;

        if(playerB.up && playerB.y > padding.vertical)
            playerB.y -= 3;
        else if(playerB.down && playerB.y < gameSize.height-padding.vertical-(paddleSize.height/2))
            playerB.y += 3;
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

