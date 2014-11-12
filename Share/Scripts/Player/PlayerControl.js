#pragma strict

//To get the scripts or objects
var status : PlayerStatus;//all the parameters about player refer to PlayerStatus
var animator : Animator;
var character : Transform;
var rightArm : GameObject;
var fireSpawner : FireSpawner;
var animatorState : AnimatorStateInfo;
//enable parameters
var enableControl : boolean;//Enable the control from Input
var enableAttack : boolean;//Enable Attack
var initArmAngle : float;
var shootingAngle : float;//from 0 to 90
var speedRate : float;
//set actions
var isRunning : boolean;
var runToRight : boolean;
var isAttacking : boolean;

function Awake () {
	fireSpawner = GameObject.FindGameObjectWithTag("PlayerFireSpawner").gameObject.GetComponent("FireSpawner") as FireSpawner;
}
function Start () {
	status = GetComponent("PlayerStatus") as PlayerStatus;//get status
	rightArm = GameObject.FindGameObjectWithTag("RightArm");//get gun
	
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
	initArmAngle = rightArm.transform.rotation.eulerAngles.z;
	
	//initialize parameters
	if(shootingAngle == 0.0)
	{
		shootingAngle = 45.0;
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
			
			//jumping
			if(Input.GetKey(KeyCode.Space))
			{
				Jump(status.jumpHeight);
			}
			
			//attacking
			/**
			if(Input.GetKey(KeyCode.Z))
			{
				if(enableAttack)
				{
					Attack();
				}
			}
			else
			{
				AttackEnd();
			}
			**/
	}
}


//Function RUN
function Run(runToRight : boolean)
{
	if(!runToRight)//run towards left
	{
		if(status.faceToRight && !isAttacking)//change direction in character when not attacking
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
		if(!status.faceToRight && !isAttacking)//change direction in character when not attacking
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
function Jump(height : float)
{
	if(animator.GetBool("isJumping") == false)
			{
				rigidbody2D.AddForce(Vector3.up * height);
				animator.SetBool("isJumping", true);
			}
}

//Function Attack
function Attack(angle : float, attackToRight : boolean)
{
	if(enableAttack)
	{
		if(animator.GetBool("isAttacking") == false)
		{
			animator.SetBool("isAttacking",true);
			isAttacking = true;
		}
		if(attackToRight)
		{
			if(!status.faceToRight)
			{
				character.gameObject.SendMessage("SetFaceDirection",true);
				status.faceToRight = true;
			}
			if(angle>shootingAngle)//set the effective angle
			{
				angle = shootingAngle;
			}
			else if(angle<-shootingAngle)
			{
				angle = -shootingAngle;
			}
			rightArm.transform.rotation = Quaternion.Euler(0,0,angle);
			fireSpawner.Attack(angle);
			//Debug.Log("angle:"+angle+" arm:"+rightArm.transform.eulerAngles);
		}
		else
		{
			angle = -angle;
			if(status.faceToRight)
			{
				character.gameObject.SendMessage("SetFaceDirection",false);
				status.faceToRight = false;
			}
			if(angle>shootingAngle)//set the effective angle
			{
				angle = shootingAngle;
			}
			else if(angle<-shootingAngle)
			{
				angle = -shootingAngle;
			}
			rightArm.transform.rotation = Quaternion.Euler(0,0,angle);
			fireSpawner.Attack(180-angle);
			//Debug.Log("angle:"+angle+" arm:"+rightArm.transform.eulerAngles);
		}
		
	}
}
function AttackEnd()
{
	if(animator.GetBool("isAttacking"))
	{
		animator.SetBool("isAttacking",false);
		isAttacking = false;
	}
	rightArm.transform.rotation = Quaternion.Euler(0,0,0);
}
//When collision occurs
function OnCollisionEnter2D(col : Collision2D)
{
	if(col.gameObject.tag == "Ground")//when jumping ends
	{
		animator.SetBool("isJumping", false);
	}
}