/// <summary>
/// Inventory.背包的核心类，背包操作
/// </summary>
using UnityEngine;
using System.Collections;
/// <summary>
/// Inventory.要使用List线性表，需要引入这个Generic
/// </summary>
using System.Collections.Generic ;  

public class Inventory : MonoBehaviour {
	/// <summary>
	/// The inventory list.定义一个存放gameobject的线性表
	/// </summary>
	private List<GameObject> inventoryList ; 
	// Use this for initialization
	void Start () {
		inventoryList = new List<GameObject>() ;   
	}

	/// <summary>
	/// Adds the item.物品进入背包函数，接受一个gameobject参数
	/// </summary>
	/// <param name="_goadd">_goadd.</param>
	public void AddItem(GameObject _goadd){ 
		/// <summary>
		/// if-else.先通过CheckExisted函数判断背包里面是否存在这个物品如果有就把传过来的gameobject销毁在CheckExisted函数里面将数量加1
		/// </summary>
		if(CheckExisted(_goadd)){
			Destroy(_goadd) ;
		}else{
			/// <summary>
			/// if-else.背包里面如果存在这个物品，就把传过来的gameobject添加到线性表里去，并且把传过来的gameobject设定为背包的子物体
			/// </summary>
			inventoryList.Add(_goadd);
			_goadd.transform.parent = gameObject.transform ;
			/// <summary>
			/// localScale.设定它的缩放，不然它会很巨大
			/// </summary>
			_goadd.transform.localScale = new Vector3(1,1,1);
		}

		ReFreshInventory();
	}
	/// <summary>
	/// Removes the item.将物品从背包删除，先从线性表里删除，然后再更新背包界面，最后销毁物体
	/// </summary>
	/// <param name="_goremove">_goremove.</param>
	public void RemoveItem(GameObject _goremove){ 
		inventoryList.Remove(_goremove);
		ReFreshInventory();
		Destroy(_goremove);
	}
	/// <summary>
	/// Res the fresh inventory.更新背包界面，从线性表读取物品信息并刷新界面
	/// </summary>
	public void ReFreshInventory(){ 
		foreach(GameObject g in inventoryList){
			g.GetComponentInChildren<UILabel>().text = g.GetComponent<DropObjectDataBase>().dropBase.amount + "" ;
		}
		/// <summary>
		/// Reposition.重新调整背包物品排列，UIGird的函数
		/// </summary>
		gameObject.GetComponent<UIGrid>().Reposition() ;
	}
	/// <summary>
	/// Checks the existed.检测背包物品list里面的物体是否存在，通过比较物品名称种类实现判断，如果有就将数量加1，函数返回一个bool值
	/// </summary>
	/// <returns><c>true</c>, if existed was checked, <c>false</c> otherwise.</returns>
	/// <param name="_go">_go.</param>
	bool CheckExisted(GameObject _go){ 
		bool flag = false ;
		foreach(GameObject _obje in inventoryList){
			if(_go.GetComponent<DropObjectDataBase>().dblist == _obje.GetComponent<DropObjectDataBase>().dblist){
				_obje.GetComponent<DropObjectDataBase>().dropBase.amount ++ ;
				flag = true ;
				break ;
			}else{
				flag = false ;
			}
		}
		return flag ;
	}
}
