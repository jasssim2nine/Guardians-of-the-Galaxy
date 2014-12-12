//starts the game time
function Sortie(launchTime)
{
 this.myLaunchTime = launchTime;
 this.myComponents = new Array();
 this.myLaunched = false;
}
//function to add enemies
Sortie.prototype.add = function(id, x, y, velx, vely)
{
 this.myComponents.push(new Enemy(id, x, y, velx, vely));
}
//function to sort enemies once the game is launched
Sortie.prototype.launch = function()
{
 if ( this.myLaunched )
	return;

 var i;

 for (i = 0; i < this.myComponents.length; ++i )
	g_enemies.push(this.myComponents[i]);

 this.myLaunched = true;

 return this.myComponents[i-1];
}
