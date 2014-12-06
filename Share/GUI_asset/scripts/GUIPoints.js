#pragma strict
var playTween:UIPlayTween;
var timeOver:boolean=false;
var label:UILabel;
var currentPoints:int;
function Start()
{
	currentPoints=GameManagement.gameManagement.points;
	GetComponent(UILabel);
	label.text="Points: "+"0";
}
function FixedUpdate() 
{
		
		label.text="Points: "+GameManagement.gameManagement.points.ToString();
		if(currentPoints!=GameManagement.gameManagement.points)
		{
			Active();
			currentPoints=GameManagement.gameManagement.points;
		}
}

function Active()
{
	playTween.Play(true);
	TimeWaiting();
}
function TimeWaiting()
{
	yield WaitForSeconds(0.2);
	playTween.Play(false);
}
