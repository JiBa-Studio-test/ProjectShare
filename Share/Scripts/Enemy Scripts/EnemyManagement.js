import System.Collections.Generic;
static var enemyManagement: EnemyManagement;
var spawnerList : List.<GameObject>;
var spawnRate:float;
var enemyNumber:int;
var weaponPanel:GameObject;

var spawnerDestroyed:int;
var callLock:int;
function Awake()
{
	enemyManagement=this;
}
function Start()
{
	callLock=-1;
	enemyNumber=0;
	spawnerDestroyed=0;
	SetSpawnRate();
	spawnerList=new List.<GameObject>();
	for(var child1:Transform in transform)//scan all childern
	{
		if(child1.gameObject.name=="Spawners")
		{
			for(var child2:Transform in child1.transform)//scan all childern
			{
				spawnerList.Add(child2.gameObject);
			}
		}
	}
}
function FixedUpdate()
{
	SetSpawnRate();
	CallPanel();
}
function SetSpawnRate()
{
	if(enemyNumber<=5)
	{
		spawnRate=1;
	}
	else
	{
		spawnRate=1.0*Mathf.Pow(0.6,(enemyNumber-5)/2);
	}
}

function CallPanel()
{
		if(callLock!=spawnerDestroyed)
		{
			if((spawnerDestroyed)%2==0&&(spawnerDestroyed!=0))
			{
				callLock=spawnerDestroyed;
				weaponPanel.transform.position=Vector2(0,0);
				Time.timeScale=0;
				GameStatus.Game.gamePause=true;
			}
		}
}