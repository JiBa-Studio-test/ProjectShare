static var gameManagement_2: GameManagement_2;
var allRankings: List.<GameObject>;
var rankings : int[] = new int[10];
var rankingNO : int=0;
var rankingPanel:GameObject;
var aboutPanel:GameObject;

var buttonSound:AudioSource;
function Start()
{
	buttonSound=GetComponent(AudioSource);
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
	gameManagement_2=this;
	rankings = [10000,8000,7000,6000,5000,4000,3000,2000,1000,1];
}

function GetPoints()//resort the points for ranking after death
{	
	for(var i=1;i<=10;i++)
	{
		rankings[i-1] = PlayerPrefs.GetInt("ranking"+i,rankings[i-1]);
	}
}

function Restart()
{
	Application.LoadLevel(0);
	Time.timeScale=1;
}

function MainMenu()
{
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
	GetPoints();
	for(var i=0;i<10;i++)
	{	
		allRankings[i].GetComponent(UILabel).text=rankings[num].ToString();
		num++;
	}
	rankingPanel.transform.localPosition=Vector2(-91,0);
	
}

function About()
{
	aboutPanel.transform.localPosition=Vector2(-91,0);

}

function PlaySound()
{
	buttonSound.Play();
}
