var player:Transform;
var margin: Vector2;
var smoothing:Vector2;
var bound: BoxCollider2D;
var _min:Vector3;
var _max:Vector3;
var isFollowing:boolean;
var playerSpeed:float;
var playerSpeedRate:float;
function Start()
{
	playerSpeed=player.gameObject.GetComponent(PlayerStatus).speed;
	_min=bound.bounds.min;
	_max=bound.bounds.max;
	isFollowing=true;
}
function FixedUpdate()
{
	playerSpeedRate=player.gameObject.GetComponent(PlayerControl).speedRate;
	var x=transform.position.x;
	var y=transform.position.y;
	if(isFollowing)
	{
		if(Mathf.Abs(x-player.position.x)>margin.x)
		{	
			x=Mathf.Lerp(x,player.position.x,smoothing.x*Time.deltaTime);	
		}
		if(Mathf.Abs(y-(player.position.y+1.1))>margin.y)
		{
			y=Mathf.Lerp(y,player.position.y+1.1,smoothing.y*Time.deltaTime);
		}
	}
		var cameraHalfWidth=camera.orthographicSize*(parseFloat(Screen.width)/parseFloat(Screen.height));
		x=Mathf.Clamp(x,_min.x+cameraHalfWidth,_max.x-cameraHalfWidth);
		y=Mathf.Clamp(y,_min.y+camera.orthographicSize,_max.y-camera.orthographicSize);
		transform.position=Vector3(x,y,transform.position.z);
	
}