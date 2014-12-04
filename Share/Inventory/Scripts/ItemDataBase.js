enum ItemClassfication
{
	Materials
}
enum ItemList
{
	Crystal,
	Diamond
}
var classfication:ItemClassfication;
var list:ItemList;
var item:Item;
var index:int;
function Start () 
{
	switch(list)
	{
		case ItemList.Crystal:
			index = parseInt(ItemList.Crystal);
			classfication=ItemClassfication.Materials;
			item = new Item( index, list.ToString(), "Valuable materials for updating weapons" );
			break ;
		case ItemList.Diamond:
			index = parseInt(ItemList.Diamond) ;
			classfication=ItemClassfication.Materials;
			item = new Item( index, list.ToString(), "I don't know" );
			break ;
	}
	
}