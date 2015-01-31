window.onload = function(){ 

    //Fetch canvas and get 2d context for drawing
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d"); 

    //Game loop. repeatOften function is called continuously with requestAnimationFrame
    function repeatOften(){ 
        movePaddle();
        requestAnimationFrame(repeatOften);
    }

    //Begin game loop
    requestAnimationFrame(repeatOften);

    //Create player object to hold player properties
    var player = {x:40, y:20, up:false, down:false};


    function movePaddle(){
        //Clear canvas ready for drawing new frame
        context.clearRect(0, 0, 700, 400);
        context.fillStyle="#000";
        context.fillRect(0,0,canvas.width,canvas.height);

        //Draw player paddle
        context.beginPath();
        context.fillStyle="white";
        context.fillRect(40,player.y,10,100);
        context.stroke(); 

        //Move player as per keys pressed, prevent from leaving game area
        if(player.up && player.y > 20){player.y -= 3;}
        if(player.down && player.y < 330){player.y += 3;}
    } 

    //Player Controls
    //=======================================================================

    //keyboard key event detection
    window.addEventListener("keydown",keyControl,false);
    window.addEventListener("keyup",clearKeyControl,false);

    function keyControl(e){
        player[getKey(e.which)] = true;
    }

    //On keyup, clear all "up" and "down" properties
    function clearKeyControl(e){
        player[getKey(e.which)] = false;
    }

    //W = up, S = down
    function getKey(key){
        switch(key){
            case 87: return "up"; break;
            case 83: return "down"; break;
        }
    }

};

