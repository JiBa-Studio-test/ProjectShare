#pragma strict
var playTween:UIPlayTween;
var timeOver:boolean=false;
var label:UILabel;
var currentCount:int;
function Start()
{
	currentCount=EnemyManagement.enemyManagement.spawnerDestroyed;
	GetComponent(UILabel);
	label.text="Spawner: "+"0"+"/"+EnemyManagement.enemyManagement.requiredSpawners;
}
function SetSpawnerText() 
{
		label.text="Spawner: "+EnemyManagement.enemyManagement.spawnerDestroyed.ToString()+"/"+((EnemyManagement.enemyManagement.spawnerDestroyed/EnemyManagement.enemyManagement.requiredSpawners+1)*EnemyManagement.enemyManagement.requiredSpawners).ToString();
		if(currentCount!=EnemyManagement.enemyManagement.spawnerDestroyed)
		{
			Active();
			currentCount=EnemyManagement.enemyManagement.spawnerDestroyed;
		}
}

function Active()
{
	playTween.Play(true);
	TimeWaiting();
}
function TimeWaiting()
{
	yield WaitForSeconds(0.2);
	playTween.Play(false);
}
