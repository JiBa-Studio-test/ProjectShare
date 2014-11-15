var enemyStatus:EnemyStatus; 
var attackFrequency: float;
var attackable:boolean;
var xForce:float;
var yForce:float;

function Start()
{
	enemyStatus=transform.parent.GetComponent(EnemyStatus);
	attackFrequency=1;
	attackable=true;	
}

function OnTriggerStay2D(other:Collider2D)
{
	
	if(other.tag=="Player")
	{
		if(attackable)
		{
			var vector:Vector2;
			if((other.transform.position.x-transform.position.x)>0)
			{
				vector=Vector2(xForce,yForce);
			}
			else
			{
			    vector=Vector2(-xForce,yForce);	
			}
			other.GetComponent(PlayerControl).Damage(enemyStatus.ATK,vector);
			attackable=false;
			Wait();
		}
	}
	
}

function Wait()
{
	yield WaitForSeconds(1.0/attackFrequency);
	attackable=true;
}