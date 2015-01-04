var damageText:GameObject;
var enemyStatus:EnemyStatus;
var currentHP:int;
var LastHP:int;
function Start()
{
	enemyStatus=transform.parent.GetComponent(EnemyStatus);
	currentHP=enemyStatus.HP;
	LastHP=enemyStatus.HP;
}
function Update()
{
	currentHP=enemyStatus.HP;
	if(LastHP-currentHP>0)
	{
		FloatingDamage(LastHP-currentHP);
		LastHP=currentHP;
	}
	
}
function FloatingDamage(damage:int)
{
	var textObject:GameObject;
	textObject=Instantiate(damageText,transform.position,transform.rotation);
	textObject.GetComponent(DamageText).SetPosition(transform.position);
	textObject.GetComponent(DamageText).SetText(damage);
	
}