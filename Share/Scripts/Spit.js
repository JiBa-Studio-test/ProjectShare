var velocity:Vector2;
var gravity:float;
var enemyStatus: EnemyStatus;
var faceToRight: boolean;
function Start()
{
}

function FixedUpdate()
{
	SetDirection();
	Move(velocity*Time.deltaTime);
	SetGravity();
	
}
function Move(deltaMovement:Vector2)
{
	transform.Translate(deltaMovement,Space.World);
}
function SetGravity()
{
	velocity.y-=gravity*Time.deltaTime;
}

function SetDirection()
{
	var angle=Mathf.Rad2Deg*Mathf.Atan(velocity.y/velocity.x);
	transform.rotation=Quaternion.Euler(0,0,angle);
}

function OnTriggerEnter2D(other:Collider2D)
{
	if(other.tag=="Ground")
	{
		Destroy(gameObject);
	}
	
	if(other.tag=="Player")
	{
		var playerControl = other.gameObject.GetComponent("PlayerControl") as PlayerControl;
		if((other.transform.position.x-transform.position.x)>0)
		{
			playerControl.Damage((5+EnemyManagement.enemyManagement.enemyAttackFactor),Vector2(1,0));
			Destroy(gameObject);
		}
		else
		{
			playerControl.Damage((5+EnemyManagement.enemyManagement.enemyAttackFactor),Vector2(-1,0));
			Destroy(gameObject);
		
		}
		
	}
}