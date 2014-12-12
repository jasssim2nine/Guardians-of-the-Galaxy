function Sound(name, multi)
{
   if ( g_soundDataMap[name] == undefined )
   {
      dbg(" " + name, false);
      return;
   }

   if ( multi == undefined || multi < 2 || multi == null)
   {
      dbg(" " + name, false);
      multi = 2;
   }

   this.myName = name;
   this.myInstanceArray = new Array();
   this.myNumInstances = multi;
   this.myLastInstancePlayed = null;
   this.myInstanceIndex = 0;

   for ( var i = 0; i < this.myNumInstances; ++i )
   {
      this.myInstanceArray[i] = new Audio();
      this.myInstanceArray[i].src = g_soundDataMap[name];  // base64 encoded ogg
      this.myInstanceArray[i].load();
   }
}

//
// Sound member functions
//
Sound.prototype.play = function()
{
   if ( g_isChr)
   {
      this.playChr();
      return;
   }

   this.myInstanceArray[this.myInstanceIndex].play();

   this.myInstanceIndex++;
   if ( this.myInstanceIndex >= this.myNumInstances)
   {
      this.myInstanceIndex = 0;
   }
}

//repeats the background sound
Sound.prototype.playChr= function()
{
   var played = false;
   var loaded = false;

   for ( var i = 0; i < this.myNumInstances; ++i)
   {
 
      if ( this.myInstanceArray[i].readyState != 4)
         continue;

      if (( this.myInstanceArray[i].ended == false ) &&
          ( this.myInstanceArray[i].currentTime == 0 ))
      {
         if ( !played )
         {
            
            this.myInstanceArray[i].play();
            this.myLastInstancePlayed = i;
            played = true;
         }
      }
   }

   for ( var i = this.myLastInstancePlayed;  i >= 0; --i)
   {
      if ( this.myInstanceArray[i].ended == true )
      {
         if ( !loaded )
         {
            this.myInstanceArray[i].load();
            loaded = true;
         }
      }
   }

   if (!loaded)
   {
      for ( var i = this.myNumInstances-1;  i > this.myLastInstancePlayed; --i)
      {
         if ( this.myInstanceArray[i].ended == true )
         {
            if ( !loaded )
            {
               this.myInstanceArray[i].load();
               loaded = true;
            }
         }
      }
   }


}

function isChr()
{
   

   if (navigator.userAgent.indexOf('AppleWebKit') != -1)
      g_isChr= true;
   else
      g_isChr= false;
}
