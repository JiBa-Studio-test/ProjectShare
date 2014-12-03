@script RequireComponent(ItemDataBase)
var ItemCell:GameObject;
var num:GameObject;
var forcePara:int=500;
var player:Transform;
var track:boolean;
function Start()
{
	ItemCell=GameObject.FindGameObjectWithTag("ItemCell");
	player=GameObject.FindGameObjectWithTag("Player").transform;
	for(var child:Transform in ItemCell.transform)//scan all childern
	{
		if(child.gameObject.name=="Num")
		{
			num=child.gameObject;
		}
	}
	InitialForce();
	track=false;
}
function FixedUpdate()
{
	var x=transform.position.x;
	var y=transform.position.y;
	var distance:float=Mathf.Abs(x-player.position.x)*Mathf.Abs(x-player.position.x)+Mathf.Abs(y-player.position.y)*Mathf.Abs(y-player.position.y);
	if(distance<5)
	{
		track=true;
	}
	if(track)
	{
		TrackPlayer();
	}
}

function InitialForce()
{
	var angle=Random.Range(70,110);
	var yForce=Mathf.Sin(angle*Mathf.Deg2Rad);
	var xForce=Mathf.Cos(angle*Mathf.Deg2Rad);
	rigidbody2D.AddForce(Vector2(xForce*forcePara,yForce*forcePara));
}
function TrackPlayer()
{	
	rigidbody2D.isKinematic=true;
	collider2D.enabled=false;
	var x=transform.position.x;
	var y=transform.position.y;
	x=Mathf.Lerp(x,player.position.x,8*Time.deltaTime);
	y=Mathf.Lerp(y,player.position.y,8*Time.deltaTime);	
	transform.position=Vector3(x,y,transform.position.z);
	var distance:float=Mathf.Abs(x-player.position.x)*Mathf.Abs(x-player.position.x)+Mathf.Abs(y-player.position.y)*Mathf.Abs(y-player.position.y);
	if(distance<0.1)
	{
		AddItem();
	}
}
function AddItem()
{
	ItemCell.GetComponent(ItemDataBase).item.amount++;
	GameManagement.gameManagement.AddCrystalNum(1);
	Refresh();
	Destroy(gameObject);
}

function Refresh()
{
	num.GetComponent(UILabel).text=ItemCell.GetComponent(ItemDataBase).item.amount+" ";
}
