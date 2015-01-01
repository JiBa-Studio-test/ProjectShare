static var gameManagement: GameManagement;
var points:int;
var crystalNum:int;
var fire:GameObject;
var defaultATKForFires:int;
var defaultSPDForFires:float;
var pauseButton:GameObject;
var rankingPanel:GameObject;
var UI:GameObject;

var allRankings: List.<GameObject>;
var rankings : int[] = new int[10];
var rankingNO : int=0;

function Start()
{
	allRankings=new List.<GameObject>();
	for(var child1:Transform in rankingPanel.transform)//scan all childern
	{
		if(child1.gameObject.tag=="RANK")
		{
			for(var child2:Transform in child1.transform)//scan all childern
			{
				allRankings.Add(child2.gameObject);
			}
		}
	}
	gameManagement=this;
	rankings = [10000,8000,7000,6000,5000,4000,3000,2000,1000,1];//the initial ranking
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
		rankings[i-1] = PlayerPrefs.GetInt("ranking"+i,rankings[i-1]);
		if(rankings[i-1]<=points && !rankingSet)
		{
			rankingNO=i; //the ranking
			for(var j=10;j>i;j--)
			{
				rankings[j-1]=rankings[j-2];
			}
			rankingSet=true;
			rankings[i-1]=points;
			
			PlayerPrefs.SetInt("ranking"+i,rankings[i-1]);
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

function MainMenu()
{
	GameManagement.gameManagement.Reset();
	Application.LoadLevel(1);
	Time.timeScale=1;

}
/*
function GetRanking():int[]
{
	SortPoints();
	return rankings;
}
*/

function  SetRanking()
{
	var num:int=0;
	SortPoints();
	for(var i=0;i<10;i++)
	{	
		allRankings[i].GetComponent(UILabel).text=rankings[num].ToString();
		num++;
	}
}

function RankingColor()
{
	if(rankingNO!=0)
	{
		while(true)
		{
			for(var i:float=1;i<=10;i++)
			{	
				yield WaitForSeconds(0.05);
				allRankings[rankingNO-1].GetComponent("UILabel").color=Color.Lerp(Color.yellow,Color.red,i/10.0);
			}
			for(var p:float=1;p<=10;p++)
			{
				yield WaitForSeconds(0.05);
				allRankings[rankingNO-1].GetComponent("UILabel").color=Color.Lerp(Color.red,Color.yellow,p/10.0);
			}
		}
	}
}
