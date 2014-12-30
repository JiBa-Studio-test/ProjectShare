static var gameManagement: GameManagement;
var points:int;
var crystalNum:int;
var fire:GameObject;
var defaultATKForFires:int;
var defaultSPDForFires:float;
var pauseButton:GameObject;

var rankings : int[] = new int[10];
var rankingNO : int;

function Start()
{
	gameManagement=this;
	rankings = [10000,8000,7000,6000,5000,4000,3000,2000,1000,500];//the initial ranking
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

function SortPoints()//resort the points for ranking after death
{	
	var rankingSet :boolean;
	for(var i=1;i<=10;i++)
	{
		rankings[i] = PlayerPrefs.GetInt("ranking"+i,rankings[i]);
		if(rankings[i]<points && !rankingSet)
		{
			rankingNO=i;
			for(var j=10;j>i;j--)
			{
				rankings[j]=rankings[j-1];
				rankingSet=true;
			}
			rankings[i]=points;
			
			PlayerPrefs.SetInt("ranking"+i,rankings[i]);
		}
	}
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
	Application.LoadLevel(0);
	Time.timeScale=1;
}

function GetRanking()
{
	SortPoints();
	return rankings;
}