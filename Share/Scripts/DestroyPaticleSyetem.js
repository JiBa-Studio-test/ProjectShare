var particle:ParticleSystem;
function Start()
{
	particle=GetComponent(ParticleSystem);
}

function Update()
{
	if(particle.isPlaying)
	{
		return;
	}
	Destroy(gameObject);
}