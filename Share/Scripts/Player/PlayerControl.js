#pragma strict

//To get the scripts or objects
var status : PlayerStatus;//all the parameters about player refer to PlayerStatus
var animator : Animator;
var character : Transform;
var rightArm : GameObject;
var fireSpawner : FireSpawner;
var animatorState : AnimatorStateInfo;
var spriteRenderer: SpriteRenderer;
//enable parameters
var enableControl : boolean;//Enable the control from Input
var enableAttack : boolean;//Enable Attack
var initArmAngle : float;//the required angle to adjust gun to horizon
var angle : float;//the angle to fire
var maxShootingAngle : float;//maximum angle allowed to rotate the arm
var minShootingAngle : float;//minimum angle allowed to rotate the arm
var speedRate : float;

//set actions
var isRunning : boolean;
var runToRight : boolean;
var isAttacking : boolean;
var pushingForce:float;
//var vector:Vector2;
var damageBlock:boolean;
var noDamageTime:float;
var dumbTime:float;
//raycast
var platformMask: LayerMask;
var origin:Vector2;
var distance:float;
var direction:Vector2;
var boxCollider:BoxCollider2D;
var standingOn:GameObject;
var lastStandingOn:GameObject;
var activeGlobalPlatformPoint:Vector3;
var activeLocalPlatformPoint:Vector3;
function Awake () {
	initArmAngle = 19.0;//the initial difference of angle between arm and horizon
	fireSpawner = GameObject.FindGameObjectWithTag("PlayerFireSpawner").gameObject.GetComponent("FireSpawner") as FireSpawner;
	boxCollider=GetComponent("BoxCollider2D");
	//spriteRenderer=GetComponentInChildren(SpriteRenderer);
	
}
function Start () {
	status = GetComponent("PlayerStatus") as PlayerStatus;//get status
	rightArm = GameObject.FindGameObjectWithTag("RightArm");//get gun
	damageBlock=false;
	if(noDamageTime==1)
	{
		noDamageTime=1;
	}
	if(dumbTime==0.2)
	{
		dumbTime=0.2;
	}
	//get animator and character
	for(var child : Transform in transform as Transform)
	{
		if(child.tag == "Character")
		{
			character = child;//get character
			animator = child.gameObject.GetComponent("Animator") as Animator;//get animator
		}
		/**
		if(child.tag == "playerFireSpawner")
		{
			fireSpawner = child.gameObject.GetComponent("FireSpawner") as FireSpawner;//get fire spawner
		}
		**/
	}

	//enable control
	enableControl = true;
	enableAttack = true;
	
	//initialize parameters
	if(maxShootingAngle == 0.0)
	{
		maxShootingAngle = 45.0;
	}
}


function FixedUpdate(){
	/***
	 **Character Control
	***/
	if(enableControl)
	{
			//running
			if(isRunning)
			{
				if(!runToRight)
				{
					Run(false);
				}
				
				else if(runToRight)//run towards right
				{
					Run(true);
				}
			}
			else if(!isRunning)
			{
				if(animator.GetBool("isRunning"))
				{
					animator.SetBool("isRunning",false);
				}
			}
			
	}
	CalculateRayOrigins();
	HandlePlatforms();
	StandingHandler();
}


//Function RUN
function Run(runToRight : boolean)
{
	if(!runToRight)//run towards left
	{
		if(status.faceToRight)//change direction in character
		{
			character.gameObject.SendMessage("SetFaceDirection",false);
			status.faceToRight = false;
		}
		animator.SetBool("isRunning",true);
		animator.SetFloat("speedRate",speedRate);
		transform.position += Vector3.left * status.speed *speedRate* Time.deltaTime;
	}
	else if(runToRight)//run towards right && not attacking
	{
		if(!status.faceToRight)//change direction in character
		{
			character.gameObject.SendMessage("SetFaceDirection",true);
			status.faceToRight = true;
		}
		animator.SetBool("isRunning",true);
		animator.SetFloat("speedRate",speedRate);
		transform.position += Vector3.right * status.speed *speedRate* Time.deltaTime;
		//Debug.Log(animator.GetCurrentAnimatorStateInfo(0).nameHash == animator.StringToHash("Base Layer.run"));
	}
}


//Function JUMP
function Jump()
{
	if(animator.GetBool("isJumping") == false)
			{
				
				rigidbody2D.AddForce(Vector3.up * status.jumpHeight);
				animator.SetBool("isJumping", true);
			}
}

function ArmRotate(rotateAngle : float)
{
	if(rotateAngle>=maxShootingAngle){
		rotateAngle = maxShootingAngle;
	}
	else if(rotateAngle<=-minShootingAngle){
		rotateAngle = -minShootingAngle;
	}
	angle = rotateAngle;
	var angleToHorizon=initArmAngle+rotateAngle;//the angle of arm refer to horizon
	rightArm.transform.rotation = Quaternion.Euler(0,0,angleToHorizon);
}

