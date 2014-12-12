//key down function for smooth scrolling
function keyDown(e)
{
   e.preventDefault();

   

   if ( e.keyCode == 80 )         // p
   {
      pause();
   }

   if (g_paused)
      return;

   if ( e.keyCode == 38 )              // up arrow
   {
      g_ship.up(true);
   }
   else if ( e.keyCode == 40 )         // down arrow
   {
      g_ship.down(true);
   }
   else if ( e.keyCode == 37 )         // left arrow
   {
      g_ship.left(true);
   }
   else if ( e.keyCode == 39 )         // right arrow
   {
      g_ship.right(true);
   }
   else if ( e.keyCode == 90 )         // z
   {
      g_ship.fire(true);
   }
}
//key-up function for smooth scrolling
function keyUp(e)
{
   e.preventDefault();

 

   if ( e.keyCode == 38 )              // up arrow
   {
      g_ship.up(false);
   }
   else if ( e.keyCode == 40 )         // down arrow
   {
      g_ship.down(false);
   }
   else if ( e.keyCode == 37 )         // left arrow
   {
      g_ship.left(false);
   }
   else if ( e.keyCode == 39 )         // right arrow
   {
      g_ship.right(false);
   }
   else if ( e.keyCode == 90 )         // z
   {
      g_ship.fire(false);
   }
}
