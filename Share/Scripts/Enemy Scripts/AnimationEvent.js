#pragma strict

var enemyAction : EnemyAction;
function Start () {
    var parent = transform.parent.gameObject;
	enemyAction = parent.GetComponent("EnemyAction") as EnemyAction;
}



function SendDeadSignal(){
	enemyAction.BeKilled();
}