var enemy: GameObject;
var spawn: boolean;
var waitTime: float;

function Start()
{
	if(waitTime == 0){
		waitTime = 2;
	}
	spawn=true;
}

function FixedUpdate()
{
	if(spawn)
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
	waitTime=waitTime/EnemyManagement.enemyManagement.spawnRate;
}


