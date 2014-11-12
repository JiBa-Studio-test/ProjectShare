var HP:int;
var ATK:int;
var DEF:int;
var speed:float;
var faceToRight:boolean;
var isDead:boolean;
var isJumping:boolean;
var isAttacking:boolean;
var bonus:int;
//var playerStatus: PlayerStatues;
function Awake()
{
	//playerStatus=GameObject.FindGameObjectWithTag("Player").GetComponent("PlayerStatues");
	//HP=10;
	//ATK=5;
	//DEF=0;
	if(speed == 0)
		speed=3;
	//faceToRight=playerStatus.faceToRight;
	isDead=false;
}