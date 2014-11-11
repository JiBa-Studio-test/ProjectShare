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
	if(isAttacking&&timeOver)
	{
		Spawn();	
	}
}
function Spawn()
{
	timeOver=false;
	var position: Vector2 = Vector2(transform.position.x,transform.position.y);
	Instantiate(firePrefab,position,transform.rotation);
	TimeWaiting();	
}
function TimeWaiting()
{
	yield WaitForSeconds(1.0/frequency);
	timeOver=true;
}
