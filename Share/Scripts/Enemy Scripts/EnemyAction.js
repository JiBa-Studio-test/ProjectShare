//get from other objects
var detector:EnemyDetector;
var enemyStatus:EnemyStatus;
var animator:Animator;
//basic parameters
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
	detector=GetComponentInChildren(EnemyDetector);
	enemyStatus = GetComponent(EnemyStatus)as EnemyStatus;
	animator = GetComponentInChildren(Animator);
	//offset=0.4;
	speed = enemyStatus.speed;
	//dumbTime=0.15;
	movable=true;
	//pushingForce=7;
}

function FixedUpdate () 
{
	if(movable)
	{
		if(detector.playerDetected)
		{
			gameObject.SendMessage("AIActionToPlayer",SendMessageOptions.DontRequireReceiver);
		}
		else
		{
			//animator.SetBool("isRunning",false);
			//invoke the random idle path here when player is undetected
			gameObject.SendMessage("RandomMove",SendMessageOptions.DontRequireReceiver);
		}
	}
	//go dead if HP<=0
	if(enemyStatus.HP<=0)
	{
		Die();
	}
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
	//fatal attack
	if(enemyStatus.HP==0)
	{
		rigidbody2D.fixedAngle=false;
		vector.y=5;
		rigidbody2D.AddForce(vector*pushingForce*7);
	}
}
function PointsToAdd()
{
	GameManagement.gameManagement.points+=enemyStatus.bonus;
}
