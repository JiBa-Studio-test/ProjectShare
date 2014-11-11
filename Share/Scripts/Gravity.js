#pragma strict

var gravity : Vector3;
var velocity : Vector3;

function Start () {
	velocity = Vector3.zero;
}

function Update () {
	velocity+=gravity*Time.deltaTime;
	transform.position +=velocity*Time.deltaTime;
}