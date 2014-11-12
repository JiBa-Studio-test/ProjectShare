#pragma strict

var isRunning : boolean;
var isAttacking : boolean;
var runToRight : boolean;
var playerControl : PlayerControl;
var moveEffectiveRadius : float;//set the effective range of joystick to move
var attackEffectiveRadius : float;

function Awake () {
	isRunning = false;
	isAttacking = false;
}
function Start () {

	if(playerControl == null){
		playerControl = GetComponent(PlayerControl) as PlayerControl;
	}
	if(moveEffectiveRadius == 0){
		moveEffectiveRadius=0.2;
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
	if (move.joystickName == "AttackJoystick"){
		playerControl.AttackEnd();
	}
}

function On_JoystickMove(move : MovingJoystick){
	//Moving
	if (move.joystickName == "MoveJoystick"){
		
		if(move.joystickAxis.x>moveEffectiveRadius){
			playerControl.isRunning = true;
			playerControl.runToRight = true;
			playerControl.speedRate = move.joystickAxis.x;
		}
		else if(move.joystickAxis.x<-moveEffectiveRadius){
			playerControl.isRunning = true;
			playerControl.runToRight = false;
			playerControl.speedRate = -move.joystickAxis.x;
		}
		else{
			isRunning=false;
		}
	}
	//Attacking
	if (move.joystickName == "AttackJoystick"){
		//the interval of angle is always from -90 to 90
		var angle = Mathf.Rad2Deg*Mathf.Atan(move.joystickAxis.y/move.joystickAxis.x);
		var attackToRight = move.joystickAxis.x>0?true:false;
		playerControl.Attack(angle,attackToRight);
	}
}

function Update () {

}