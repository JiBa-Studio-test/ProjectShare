var duration:int;
var fullDuration:int;
var spriteRenderer: SpriteRenderer;
var warningColorLock:boolean;

var fireParticle:GameObject;
var brokenParticle:GameObject;
var brokenTube:GameObject;

var cloneFireParticle:GameObject;
var cloneBrokenParticle:GameObject;

function Start()
{
	duration=50;
	fullDuration=50;
	spriteRenderer=GetComponent(SpriteRenderer);
	warningColorLock=true;
}
function Update()
{
	if(!warningColorLock)
	{
		WarningColor();
	}
	if(duration<=0)
	{
		Broken();
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
		var durationPercent=parseFloat(duration)/parseFloat(fullDuration);
		if(durationPercent>0)
		{
			spriteRenderer.color=Color.Lerp(Color.red,Color.white,durationPercent);
		}
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
	cloneFireParticle=Instantiate(fireParticle,transform.position+Vector2(1,2),transform.rotation);
}

function Broken()
{
	if(cloneFireParticle!=null)
	{
		if(!cloneFireParticle.GetComponent(ParticleSystem).isPlaying)
		{
			Destroy(cloneFireParticle);
			cloneBrokenParticle=Instantiate(brokenParticle,transform.position+Vector2(1,2),transform.rotation) as GameObject;
		}
	}
	if(cloneBrokenParticle!=null)
	{
		if(!cloneBrokenParticle.GetComponent(ParticleSystem).isPlaying)
		{
			Destroy(cloneBrokenParticle);
			Instantiate(brokenTube,transform.position,transform.rotation);
			Destroy(gameObject);
		}
	}
}
