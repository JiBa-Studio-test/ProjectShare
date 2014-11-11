var firePrefab: GameObject;
var isAttacking: boolean;
var timeOver: boolean;
var frequency: float;
function Start()
{
	timeOver=true;
}
function Update()
{
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
	var position: Vector3 = Vector3(transform.position.x,transform.position.y,transform.position.z);
	Instantiate(firePrefab,position,Quaternion.Euler(0,0,angle));
	TimeWaiting();	
	Debug.Log(position);
}
function TimeWaiting()
{
	yield WaitForSeconds(1.0/frequency);
	timeOver=true;
}
