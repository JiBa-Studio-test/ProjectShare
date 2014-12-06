static var gameManagement: GameManagement;
var points:int;
var crystalNum:int;
var fire:GameObject;
var defaultATKForFires:int;
var defaultSPDForFires:float;
function Awake()
{
	gameManagement=this;
	Reset();
}

function Reset()
{
	points=0;
	fire.GetComponent(Fires).ATK=defaultATKForFires;
	fire.GetComponent(Fires).frequency=defaultSPDForFires;
	
}

function AddPoints(pointsToAdd:int)
{
	points+=pointsToAdd;
}

function DeductPoints(pointsToDeduct:int)
{
	points-=pointsToDeduct;
}

function SetPoints(points:int)
{
	this.points=points;
}

function AddCrystalNum(numToAdd:int)
{
	crystalNum+=numToAdd;
}

function DeductCrystalNum(numToDeduct:int)
{
	crystalNum-=numToDeduct;
}

function SetCrystalNum(num:int)
{
	crystalNum=num;
}