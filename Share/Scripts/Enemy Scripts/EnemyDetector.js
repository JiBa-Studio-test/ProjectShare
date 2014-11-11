var playerDetected:boolean;
function Start()
{
	playerDetected=false;
}
function OnTriggerStay2D(other:Collider2D)
{
	
	if(other.tag=="Player")
	{
		playerDetected=true;
	}
	
}
function OnTriggerExit2D(other:Collider2D)
{
	
	if(other.tag=="Player")
	{
		playerDetected=false;
	}
	
}