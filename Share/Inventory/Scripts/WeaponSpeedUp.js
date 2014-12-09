import System.Collections.Generic;
var levelList : List.<GameObject>;
var grid:UIGrid;
var levelCell:GameObject;
var speedUpButton:GameObject;
var levelLabel:GameObject;
var costLabel:GameObject;
var bulletPrefab:GameObject;
var ItemCell:GameObject;
var num:GameObject;

var SPDToAdd:int;
var numOfCells:int;
var maxLevel:int;
var levelUpBlock:boolean;
var cost:int;
function Start()
{
 	levelList=new List.<GameObject>();
 	LevelUpBlock=false;
 	ItemCell=GameObject.FindGameObjectWithTag("ItemCell");
	for(var child:Transform in ItemCell.transform)//scan all childern
	{
		if(child.gameObject.name=="Num")
		{
			num=child.gameObject;
		}
	}
 	for(var child:Transform in speedUpButton.transform)//scan all childern
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
 	if(SPDToAdd==0)
 	{
 		SPDToAdd=1;
 	}
 	costLabel.GetComponent(UILabel).text=cost.ToString();
}

function Update()
{
	if(cost>GameManagement.gameManagement.crystalNum)
	{
		speedUpButton.GetComponent(UIButton).isEnabled=false;
	}
	
	else
	{
		speedUpButton.GetComponent(UIButton).isEnabled=true;
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
		speedUpButton.GetComponent(UIButton).isEnabled=false;
		speedUpButton.GetComponent(UIPlaySound).Play();
	}
}


function SpeedUp()
{
	if(!levelUpBlock)
	{
		bulletPrefab.GetComponent(Fires).frequency+=SPDToAdd;
	}
}

function CostAlgorithm()
{
	cost+=5;
}

