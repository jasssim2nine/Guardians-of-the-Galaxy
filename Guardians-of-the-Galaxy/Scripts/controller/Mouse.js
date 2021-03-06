/// <reference path="../Sound.js" />

//ev_mouseup function for mousehover in the canvas

function ev_mouseup(ev)
{
   var x;
   var y;

   if (ev.offsetX || ev.offsetX == 0)
   {
     x = ev.offsetX;
     y = ev.offsetY;
   }
   else if (ev.layerX || ev.layerX == 0)  
   {                                      
     x = ev.layerX - g_canvas.offsetLeft -8;
     y = ev.layerY - g_canvas.offsetTop -8;
   }

   var ox = 40;
   var oy = 300;
   var ow = 30;

   if ( y >= oy+35 && y <= oy+35 + ow && x >= ox+520 && x <= ox+520 + ow)
   {
      g_ship.fire(false);
      return;
   }

   g_ship.fire(false);
   g_ship.up(false);
   g_ship.left(false);
   g_ship.right(false);
   g_ship.down(false);
}
//ev_mousedown function for mousehover in the canvas

function ev_mousedown(ev)
{
   var x;
   var y;

   if (ev.offsetX || ev.offsetX == 0)  
   {
     x = ev.offsetX;
     y = ev.offsetY;
   }
   else if (ev.layerX || ev.layerX == 0) 
   {                                     
     x = ev.layerX - g_canvas.offsetLeft -8;
     y = ev.layerY - g_canvas.offsetTop -8;
   }
    //a simple splash screen before menu state
   if (g_gameState == "splash")
   {
      if ( x > 50 && x < 200 && y > 300 && y < 330 )
      {
         g_canvas.removeEventListener('mousemove', ev_mousemove, false);

         if ( !g_onscreenControls )
            g_canvas.removeEventListener('mousedown', ev_mousedown, false);
         else
            g_canvas.addEventListener('mouseup', ev_mouseup, false);

         document.getElementById("loading_music").pause();
         main();
      }
          //displays the instructions state once the instructions button is clicked
      else if ( x > 50 && x < 200 && y > 340 && y < 370 )
      {
         var bg    = document.getElementById("splash_screen");
         g_context.drawImage(bg,0,0);

         g_context.fillStyle = 'rgba(0,0,0,.6)';
         g_context.fillRect(0,0,600,400);
         g_context.fillStyle = "yellow";
         g_context.fillText("",60,100);
        
         g_context.fillText("Guardians of the Galaxy. From Marvel, the studio that brought ", 60, 100);
         g_context.fillText("you the global blockbuster franchises of Iron Man, Thor, ", 60, 125);
         g_context.fillText("Captain America and The Avengers,", 60, 150);
         g_context.fillText("Comes a new team - the Guardians of the Galaxy.", 60, 175);
            
         g_context.fillText("Collect the powerups ,treasures and", 60, 200);
         g_context.fillText("save the from the enemies", 60, 225);


         g_context.fillStyle = "white";
         g_context.fillText("arrow keys = movement",60,285);
         g_context.fillText("z = fire weapon",60,310);
         g_context.fillText("collect powerups and treasures",60,335);
         g_context.fillText("p key pauses game",60,365);
         g_context.fillText("try onscreen controls if you have no keyboard",60,390);

         g_context.fillStyle = "black";
         g_context.fillRect(370,290,150,30);
         g_context.strokeStyle = "gray";
         g_context.strokeRect(370,290,150,30);
         g_context.fillStyle = "gray";
         g_context.fillText("OK",425,312);

         g_gameState = "instructions";

      }
       //checks whether the onscreen control checbox is selected
      if ( x > 400 && x < 420 && y > 283 && y < 303 )
      {
         g_onscreenControls = !g_onscreenControls;

         g_context.fillStyle = "black"; 
         g_context.fillRect(400,283,20,20);  //ctrls checkbox

         if ( g_onscreenControls )
         {
            g_context.strokeStyle = "gray";
            g_context.beginPath();
            g_context.moveTo(400,283);
            g_context.lineTo(420,303);
            g_context.stroke();
            g_context.beginPath();
            g_context.moveTo(420,283);
            g_context.lineTo(400,303);
            g_context.stroke();
         }
      }
   }

   else if (g_gameState == "instructions")
   {
      if ( x > 370 && x < 370+150 && y > 290 && y < 290+30 )
      {
         bodyLoaded(true);
      }
   }
   else
   {
      
      var ox = 40;
      var oy = 300;
      var ow = 30;

      if ( !g_paused )
      {
         if ( y >= oy+35 && y <= oy+35 + ow && x >= ox+520 && x <= ox+520 + ow) 
            g_ship.fire(true);

         if ( y >= oy && y <= oy + ow && x >= ox && x <= ox + ow) 
            g_ship.up(true);
         if ( y >= oy+35 && y <= oy+35 + ow && x >= ox-35 && x <= ox-35 + ow) 
            g_ship.left(true);
         if ( y >= oy+35 && y <= oy+35 + ow && x >= ox+35 && x <= ox+35 + ow) 
            g_ship.right(true);
         if ( y >= oy+70 && y <= oy+70 + ow && x >= ox && x <= ox + ow) 
            g_ship.down(true);
      }

      if ( y >= oy+35 && y <= oy+35 + ow && x >= ox+270 && x <= ox+270 + ow)
         pause();
   }
}



