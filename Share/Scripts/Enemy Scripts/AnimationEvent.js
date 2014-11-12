#pragma strict

var enemyAction : EnemyAction;
function Start () {
    var parent = transform.parent.gameObject;
	enemyAction = parent.GetComponent("EnemyAction") as EnemyAction;
}

function Update () {

}

function SendDeadSignal(){
	enemyAction.BeKilled();
}