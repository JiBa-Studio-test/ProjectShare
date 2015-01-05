var enemy: GameObject;
var spawn: boolean;
var minWaitTime: float;
var waitTime:float;
var maxEnemy:int;
function Start()
{
	
	if(maxEnemy == 0){
		maxEnemy = 10;
	}
	if(minWaitTime == 0){
		minWaitTime = 5;
	}
	spawn=true;
}

function FixedUpdate()
{
	if(spawn&&EnemyManagement.enemyManagement.enemyNumber<=maxEnemy)
	{
		Spawn();	
	}

}
function Spawn()
{
	var position: Vector2 = Vector2(transform.position.x+1+Random.Range(-1, 1),transform.position.y+1);
	Instantiate(enemy,position,transform.rotation);
	EnemyManagement.enemyManagement.enemyNumber++;
	WaitTime();
	spawn=false;
	SetSpawnWait();
}
function SetSpawnWait()
{
	yield WaitForSeconds(waitTime);
	spawn=true;
}
function WaitTime()
{
	waitTime=minWaitTime/EnemyManagement.enemyManagement.spawnRate;
	if(waitTime>20.0)
	{
		waitTime=20.0;
	}
}


