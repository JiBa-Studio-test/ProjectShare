#pragma strict

var enemyPrefab : GameObject;
var enemySpawned : int = 0;
var spawn : boolean;
var minTime : float;
var maxTime : float;
var randomSpawnRange : float;


function Start () {

}

function FixedUpdate () {
	if(spawn)
	{
		Spawn();
	}
}

function Spawn(){
	//calculate the random position to spawn
	var position : Vector2 = Vector2(transform.position.x+Random.Range(-randomSpawnRange, randomSpawnRange),transform.position.y);
	//instantiate an enemy
	Instantiate(enemyPrefab, position, transform.rotation);
	//increase the number of enemies
	enemySpawned += 1;
	spawn = false;
	Wait(Random.Range(minTime,maxTime));
}

function Wait(sec : float)
{
	yield WaitForSeconds(sec);
	spawn = true;
}