#pragma strict

//To get the scripts
var status : PlayerStatus;//all the parameters about player refer to PlayerStatus
var animator : Animator;
var character : Transform;

//enable parameters
var enableControl : boolean;//Enable the control from Input
var enableAttack : boolean;//Enable Attack
function Start () {
	status = GetComponent("PlayerStatus") as PlayerStatus;//get status
	
	//set animator and character
	for(var child : Transform in transform as Transform)
	{
		if(child.tag == "Character")
		{
			character = child;//get character
			animator = child.gameObject.GetComponent("Animator") as Animator;//get animator
		}
	}
	
	//initialize enable parameters
	enableControl = true;
	enableAttack = true;
}

function FixedUpdate () {
	/***
	 **Character Control
	***/
	if(enableControl)
	{
		//running
		if(Input.GetKey(KeyCode.LeftArrow))//run towards left
		{
			Run(false);
		}
		
		if(Input.GetKey(KeyCode.RightArrow))//run towards right
		{
			Run(true);
		}
		
		if(!Input.GetKey(KeyCode.LeftArrow) && !Input.GetKey(KeyCode.RightArrow))
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
	}
}

//Function RUN
function Run(towardsRight : boolean)
{
	if(!towardsRight)//run towards left
	{
		if(status.faceToRight)//change direction in character
			{
				character.gameObject.SendMessage("SetFaceDirection",false);
				status.faceToRight = false;
			}
			
			animator.SetBool("isRunning",true);
			transform.position += Vector3.left * status.speed * Time.deltaTime;
	}
	else //run towards right
	{
		if(!status.faceToRight)//change direction in character
		{
			character.gameObject.SendMessage("SetFaceDirection",true);
			status.faceToRight = true;
		}
		
		animator.SetBool("isRunning",true);
		transform.position += Vector3.right * status.speed * Time.deltaTime;
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
function Attack()
{
	if(animator.GetBool("isAttacking") == false)
	{
		animator.SetBool("isAttacking",true);
	}
}
function AttackEnd()
{
	if(animator.GetBool("isAttacking"))
	{
		animator.SetBool("isAttacking",false);
	}
}
//When collision occurs
function OnCollisionEnter2D(col : Collision2D)
{
	if(col.gameObject.tag == "Ground")//when jumping ends
	{
		animator.SetBool("isJumping", false);
	}
}