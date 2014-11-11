static var gameManagement: GameManagement;
static var points:int;
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

function ResetPoints(points:int)
{
	this.points=points;
}