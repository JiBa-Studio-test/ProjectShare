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
	if(moveJoystickAngle!=0){
		moveJoystickAngle=0;//set angle as 0 if not
	}
}
// Subscribe to events  
function OnEnable(){  
	EasyJoystick.On_JoystickMove += On_JoystickMove;
	EasyJoystick.On_JoystickMoveEnd += On_JoystickMoveEnd;
 	EasyButton.On_ButtonPress += On_ButtonPress;
 	EasyButton.On_ButtonUp += On_ButtonUp;
}  
// Unsubscribe  
function OnDisable(){  
	EasyJoystick.On_JoystickMove -= On_JoystickMove	;
	EasyJoystick.On_JoystickMoveEnd -= On_JoystickMoveEnd;
	EasyButton.On_ButtonPress -= On_ButtonPress;
	EasyButton.On_ButtonUp -= On_ButtonUp;
}  
// Unsubscribe  
function OnDestroy(){  
	EasyJoystick.On_JoystickMove -= On_JoystickMove;	
	EasyJoystick.On_JoystickMoveEnd -= On_JoystickMoveEnd;
	EasyButton.On_ButtonPress -= On_ButtonPress;  
 	EasyButton.On_ButtonUp -= On_ButtonUp;
}  


function On_JoystickMove(move : MovingJoystick){
	//Moving
	if (move.joystickName == "MoveJoystick"){

		
		if(move.joystickAxis.x>moveEffectiveRadius){
			playerControl.isRunning = true;
			playerControl.runToRight = true;
			playerControl.speedRate = move.joystickAxis.x;
			//moveJoystickAngle = Mathf.Rad2Deg*Mathf.Atan(move.joystickAxis.y/move.joystickAxis.x);//get the angle(-90~90) of joystick
			moveJoystickAngle = move.joystickAxis.y*90;
			//Debug.Log(move.joystickAxis.y);
		}
		else if(move.joystickAxis.x<-moveEffectiveRadius){
			playerControl.isRunning = true;
			playerControl.runToRight = false;
			playerControl.speedRate = -move.joystickAxis.x;
			//moveJoystickAngle = Mathf.Rad2Deg*Mathf.Atan(move.joystickAxis.y/-move.joystickAxis.x);//get the angle(-90~90) of joystick
			moveJoystickAngle = move.joystickAxis.y*90;
			//Debug.Log(move.joystickAxis.y);
		}
		else{
			isRunning=false;
		}
		SetAngle(moveJoystickAngle);
		
	}
	
}
// Touch start event  
function On_JoystickMoveEnd(move : MovingJoystick){
	if (move.joystickName == "MoveJoystick"){
		playerControl.isRunning = false;
		moveJoystickAngle=0.0;
		playerControl.ArmDown();//revert
	}
}


function On_ButtonPress(button : String)
{
	//Attacking
	if(button == "AttackButton"){
		//the interval of angle is always from -90 to 90
		playerControl.Attack();
	}
	if(button == "JumpButton"){
		playerControl.Jump();
	}
}
function On_ButtonUp(button : String)
{
	if(button == "AttackButton"){
		playerControl.AttackEnd();
	}
	if(button == "JumpButton"){
	
	}
}


function SetAngle(angle : float)
{
	playerControl.ArmRotate(moveJoystickAngle);
}
function Update () {

}