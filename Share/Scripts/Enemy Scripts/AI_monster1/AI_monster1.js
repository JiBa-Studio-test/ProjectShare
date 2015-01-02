var enemyAction: EnemyAction;
var player:GameObject;
var disToPlayer:float;
var ScaleX:float;

//to control random move
var ifFinished:boolean=true;
var leftOrRightOrStop:int;
var toLeft:int;
var toRight:int;
var toStop:int;
var speedForRandomMove:float;
//
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
	transform.position+=Vector3.left*enemyAction.speed*EnemyManagement.enemyManagement.enemyFactor*Time.deltaTime;
}
function GoRight()
{
	transform.localScale.x=ScaleX;
	transform.position+=Vector3.right*enemyAction.speed*EnemyManagement.enemyManagement.enemyFactor*Time.deltaTime;
}

function RandomMove()
{
	enemyAction.animator.SetBool("isRunning",true);
	if(ifFinished)
	{
		toLeft=Random.Range(100,130);
		toRight=Random.Range(100,130);
		toStop=Random.Range(50,70);
		leftOrRightOrStop=Random.Range(1,6);
		ifFinished=false;
	}
	
	if(leftOrRightOrStop==1||leftOrRightOrStop==4)
	{
		toLeft--;
		transform.localScale.x=-ScaleX;
		transform.position+=Vector3.left*speedForRandomMove*EnemyManagement.enemyManagement.enemyFactor*Time.deltaTime;
		if(toLeft==0)
		{
			ifFinished=true;
		}
	}
	if(leftOrRightOrStop==2||leftOrRightOrStop==5)
	{
		toRight--;
		transform.localScale.x=ScaleX;
		transform.position+=Vector3.right*speedForRandomMove*EnemyManagement.enemyManagement.enemyFactor*Time.deltaTime;	
		if(toRight==0)
		{
			ifFinished=true;
		}
	}
	if(leftOrRightOrStop==3)
	{
		enemyAction.animator.SetBool("isRunning",false);
		toStop--;
		transform.position+=Vector3.zero*speedForRandomMove*EnemyManagement.enemyManagement.enemyFactor*Time.deltaTime;	
		if(toStop==0)
		{
			ifFinished=true;
		}
	}
}



