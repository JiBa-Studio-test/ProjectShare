var spitPrefab: GameObject;
var timeOver: boolean;
var frequency: float;
var enemyStatus: EnemyStatus;
function Start()
{
	timeOver=true;
	enemyStatus=transform.parent.GetComponent(EnemyStatus);
	
}
function Update()
{
	if(timeOver)
	{
		Spawn();	
	}
}
function Spawn()
{
	timeOver=false;
	var position: Vector3 = Vector3(transform.position.x,transform.position.y,transform.position.z);
	var spitInstance : GameObject = Instantiate(spitPrefab,position,transform.rotation);
	if(!enemyStatus.faceToRight)
	{
		spitInstance.GetComponent(Spit).velocity.x=-spitInstance.GetComponent(Spit).velocity.x;
	}
	TimeWaiting();	
}
function TimeWaiting()
{
	yield WaitForSeconds(1.0/frequency);
	timeOver=true;
}
