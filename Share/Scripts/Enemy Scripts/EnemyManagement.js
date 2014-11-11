static var enemyManagement: EnemyManagement;
var spawnRate:float;
var enemyNumber:int;
function Awake()
{
	enemyManagement=this;
}
function Start()
{
	enemyNumber=0;
	SetSpawnRate();
}
function Update()
{
	SetSpawnRate();
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
