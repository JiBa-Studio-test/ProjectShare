import System.Collections.Generic;
 var inventoryList : List.<GameObject>;
 function Start()
 {
 	inventoryList=new List.<GameObject>();
 }
 
 function AddItem(item:GameObject)
 {
 	if(CheckExisted(item))
 	{
 		Destroy(item);
 	}
 	else
 	{
 		inventoryList.Add(item);
 		item.transform.localScale=Vector3(1,1,1);
 	}
 	Refresh();
 }
 
 function RemoveItem(item:GameObject)
 {
 	inventoryList.Remove(item);
 	DestroyImmediate(item);
 	Refresh();
 }
 
 function Refresh()
 {
 	for(var objects: GameObject in inventoryList)
 	{
 		objects.GetComponentInChlidren(UILabel).text=objects.GetComponent(ItemDataBase).item.amount+" ";
 	}
 	GetComponent(UIGrid).Reposition();
 }
 
function CheckExisted(item:GameObject):boolean
 {
 	var flag=false;
 	for(var objects: GameObject in inventoryList)
 	{
 		if(item.GetComponent(ItemDataBase).list==objects.GetComponent(ItemDataBase).list)
 		{
 			objects.GetComponent(ItemDataBase).item.amount++;
 			flag=true;
 			break;
 		}
 		else
 		{
 			flag=false;
 		}
 	}
 	return flag;
 }