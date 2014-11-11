#pragma strict
var position:Vector3;
var count:int;
var speed:float;
function Start()
{
	transform.position=Vector3(100,100,0);
}
function Update()
{
	
	FloatDamage();
		
}
function Destroy()
{
	Destroy(gameObject);
}
function SetText(text:int)
{
	GetComponent(UILabel).text=text.ToString();
}
function SetPosition(position:Vector3)
{
	this.position=position;
}
function FloatDamage()
{
	if(count==0)
	{
		var screenPosition:Vector3 = Camera.main.WorldToScreenPoint(position);
		var UIPosition:Vector3 = UICamera.mainCamera.ScreenToWorldPoint(screenPosition);
		transform.position=UIPosition;
	}
	count++;
	transform.Translate(Vector3.up*speed*Time.deltaTime);
	transform.position+=Vector3.up*speed*Time.deltaTime;
}