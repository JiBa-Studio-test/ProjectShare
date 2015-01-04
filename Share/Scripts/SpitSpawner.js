var spitPrefab: GameObject;
var timeOver: boolean;
var frequency: float;
var enemyStatus: EnemyStatus;
var _AI_monster2:AI_monster2;
function Start()
{
	timeOver=true;
	enemyStatus=transform.parent.GetComponent(EnemyStatus);
	_AI_monster2=transform.parent.GetComponent(AI_monster2);
	
}
function FixedUpdate()
{
	if(!_AI_monster2.enemyAction.detector.playerDetected)
	{
		_AI_monster2.attackLock=true;
	}
	if(timeOver&&(!_AI_monster2.attackLock)&&(!enemyStatus.isDead))
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
