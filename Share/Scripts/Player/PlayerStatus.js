﻿#pragma strict

//basic parameters
var HP : int;
var DEF : int;
var speed : float;
var jumpHeight : float;
var faceToRight : boolean;
var weapon : int;
var maxHP:int;

//animation parameters
var isRunning : boolean;
var isAttacking : boolean;
var isJumping : boolean;
var isDead : boolean;

//other scripts



function Start () {
	
	
	//initialize basic parameters
	maxHP=50;
	if(HP==0)
	{
		HP=maxHP;
	}
	DEF = 0;
	faceToRight = true;
	weapon = 1;
}

function FixedUpdate () {

}

