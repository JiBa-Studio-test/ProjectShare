@script RequireComponent(ItemDataBase)
var description:GameObject;
var tooltipLock:boolean;
var dataBase:ItemDataBase;

function Start()
{
	description=GameObject.Find("ItemDescription");
	dataBase=GetComponent(ItemDataBase);
	description.transform.position=Vector3(0,10000,0);
}

function OnHover(isOver:boolean)
{
	if(isOver)
	{
		DesShow();
	}
	else
	{
		DesHide();
	}
	tooltipLock = isOver;
}
	
function DesShow()
{
	description.transform.position = gameObject.transform.position ;
	description.GetComponentInChildren(UILabel).text = dataBase.item.name + "\n" +
														 dataBase.item.description + "\n";
}

function DesHide()
{
	description.transform.position = new Vector3(0,10000,0);
}
	
function Update()
{
	if (tooltipLock) 
	{
			var screenPosition:Vector3 = UICamera.mainCamera.ScreenToWorldPoint (Vector3 (Input.mousePosition.x, Input.mousePosition.y, 0));
			description.transform.position = screenPosition;
	}
}
