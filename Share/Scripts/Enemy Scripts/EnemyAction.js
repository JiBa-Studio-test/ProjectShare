var player:GameObject;
var distance:float;
var isRight:boolean;
var offset:float;
var ScaleX:float;
var detector:EnemyDetector;
var enemyStatus:EnemyStatus;
var speed : float;
var dumbTime:float;
var movable: boolean;
var pushingForce:float;

function Start () 
{
	player=GameObject.FindGameObjectWithTag("Player");
	detector=GetComponentInChildren(EnemyDetector);
	enemyStatus = GetComponent(EnemyStatus)as EnemyStatus;
	//offset=0.4;
	speed = enemyStatus.speed;
	//dumbTime=0.15;
	ScaleX=transform.localScale.x;
	movable=true;
	//pushingForce=7;
}

function FixedUpdate () 
{
	if(movable)
	{
		if(detector.playerDetected)
		{
			FollowMove();
		}
	}
	DeathDetection();
}
function FollowMove()//following movement for enemy
{
	distance=player.transform.position.x-transform.position.x;
	if(distance<-offset)
	{
		isRight=true;
		GoLeft();
	}
	if(distance>offset)
	{
		isRight=false;
		GoRight();
	}
	if(distance>=-offset&&distance<=offset)
	{
		if(isRight)
		{
			GoLeft();
		}
		if(!isRight)
		{
			GoRight();
		}
	}
}
function GoLeft()
{
	transform.localScale.x=-ScaleX;
	transform.position+=Vector3.left*speed*Time.deltaTime;
}
function GoRight()
{
	transform.localScale.x=ScaleX;
	transform.position+=Vector3.right*speed*Time.deltaTime;
}





function Damage(ATK:int,vector:Vector2)
{
	enemyStatus.HP-=ATK;
	if(enemyStatus.HP<=0)
	{
		enemyStatus.HP=0;
	}
	//activate the damaged animation here
	Stop();
	PushEnemy(vector*pushingForce);
}
function DeathDetection()
{
	if(enemyStatus.HP<=0)
	{
		movable=false;
		//activate the death animation here
		//this method(BeKilled) could be invoked at the end of animation
		BeKilled();
	}
}
function Stop()
{
	movable=false;
	StopTime(dumbTime);
}

function StopTime(time:float)
{
	yield WaitForSeconds(time);
	movable=true;
	//inactivative the damaged animation here;
}
function BeKilled()
{
	EnemyManagement.enemyManagement.enemyNumber--;
	Destroy(gameObject);
}
function PushEnemy(vector:Vector2)
{
	rigidbody2D.AddForce(vector*pushingForce);
}

