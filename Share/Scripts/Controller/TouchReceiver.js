#pragma strict

var isRunning : boolean;
var isAttacking : boolean;
var runToRight : boolean;
var playerControl : PlayerControl;
var moveEffectiveRadius : float;//set the effective range of joystick to move
var attackEffectiveRadius : float;
var moveJoystickAngle : float;
//var moveJoystickAngle : float;
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
	if(moveJoystickAngle!=0){
		moveJoystickAngle=0;//set angle as 0 if not
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
		moveJoystickAngle=0.0;
	}
	if (move.joystickName == "AttackJoystick"){
		playerControl.AttackEnd();
	}
}

function On_JoystickMove(move : MovingJoystick){
	//Moving
	if (move.joystickName == "MoveJoystick"){

		SetAngle(moveJoystickAngle);
		if(move.joystickAxis.x>moveEffectiveRadius){
			playerControl.isRunning = true;
			playerControl.runToRight = true;
			playerControl.speedRate = move.joystickAxis.x;
			moveJoystickAngle = Mathf.Rad2Deg*Mathf.Atan(move.joystickAxis.y/move.joystickAxis.x);//get the angle(-90~90) of joystick
		}
		else if(move.joystickAxis.x<-moveEffectiveRadius){
			playerControl.isRunning = true;
			playerControl.runToRight = false;
			playerControl.speedRate = -move.joystickAxis.x;
			moveJoystickAngle = Mathf.Rad2Deg*Mathf.Atan(move.joystickAxis.y/move.joystickAxis.x);//get the angle(-90~90) of joystick
		}
		else{
			isRunning=false;
		}
	}
	//Attacking
	if (move.joystickName == "AttackJoystick"){
		//the interval of angle is always from -90 to 90
		playerControl.Attack(moveJoystickAngle);
	}
}

function SetAngle(angle : float)
{
	playerControl.ArmRotate(moveJoystickAngle);
}
function Update () {

}