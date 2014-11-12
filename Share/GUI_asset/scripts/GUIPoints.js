#pragma strict
var playTween:UIPlayTween;
var timeOver:boolean=false;
var label:UILabel;
var currentPoints:int;
function Start()
{
	currentPoints=GameManagement.points;
	GetComponent(UILabel);
	label.text="Points: "+"0";
}
function Update() 
{
		
		label.text="Points: "+GameManagement.points.ToString();
		if(currentPoints!=GameManagement.points)
		{
			Active();
			currentPoints=GameManagement.points;
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
