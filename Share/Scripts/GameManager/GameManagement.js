static var gameManagement: GameManagement;
var points:int;
var crystalNum:int;
var fire:GameObject;
var defaultATKForFires:int;
var defaultSPDForFires:float;
var pauseButton:GameObject;
function Start()
{
	gameManagement=this;
	Reset();
}

function Reset()
{
	points=0;
	fire.GetComponent(Fires).ATK=defaultATKForFires;
	fire.GetComponent(Fires).frequency=defaultSPDForFires;
	//GameStatus.Game.gamePause=false;
	
}

function AddPoints(pointsToAdd:int)
{
	points+=pointsToAdd;
}

function DeductPoints(pointsToDeduct:int)
{
	points-=pointsToDeduct;
}

function SetPoints(points:int)
{
	this.points=points;
}

function AddCrystalNum(numToAdd:int)
{
	crystalNum+=numToAdd;
}

function DeductCrystalNum(numToDeduct:int)
{
	crystalNum-=numToDeduct;
}

function SetCrystalNum(num:int)
{
	crystalNum=num;
}

function PauseOrResume()
{
	if(GameStatus.Game.gamePause)
	{
		Time.timeScale=1;
		GameStatus.Game.gamePause=false;
		pauseButton.SetActive(true);
	}
	else
	{
		Time.timeScale=0;
		GameStatus.Game.gamePause=true;
		pauseButton.SetActive(false);
	}	
}

function Restart()
{
	GameManagement.gameManagement.Reset();
	Application.LoadLevel(2);
	Time.timeScale=1;
}