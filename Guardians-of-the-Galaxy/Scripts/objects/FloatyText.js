
//FloatyText function to set the time for power up names
function FloatyText(text, x, y, duration)
{
   this.myText = text;
   this.myX = x;
   this.myY = y;
   this.myVelX = -1;
   this.myVelY = -1;

   this.myFrameCounter = 0;
   this.myDuration = 36;

   if ( duration != undefined )
      this.myDuration = duration;
}
//function to display the power up name for specific number of seconds
FloatyText.prototype.render = function()
{
   var textColor = this.myFrameCounter % g_rainbow.length;
   g_context.fillStyle = g_rainbow[textColor];

   g_context.font = "10pt Helvetica";
   g_context.fillText(this.myText, this.myX, this.myY);
   g_context.font = "14pt Helvetica";

   this.myX += this.myVelX;
   this.myY += this.myVelY;
   this.myFrameCounter++;

   if ( this.myFrameCounter > this.myDuration )
      return false;
   return true;
}
