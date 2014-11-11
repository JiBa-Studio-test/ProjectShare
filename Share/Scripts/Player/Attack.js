#pragma strict

var animator : Animator;

function Start () {
	animator = GetComponent("Animator")as Animator;
}

function FixedUpdate () {
	if(Input.GetKey(KeyCode.Z))
	{
		PlayOneShot("isAttacking");
	}
}

function PlayOneShot (par : String){
	var parameter = Animator.StringToHash(par);
	if(!animator.GetBool(parameter))
	{
		animator.SetBool(parameter,true);
		
		
	}
}

function attackEnd()
{
	animator.SetBool("isAttacking",false);
}