function ArmDown()//invoked when button and joystick released(idle)
{
	rightArm.transform.rotation = Quaternion.Euler(0,0,0);
	angle=0;
}
//Function Attack
function Attack()
{
	
	if(enableAttack)
	{
		if(angle == 0){
			ArmRotate(0);
		}
		
		if(animator.GetBool("isAttacking") == false)
		{
			animator.SetBool("isAttacking",true);
			isAttacking = true;
		}
		if(status.faceToRight)
		{
			fireSpawner.Attack(angle);
		}
		else
		{
			fireSpawner.Attack(180-angle);
		}
		
	}
}
function AttackEnd()
{

		animator.SetBool("isAttacking",false);
		isAttacking = false;

	ArmDown();
}
//When collision occurs

function PushPlayer(vector:Vector2)
{
	rigidbody2D.AddForce(vector*pushingForce);
}

function Damage(ATK:int,vector:Vector2)
{
	if(!damageBlock&&!animator.GetBool("isDead"))
	{
		damageBlock=true;
		status.HP-=ATK;
		if(status.HP<=0)
		{
			status.HP=0;
			Die();// die when HP=0;
		}
		else
		{
		PushPlayer(vector*pushingForce);
		Stop();
		TimeForNoDamage();
		}
	}
}

function Die()
{
	enableControl=false;
	animator.SetBool("isDead",true);
	ShowRankingPanel();
	
}
function Stop()
{
	enableControl=false;
	animator.SetBool("getDamaged",true);
	StopTime(dumbTime);
}

function ShowRankingPanel()
{
	GameManagement.gameManagement.SetRanking();
	GameManagement.gameManagement.rankingPanel.transform.localPosition=Vector2(0,0);
	GameManagement.gameManagement.PauseOrResume();
}

function StopTime(time:float)
{
	yield WaitForSeconds(time);
	animator.SetBool("getDamaged",false);
	enableControl=true;
	//inactivative the damaged animation here;
}
function TimeForNoDamage()
{
	
	var startingTime=Time.time;
	do
	{
		for(var i:float=1;i<=5;i++)
		{	
			yield WaitForSeconds(0);
			spriteRenderer.color=Color.Lerp(Color.white,Color.red,i/5.0);
		}
		for(var p:float=1;p<=5;p++)
		{
			yield WaitForSeconds(0);
			spriteRenderer.color=Color.Lerp(Color.red,Color.white,p/5.0);
		}
	}
	while((Time.time-startingTime)<noDamageTime);
	damageBlock=false;
}

function OnCollisionEnter2D(other:Collision2D)
{
	if(other.collider.tag=="Ground")
	{
		if(rigidbody2D.velocity.y<=0)
		{
			animator.SetBool("isJumping", false);
		}
	}
}
function CalculateRayOrigins()
{
	var size:Vector2=Vector2(boxCollider.size.x*Mathf.Abs(transform.localScale.x),boxCollider.size.y*Mathf.Abs(transform.localScale.y))/2;
	var center:Vector2=Vector2(boxCollider.center.x*transform.localScale.x,boxCollider.center.y*transform.localScale.y);
	origin=transform.position+Vector3(0,center.y-size.y);
}
function HandlePlatforms()
{
	direction=-Vector2.up;
	if(rigidbody2D.velocity.y<=0)
	{
		Debug.DrawRay(origin,direction*0.2,Color.yellow);
		var raycastHit=Physics2D.Raycast(origin,direction,0.2,platformMask);
	}
	if(rigidbody2D.velocity.y<=0)
	{
		if(raycastHit)
		{
			standingOn=raycastHit.collider.gameObject;
		}
	}
	if(standingOn!=null)
	{
		if(lastStandingOn!=standingOn)
		{
			activeGlobalPlatformPoint=transform.position;
			activeLocalPlatformPoint=standingOn.transform.InverseTransformPoint(transform.position);
		}
		var newGlobalPlatformPoint:Vector3=standingOn.transform.TransformPoint(activeLocalPlatformPoint);
		var movingDistance:Vector3=newGlobalPlatformPoint-activeGlobalPlatformPoint;
		if(movingDistance!=Vector3.zero)
		{
			transform.Translate(movingDistance,Space.World);
		}
	}
	if(!raycastHit)
	{
			standingOn=null;
	}
	
}
function StandingHandler()
{
	if(standingOn!=null)
	{
		activeGlobalPlatformPoint=transform.position;
		activeLocalPlatformPoint=standingOn.transform.InverseTransformPoint(transform.position);
		if(lastStandingOn!=standingOn)
		{
			if(lastStandingOn!=null)
			{
				lastStandingOn.SendMessage("ControllerExit2D",this,SendMessageOptions.DontRequireReceiver);
			}
			standingOn.SendMessage("ControllerEnter2D",this,SendMessageOptions.DontRequireReceiver);
			lastStandingOn=standingOn;
		}
		else if(standingOn!=null)
		{
			standingOn.SendMessage("ControllerStay2D",this,SendMessageOptions.DontRequireReceiver);
		}
		
		
	}
	else if(lastStandingOn!=null)
	{
		lastStandingOn.SendMessage("ControllerExit2D",this,SendMessageOptions.DontRequireReceiver);
		lastStandingOn=null; 
	}
}

