window.onload = function(){ 

    //Fetch canvas and get 2d context for drawing
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d"); 

    //Dummy variables for use in demo pendulum animation
    var x = 0; 
    var y = 0;

    //Game loop. repeatOften function is called continuously with requestAnimationFrame
    function repeatOften(){ 
        movePaddle();
        requestAnimationFrame(repeatOften);
    }

    //Begin game loop
    requestAnimationFrame(repeatOften);


    function movePaddle(){
        //Temporary, demo pendulum animation. X controls speed.
        x += 0.02;
        y = 170 +( 150*(Math.sin(x)));

        //Clear canvas ready for drawing new frame
        context.clearRect(0, 0, 700, 400);
        context.fillStyle="#000";
        context.fillRect(0,0,canvas.width,canvas.height);

        //Draw player paddle
        context.beginPath();
        context.fillStyle="white";
        context.fillRect(40,y,10,100);
        context.stroke(); 
    } 
    
};

