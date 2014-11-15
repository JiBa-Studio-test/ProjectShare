var velocity:Vector2;
var gravity:float;

function FixedUpdate()
{
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

function SetDirection(vector:Vector2)
{
	velocity.x=velocity.x*Mathf.Sign(vector.x);
	velocity.y=velocity.y*Mathf.Sign(vector.y);
}

function OnTriggerEnter2D(other:Collider2D)
{
	if(other.tag=="Ground")
	{
		Destroy(gameObject);
	}
}