//function to show the mousehover on the onscreen game controls buttons

function ev_mousemove(ev)
{
   var x;
   var y;

   if (ev.offsetX || ev.offsetX == 0)  
   {
     x = ev.offsetX;
     y = ev.offsetY;
   }
   else if (ev.layerX || ev.layerX == 0)       
   {
     x = ev.layerX - g_canvas.offsetLeft -8;
     y = ev.layerY - g_canvas.offsetTop -8;
   }

   if (g_gameState == "instructions")
   {
      if ( x > 370 && x < 370+150 && y > 290 && y < 290+30 )
      {
         if (this.dink)
         {
            g_dinkSound.play();
            this.dink = false;
         }
         g_context.strokeStyle = "white";
         g_context.strokeRect(370,290,150,30);
         g_context.fillStyle = "white";
         g_context.fillText("OK",425,312);
      }
      else
      {
         this.dink = true;
         g_context.fillStyle = "black";
         g_context.fillRect(370,290,150,30);
         g_context.strokeStyle = "gray";
         g_context.strokeRect(370,290,150,30);
         g_context.fillStyle = "gray";
         g_context.fillText("OK",425,312);
      }
      

      return;
   }

   var neither = true;

   if ( x > 50 && x < 200 && y > 300 && y < 330 )
   {
      neither = false;
      if (this.dink)
      {
         g_dinkSound.play();
         this.dink = false;
      }
      g_context.fillStyle = "black";
      g_context.fillRect(50,300,150,30);
      g_context.strokeStyle = "white";
      g_context.strokeRect(50,300,150,30);
      g_context.fillStyle = "white";
      g_context.fillText("NEW GAME",73,322);

   }
   else
   {
      g_context.fillStyle = "black";
      g_context.fillRect(50,300,150,30);
      g_context.strokeStyle = "gray";
      g_context.strokeRect(50,300,150,30);
      g_context.fillStyle = "gray";
      g_context.fillText("NEW GAME",73,322);
   }

   if ( x > 50 && x < 200 && y > 340 && y < 370 )
   {
      neither = false;
      if (this.dink)
      {
         g_dinkSound.play();
         this.dink = false;
      }
      g_context.fillStyle = "black";
      g_context.fillRect(50,340,150,30);
      g_context.strokeStyle = "white";
      g_context.strokeRect(50,340,150,30);
      g_context.fillStyle = "white";
      g_context.fillText("INSTRUCTIONS",52,361);
   }
   else
   {
      g_context.fillStyle = "black";
      g_context.fillRect(50,340,150,30);
      g_context.strokeStyle = "gray";
      g_context.strokeRect(50,340,150,30);
      g_context.fillStyle = "gray";
      g_context.fillText("INSTRUCTIONS",52,361);
   }

   // render onscreen controls checkbox
   g_context.fillStyle = "black"; 
   g_context.fillRect(400,283,20,20); 

   if ( g_onscreenControls )
   {
      g_context.strokeStyle = "gray";
      g_context.beginPath();
      g_context.moveTo(400,283);
      g_context.lineTo(420,303);
      g_context.stroke();
      g_context.beginPath();
      g_context.moveTo(420,283);
      g_context.lineTo(400,303);
      g_context.stroke();
   }

   if ( x > 400 && x < 420 && y > 283 && y < 303 )
   {
      g_context.strokeStyle = "white";
      g_context.strokeRect(400,283,20,20);
   }
   else
   {
      g_context.strokeStyle = "gray";
      g_context.strokeRect(400,283,20,20);
   }

   if (neither)
      this.dink=true;

 
}
