/// <summary>
/// Drop object.怪物死亡后会掉落物品
/// </summary>
using UnityEngine;
using System.Collections;

[RequireComponent(typeof(DropObjectDataBase))]
public class DropObject : MonoBehaviour {  
	/// <summary>
	/// Prefab.通过预设生成一个背包里面的格子
	/// </summary>
	public GameObject itemCellPrefab ;  
	/// <summary>
	/// Cellcontainer.背包格子父容器
	/// </summary>
	private GameObject Cellcontainer ;		
	// Use this for initialization
	void Start () {
		Cellcontainer = GameObject.Find("CellContainer");	
	}
	/// <summary>
	/// Raises the mouse down event.这里设定的是鼠标点选，大家可以设置trigger触发器触发拣选
	/// </summary>
	void OnMouseDown(){
		CellCreation();
	}
	/// <summary>
	/// Cells the creation.通过Instantiate克隆出一个格子预设，调用背包脚本的AddItem函数将这个clone出来的物体加到背包里面去
	/// Cells the creation.把掉落的物品的三个属性传给clone出来的物品，并设定它的图集图标
	/// </summary>
	void CellCreation(){
		GameObject cellClone = (GameObject)Instantiate(itemCellPrefab);
		cellClone.GetComponent<DropObjectDataBase>().dblist = gameObject.GetComponent<DropObjectDataBase>().dblist ;
		cellClone.GetComponent<DropObjectDataBase>().dropBase = gameObject.GetComponent<DropObjectDataBase>().dropBase ;
		cellClone.GetComponent<DropObjectDataBase>().dbspcies = gameObject.GetComponent<DropObjectDataBase>().dbspcies ;
		cellClone.GetComponentInChildren<UISprite>().spriteName = cellClone.GetComponent<DropObjectDataBase>().dropBase.iconname ;
		if(Cellcontainer){
			Cellcontainer.GetComponent<Inventory>().AddItem(cellClone);
		}else{
			print ("Failed to Instantiate.......");
		}
	}
}
