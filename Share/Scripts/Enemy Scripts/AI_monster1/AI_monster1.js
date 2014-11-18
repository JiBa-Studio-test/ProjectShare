var enemyAction: EnemyAction;
var player:GameObject;
var disToPlayer:float;
var ScaleX:float;
function Start () 
{
	enemyAction=GetComponent(EnemyAction);
	player=GameObject.FindGameObjectWithTag("Player");
	ScaleX=transform.localScale.x;
}

function AIActionToPlayer()//following movement for enemy
{
	enemyAction.animator.SetBool("isRunning",true);
	var distance:float;
	distance=player.transform.position.x-transform.position.x;
	if(distance<-disToPlayer)
	{
		enemyAction.isRight=true;
		enemyAction.enemyStatus.faceToRight=false;
		GoLeft();
	}
	if(distance>disToPlayer)
	{
		enemyAction.isRight=false;
		enemyAction.enemyStatus.faceToRight=true;
		GoRight();
	}
	if(distance>=-disToPlayer&&distance<=disToPlayer)
	{
		if(enemyAction.isRight)
		{
			GoLeft();
		}
		if(!enemyAction.isRight)
		{
			GoRight();
		}
	}
}
function GoLeft()
{
	transform.localScale.x=-ScaleX;
	transform.position+=Vector3.left*enemyAction.speed*Time.deltaTime;
}
function GoRight()
{
	transform.localScale.x=ScaleX;
	transform.position+=Vector3.right*enemyAction.speed*Time.deltaTime;
}

