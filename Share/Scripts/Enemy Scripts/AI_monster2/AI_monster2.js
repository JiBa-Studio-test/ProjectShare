var enemyAction: EnemyAction;
var player:GameObject;
var disToPlayer:float;
var ScaleX:float;
var attackLock:boolean;


//to control random move
var ifFinished:boolean=true;
var leftOrRight:boolean=true;
var toLeft:int;
var toRight:int;
var speedForRandomMove:float;
//

function Start () 
{
	enemyAction=GetComponent(EnemyAction);
	player=GameObject.FindGameObjectWithTag("Player");
	ScaleX=transform.localScale.x;
	attackLock=true;
}

function AIActionToPlayer()//following movement for enemy
{
	enemyAction.animator.SetBool("isRunning",true);
	var distance:float;
	distance=player.transform.position.x-transform.position.x;
	if(distance<-disToPlayer)
	{
		attackLock=true;
		enemyAction.isRight=true;
		enemyAction.enemyStatus.faceToRight=false;
		GoLeft();
	}
	if(distance>disToPlayer)
	{
		attackLock=true;
		enemyAction.isRight=false;
		enemyAction.enemyStatus.faceToRight=true;
		GoRight();
	}
	if(distance>=-disToPlayer&&distance<=disToPlayer)
	{
		attackLock=false;
		if(distance<=0)
		{
			transform.localScale.x=-ScaleX;
			enemyAction.isRight=true;
			enemyAction.enemyStatus.faceToRight=false;	
		}
		else
		{
			transform.localScale.x=ScaleX;
			enemyAction.isRight=false;
			enemyAction.enemyStatus.faceToRight=true;	
		}
		RandomMove();
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

function RandomMove()
{
	if(ifFinished)
	{
		toLeft=Random.Range(30,40);
		toRight=Random.Range(30,40);
		ifFinished=false;
	}
	
	if(leftOrRight)
	{
		toLeft--;
		transform.position+=Vector3.left*speedForRandomMove*Time.deltaTime;
		if(toLeft==0)
		{
			ifFinished=true;
			leftOrRight=false;
		}
	}
	if(!leftOrRight)
	{
		toRight--;
		transform.position+=Vector3.right*speedForRandomMove*Time.deltaTime;	
		if(toRight==0)
		{
			ifFinished=true;
			leftOrRight=true;
		}
	}
}

