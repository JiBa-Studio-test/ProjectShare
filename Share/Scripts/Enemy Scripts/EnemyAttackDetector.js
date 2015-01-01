var enemyStatus:EnemyStatus; 
var playerControl:PlayerControl;
var attackFrequency: float;
var attackable:boolean;
function Start()
{
	enemyStatus=transform.parent.GetComponent(EnemyStatus);
	playerControl=GameObject.FindGameObjectWithTag("Player").GetComponent(PlayerControl);
	attackFrequency=1;
	attackable=true;	
}

function OnTriggerStay2D(other:Collider2D)
{
	
	if(other.tag=="Player")
	{
		if(attackable&&!enemyStatus.isDead)
		{
			if((other.transform.position.x-transform.position.x)>0)
			{
				other.GetComponent(PlayerControl).Damage(enemyStatus.ATK,Vector2(1,1));
			}
			else
			{
			  	other.GetComponent(PlayerControl).Damage(enemyStatus.ATK,Vector2(-1,1));
			}
			other.GetComponent(PlayerControl).Damage(enemyStatus.ATK,Vector2(1,1));
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