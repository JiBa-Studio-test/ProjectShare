/// <summary>
/// Drop base.第一个类，用来描述掉落物品的信息（id编号->可用做数据库id索引，掉落物品名，图标名称->后面要从图集里面选取图标，
/// Drop base.物品的描述->写个小故事，物品的值比如对自身属性的加成和红药蓝药的效果）
/// </summary>
public class DropBase {
	public int id ;                         
	public string name ;                    
	public string iconname ;                
	public string describe ;				
	public float[] valuses ;				
	public int amount ;						
	/// <summary>
	/// Initializes a new instance of the <see cref="DropBase"/> class.构造函数
	/// </summary>
	/// <param name="_id">_id.</param>
	/// <param name="_name">_name.</param>
	/// <param name="_describe">_describe.</param>
	/// <param name="_val">_val.</param>
	public DropBase(int _id , string _name , string _describe , float[] _val){
		valuses = new float[5] ;
		id = _id ;
		name = _name ;
		iconname = _name ;
		describe = _describe ;
		valuses = _val ;
		amount = 1 ;
	}
}
