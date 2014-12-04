class Item extends System.Object
{
	var ID:int;
	var name:String;
	var description:String;
	var amount:int;
	function Item(id:int,name:String,description:String)
	{
		ID=id;
		this.name=name;
		this.description=description;
		amount=0;
	}
}