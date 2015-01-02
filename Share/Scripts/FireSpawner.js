var firePrefab: GameObject;
var fireScript: Fires;
var isAttacking: boolean;
var timeOver: boolean;
var frequency: float;
var shootingSFX: AudioSource;
function Start()
{
	timeOver=true;
	frequency=fireScript.frequency;
	shootingSFX=GetComponent("AudioSource");
}
function Update()
{
	frequency=fireScript.frequency;
	if(Input.GetKey(KeyCode.Z))
	{
		isAttacking=true;
	}
	if(Input.GetKeyUp(KeyCode.Z))
	{
		isAttacking=false;
	}
	/**
	if(isAttacking&&timeOver)
	{
		Spawn(angle);	
	}
	**/
}
function Attack(angle : float)
{
	if(timeOver)
	{
		Spawn(angle);
	}
}
function Spawn(angle : float)
{
	timeOver=false;
	//send angle to set the routine of fire
	
	var position: Vector3 = Vector3(transform.position.x,transform.position.y,transform.position.z);
	shootingSFX.Play();
	var fireInstance : GameObject = Instantiate(firePrefab,position,Quaternion.Euler(0,0,angle));
	fireInstance.GetComponent(Fires).angle=angle;
	
	TimeWaiting();	
	//Debug.Log(position);
}
function TimeWaiting()
{
	yield WaitForSeconds(1.0/frequency);
	timeOver=true;
}
