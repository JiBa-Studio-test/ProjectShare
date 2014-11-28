static var gameManagement: GameManagement;
static var points:int;
static var crystalNum:int;
function Awake()
{
	gameManagement=this;
}

function Reset()
{
	points=0;
}

function AddPoints(pointsToAdd:int)
{
	points+=pointsToAdd;
}

function SetPoints(points:int)
{
	this.points=points;
}

function AddCrystalNum(numToAdd:int)
{
	crystalNum+=numToAdd;
}

function SetCrystalNum(num:int)
{
	crystalNum=num;
}