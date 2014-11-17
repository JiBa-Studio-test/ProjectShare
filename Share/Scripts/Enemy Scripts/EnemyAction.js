//get from other objects
var player:GameObject;
var detector:EnemyDetector;
var enemyStatus:EnemyStatus;
var animator:Animator;
//basic parameters
var disToPlayer:float;
var offset:float;
var ScaleX:float;
var speed : float;
var dumbTime:float;
var pushingForce:float;
var isRight:boolean;
//enable
var movable: boolean;

function Awake()
{
}
function Start () 
{
	player=GameObject.FindGameObjectWithTag("Player");
	detector=GetComponentInChildren(EnemyDetector);
	enemyStatus = GetComponent(EnemyStatus)as EnemyStatus;
	animator = GetComponentInChildren(Animator);
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
		else
		{
			animator.SetBool("isRunning",false);
			//invoke the random idle path here when player is undetected
		}
	}
	//go dead if HP<=0
	if(enemyStatus.HP<=0)
	{
		Die();
	}
}
function FollowMove()//following movement for enemy
{
	animator.SetBool("isRunning",true);
	distance=player.transform.position.x-transform.position.x;
	if(distance<-offset)
	{
		isRight=true;
		enemyStatus.faceToRight=false;
		GoLeft();
	}
	if(distance>offset)
	{
		isRight=false;
		enemyStatus.faceToRight=true;
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
function Die()
{
		movable=false;
		//activate the death animation here
		//this method(BeKilled) could be invoked at the end of animation
		if(!enemyStatus.isDead)
		{
			animator.SetBool("isDead",true);
			GetComponent(BoxCollider2D).enabled = false;
			enemyStatus.isDead=true;
		}
}
function Stop()
{
	animator.SetBool("getDamaged",true);
	movable=false;
	StopTime(dumbTime);
}

function StopTime(time:float)
{
	yield WaitForSeconds(time);
	animator.SetBool("getDamaged",false);
	movable=true;

	//inactivative the damaged animation here;
}
function BeKilled()
{
	PointsToAdd();
	EnemyManagement.enemyManagement.enemyNumber--;
	Destroy(gameObject);
}
function PushEnemy(vector:Vector2)
{
	rigidbody2D.AddForce(vector*pushingForce);
}
function PointsToAdd()
{
	GameManagement.points+=enemyStatus.bonus;
}
