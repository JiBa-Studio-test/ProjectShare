#pragma strict

var speed : float;
var jumpHeight : float;
var animator : Animator;
var faceToRight : boolean; //false if face to left

function Start () {
	animator = GetComponent("Animator")as Animator;
	faceToRight = true;
}

function Update () {
	
	if(!animator.GetBool("isAttacking"))//Can NOT do when player is attacking 
	{
		//run towards left side
		if(Input.GetKey(KeyCode.LeftArrow))
		{
		
			if(faceToRight)//change direction
			{
				transform.localScale.x=-1;
				faceToRight = false;
			}
		
			animator.SetBool("isRunning", true);
			transform.position += Vector3.left * speed * Time.deltaTime;
		}
		
		//run towards right side
		if(Input.GetKey(KeyCode.RightArrow))
		{
			if(!faceToRight)//change direction
			{
				transform.localScale.x=1;
				faceToRight = true;
			}
			animator.SetBool("isRunning", true);
			transform.position += Vector3.right * speed * Time.deltaTime;
		}
		
		//To check if the player is running
		if(!Input.anyKey && animator.GetBool("isRunning"))
		{
			animator.SetBool("isRunning", false);
		}
	}
		//jump
		if(Input.GetKey(KeyCode.Space))
		{
			if(animator.GetBool("isJumping") == false)
			{
				rigidbody2D.AddForce(Vector3.up * jumpHeight);
				animator.SetBool("isJumping", true);
			}
		}
}

function OnCollisionEnter2D(col : Collision2D)
{
	if(col.gameObject.tag == "ground")
	{
		animator.SetBool("isJumping", false);
	}
}