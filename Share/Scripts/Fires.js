

var speed: float=10;
var ATK:int;
var faceToRight: boolean;
var playerStatus: PlayerStatus;
var damageText:GameObject;
var explodingParticle:GameObject;
var angle: float;
var frequency:float;
function Start()
{
	playerStatus=GameObject.FindGameObjectWithTag("Player").GetComponent("PlayerStatus");
	faceToRight=playerStatus.faceToRight;
}
function OnTriggerEnter2D(other:Collider2D)
{
	if(other.tag=="Enemy")
	{

		if(faceToRight)
		{
			other.GetComponent(EnemyAction).Damage(ATK,Vector2(1,0));
		}
		else
		{
			other.GetComponent(EnemyAction).Damage(ATK,Vector2(-1,0));
		}
		Instantiate(explodingParticle,transform.position,transform.rotation);
		DestroyFire();
	}
	if(other.tag=="EnemySpawner")
	{
		if(other.GetComponent(EnemySpawnerDamage).duration!=0)	
		{
			Instantiate(explodingParticle,transform.position,transform.rotation);
			other.GetComponent(EnemySpawnerDamage).Damage(ATK);
			DestroyFire();
		}
	}
	if(other.tag=="Wall")
	{
		Instantiate(explodingParticle,transform.position,transform.rotation);
		DestroyFire();
	}
	
} 
function FixedUpdate()
{
	FireMove();
	AutomaticallyDispear();
}
function AutomaticallyDispear()
{
	var screenPosition:Vector3=Camera.main.WorldToScreenPoint(transform.position);
	if(Mathf.RoundToInt(screenPosition.x)>=Camera.main.pixelWidth)
	{
		DestroyFire();
	}
	if(Mathf.RoundToInt(screenPosition.x)<=0)
	{
		DestroyFire();
	}
}
function DestroyFire()
{
	Destroy(gameObject);
}
function FireMove()
{
	transform.position+=Vector3.right*speed*Mathf.Cos(Mathf.Deg2Rad*angle)*Time.deltaTime;
	transform.position+=Vector3.up*speed*Mathf.Sin(Mathf.Deg2Rad*angle)*Time.deltaTime;
	//Debug.Log(Mathf.Cos(Mathf.Rad2Deg*angle));
	//Debug.Log(angle);
	/**
	else
	{
	transform.position+=Vector3.left*speed*Mathf.Cos(Mathf.Deg2Rad*angle)*Time.deltaTime;
	transform.position+=Vector3.up*speed*Mathf.Sin(Mathf.Deg2Rad*angle)*Time.deltaTime;
	}
	**/
}
