import System.Collections.Generic;
static var enemyManagement: EnemyManagement;
var spawnerList : List.<GameObject>;
var spawnerLocation:Transform[];
var isVacant:boolean[];

var enemyFactor:float;
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
	enemyFactor=1;
	isVacant=new boolean[spawnerLocation.length];
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
	for(var x:int; x<isVacant.Length;x++)
	{
		isVacant[x]=true;
	}
	for(var i:int; i<spawnerList.Count;i++)
	{
		spawnerList[i].transform.position=spawnerLocation[i].position;
		isVacant[i]=false;
		spawnerList[i].GetComponent(EnemySpawnerDamage).location=i;
	}
}
function FixedUpdate()
{
	SetSpawnRate();
	CallPanel();
	UpdateEnemy();
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
			if((spawnerDestroyed)%5==0&&(spawnerDestroyed!=0))
			{
				callLock=spawnerDestroyed;
				weaponPanel.transform.localPosition=Vector2(160,-50);
				GameManagement.gameManagement.PauseOrResume();
			}
		}
}

function RemovePanel()
{
	GameManagement.gameManagement.PauseOrResume();
	weaponPanel.transform.position=Vector2(10000,0);
}
function ClearSpawner(location:int)
{
	isVacant[location]=true;
}
function Respawn(ID:int)
{
	var num:int;
	num=Random.Range(0,isVacant.Length);
	while(!isVacant[num])
	{
		num=Random.Range(0,isVacant.Length);
	}
	spawnerList[ID].transform.position=spawnerLocation[num].position;
	isVacant[num]=false;
	spawnerList[ID].GetComponent(EnemySpawnerDamage).location=num;
	SpawnerWait(ID);
}
function SpawnerWait(ID:int)
{
	yield WaitForSeconds(3.0);
	spawnerList[ID].SetActive(true);
	spawnerList[ID].GetComponent(EnemySpawnerDamage).RespawnFlash();
	
}

function UpdateEnemy()
{
	enemyFactor=spawnerDestroyed+0.1*(spawnerDestroyed-1);
}