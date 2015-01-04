import System.Collections.Generic;
var levelList : List.<GameObject>;
var grid:UIGrid;
var levelCell:GameObject;
var powerUpButton:GameObject;
var levelLabel:GameObject;
var costLabel:GameObject;
var bulletPrefab:GameObject;
var ItemCell:GameObject;
var num:GameObject;

var ATKToAdd:int;
var numOfCells:int;
var maxLevel:int;
var levelUpBlock:boolean;
var cost:int;
function Start()
{
 	levelList=new List.<GameObject>();
 	levelUpBlock=false;
 	ItemCell=GameObject.FindGameObjectWithTag("ItemCell");
	for(var child:Transform in ItemCell.transform)//scan all childern
	{
		if(child.gameObject.name=="Num")
		{
			num=child.gameObject;
		}
	}
 	for(var child:Transform in powerUpButton.transform)//scan all childern
	{
		if(child.gameObject.name=="level")
		{
			levelLabel=child.gameObject;
		}
		if(child.gameObject.name=="cost")
		{
			costLabel=child.gameObject;
		}
	}
 	grid=GetComponent(UIGrid);
 	if(maxLevel==0)
 	{
 		maxLevel=15;
 	}
 	if(cost==0)
 	{
 		cost=5;
 	}
 	if(ATKToAdd==0)
 	{
 		ATKToAdd=1;
 	}
 	costLabel.GetComponent(UILabel).text=cost.ToString();
}

function Update()
{
	if(cost>GameManagement.gameManagement.crystalNum)
	{
		powerUpButton.GetComponent(UIButton).isEnabled=false;
	}
	
	else
	{
		powerUpButton.GetComponent(UIButton).isEnabled=true;
	}
}

function AddCell()
{
	if(!levelUpBlock)
	{
		if(cost<=GameManagement.gameManagement.crystalNum)
		{
			levelList.Add(levelCell);
			levelCell.GetComponent(UISprite).color=Color.Lerp(Color.gray,Color.red,parseFloat(numOfCells)/15.0);
			NGUITools.AddChild(gameObject,levelCell);
			grid.Reposition();
			numOfCells=levelList.Count;
			levelLabel.GetComponent(UILabel).text="Lv."+numOfCells.ToString();
			//calculate the number of crystals
			GameManagement.gameManagement.DeductCrystalNum(cost);
			ItemCell.GetComponent(ItemDataBase).item.amount-=cost;
			//refresh and recalculate the cost
			CostAlgorithm();
			costLabel.GetComponent(UILabel).text=cost.ToString();
			num.GetComponent(UILabel).text=ItemCell.GetComponent(ItemDataBase).item.amount+" ";
		}
	}
}

function MaxCheck()
{
	if(numOfCells==maxLevel)
	{
		levelUpBlock=true;
		powerUpButton.GetComponent(UIButton).isEnabled=false;
		powerUpButton.GetComponent(UIPlaySound).Play();
	}
}


function PowerUp()
{
	if(!levelUpBlock)
	{
		bulletPrefab.GetComponent(Fires).ATK+=ATKToAdd;
	}
}

function CostAlgorithm()
{
	cost+=5;
}

