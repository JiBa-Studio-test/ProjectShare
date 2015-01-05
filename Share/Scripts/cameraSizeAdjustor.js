#pragma strict

var standardWidth:float;
var standardHeight:float;
var deviceWidth:float;
var deviceHeight:float;
function Awake () {
	standardWidth=1024f;
	standardHeight=768f;
	deviceWidth=Screen.width;
	deviceHeight=Screen.height;
	
	SetCameraSize();
}

function SetCameraSize()
{
	var widthAspect=deviceWidth/standardWidth;
	var heightAspect=deviceHeight/standardHeight;
	
	if(deviceWidth>standardWidth)
	{
		camera.orthographicSize/=widthAspect;
	}
}