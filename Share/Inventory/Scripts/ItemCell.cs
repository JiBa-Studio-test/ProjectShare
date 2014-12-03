/// <summary>
/// Item cell.
/// </summary>
using UnityEngine;
using System.Collections;

[RequireComponent(typeof(DropObjectDataBase))]
public class ItemCell : MonoBehaviour {
	/// <summary>
	/// The cell DES.这个用来显示背包格子里面的信息，比如装备的属性之类的
	/// </summary>
	private GameObject cellDes ;
	/// <summary>
	/// The _cell D.这个用来获取格子身上的数据库脚本。因为需要用到里面的数值
	/// </summary>
	private DropObjectDataBase _cellDB ;
	// Use this for initialization
	void Start () {
		_cellDB = gameObject.GetComponent<DropObjectDataBase>() ;
		cellDes = GameObject.Find("InventoryItemCellDescribe");
		/// <summary>
		/// cellDes.transform.position.这句话用来设置属性描述框的初始位置，就是放到看不到的位置
		/// </summary>
		cellDes.transform.position = new Vector3(0,10000,0);
	}
	/// <summary>
	/// Raises the click event.当鼠标点击物品的时候先判断物品的数量是否大于1个，如果大于1个的话就数量上减去1，否则刚好有一个的话就把它从背包删除
	/// </summary>
	void OnClick(){
		if(gameObject.GetComponent<DropObjectDataBase>().dropBase.amount > 1){
			gameObject.GetComponent<DropObjectDataBase>().dropBase.amount -- ;
		}else{
			this.transform.parent.GetComponent<Inventory>().RemoveItem(this.gameObject);
			/// <summary>
			/// DesHide.删除物品的同时将物品介绍面板隐藏
			/// </summary>
			DesHide();
		}
		this.transform.parent.GetComponent<Inventory>().ReFreshInventory();
	}
	/// <summary>
	/// Raises the hover event.鼠标悬浮在物品上面的时候调用，接受一个参数，
	/// </summary>
	/// <param name="isOver">If set to <c>true</c> is over.</param>
	void OnHover(bool isOver){
		if(isOver){
			DesShow();
		}else{
			DesHide();
		}
	}
	/// <summary>
	/// DESs the show.将属性显示面板的位置设置到物品的位置，并设置属性面板内容，从数据库脚本中读取
	/// </summary>
	void DesShow(){
		cellDes.transform.position = gameObject.transform.position ;
		cellDes.GetComponentInChildren<UILabel>().text = _cellDB.dropBase.name + "\n" +
														 _cellDB.dropBase.describe + "\n" +
														 _cellDB.dropBase.valuses[0] ;
	}
	/// <summary>
	/// DESs the hide.将面板的y值设置到一个看不到的敌方，来实现面板隐藏
	/// </summary>
	void DesHide(){
		cellDes.transform.position = new Vector3(0,10000,0);
	}

	void OnPress(){

	}
}
