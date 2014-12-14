var duration:int;
var fullDuration:int;

var spriteRenderer: SpriteRenderer;

var warningColorLock:boolean;
var damageFlash:int;

var fireParticle:GameObject;
var brokenParticle:GameObject;
var brokenTube:GameObject;
var material:GameObject;
var cloneFireParticle:GameObject;
var cloneBrokenParticle:GameObject;

function Start()
{
	duration=50;
	fullDuration=50;

	spriteRenderer=GetComponentInChildren.<SpriteRenderer>();

	warningColorLock=true;
}
function Update()
{
	if(!warningColorLock)
	{
		WarningColor();
	}
	if(duration>0)
	{
		if((damageFlash-1)>0)
		{
			var percent: float=(10.0-parseFloat(damageFlash))/10.0;
			spriteRenderer.color=Color.Lerp(Color.red,Color.white,percent);
			damageFlash--;
		}
		else
		{
			spriteRenderer.color=Color.white;
		}
	}
	if(duration<=0)
	{
		Broken();
		damageFlash=0;
	}
}
function Damage(ATK:int)
{
	if(duration>0)
	{
		duration-=ATK;
		if(duration<=0)
		{
			duration=0;
			warningColorLock=false;
			Fire();
		}
		//var durationPercent=parseFloat(duration)/parseFloat(fullDuration);
		//if(durationPercent>0)
		//{
		damageFlash=15;	
		//}
	}
}
function WarningColor()
{
	warningColorLock=true;
	for(var i:float;i<=10;i++)
	{
		yield WaitForSeconds(0.05);
		spriteRenderer.color=Color.Lerp(Color.yellow,Color.red,i/10.0);
	}
	ChangeColor();	
}
function ChangeColor()
{
	for(var i:float;i<=10;i++)
	{
		yield WaitForSeconds(0.05);
		spriteRenderer.color=Color.Lerp(Color.red,Color.yellow,i/10.0);
	}
	warningColorLock=false;	
}


function Fire()
{
	cloneFireParticle=Instantiate(fireParticle,transform.position+Vector2(0,1),transform.rotation);
	cloneFireParticle.transform.parent=transform;
}

function Broken()
{
	if(cloneFireParticle!=null)
	{
		if(!cloneFireParticle.GetComponent(ParticleSystem).isPlaying)
		{
			Destroy(cloneFireParticle);
			cloneBrokenParticle=Instantiate(brokenParticle,transform.position+Vector2(0,1),transform.rotation) as GameObject;
			cloneBrokenParticle.transform.parent=transform;
		}
	}
	if(cloneBrokenParticle!=null)
	{
		if(!cloneBrokenParticle.GetComponent(ParticleSystem).isPlaying)
		{
			Destroy(cloneBrokenParticle);
			Destroy(gameObject);
			
			Instantiate(brokenTube,transform.position,transform.rotation);
			DropingMaterials();
			EnemyManagement.enemyManagement.spawnerList.Remove(this.gameObject);
			EnemyManagement.enemyManagement.spawnerDestroyed++;	
			
			
		}
	}
}

function DropingMaterials()
{
	var num:int=Random.Range(25,50);
	for(var i:int=1;i<num;i++)
	{
		Instantiate(material,transform.position,transform.rotation);
	}
}
