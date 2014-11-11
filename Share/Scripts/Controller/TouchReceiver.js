#pragma strict

var isRunning : boolean;
var isAttacking : boolean;
var runToRight : boolean;
var playerControl : PlayerControl;

function Awake () {
	isRunning = false;
	isAttacking = false;
}
function Start () {

	if(playerControl == null){
		playerControl = GetComponent(PlayerControl) as PlayerControl;
	}
}
// Subscribe to events  
function OnEnable(){  
	EasyJoystick.On_JoystickMove += On_JoystickMove;
	EasyJoystick.On_JoystickMoveEnd += On_JoystickMoveEnd;
}  
// Unsubscribe  
function OnDisable(){  
	EasyJoystick.On_JoystickMove -= On_JoystickMove	;
	EasyJoystick.On_JoystickMoveEnd -= On_JoystickMoveEnd;
}  
// Unsubscribe  
function OnDestroy(){  
	EasyJoystick.On_JoystickMove -= On_JoystickMove;	
	EasyJoystick.On_JoystickMoveEnd -= On_JoystickMoveEnd;  
}  

// Touch start event  
function On_JoystickMoveEnd(move : MovingJoystick){
	if (move.joystickName == "MoveJoystick"){
		playerControl.isRunning = false;
	}
}

function On_JoystickMove(move : MovingJoystick){
	//Moving
	if (move.joystickName == "MoveJoystick"){
		playerControl.isRunning = true;
		if(move.joystickAxis.x>0){
			playerControl.runToRight = true;
		}
		else if(move.joystickAxis.x<0){
			playerControl.runToRight = false;
		}
	}
	//Attacking
	if (move.joystickName == "AttackJoystick"){
		var angle = Mathf.Rad2Deg*Mathf.Atan(move.joystickAxis.y/move.joystickAxis.x);
		var attackToRight = move.joystickAxis.x>0?true:false;
		playerControl.Attack(angle,attackToRight);
	}
}

function Update () {

}