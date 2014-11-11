var progress:UIProgressBar;
var label:UILabel;
function Awake()
{
	label=GetComponent(UILabel);
	progress=GameObject.Find("HP_Background").GetComponent(UIProgressBar);
}
function Text()
{
	label.text="Health"+(Mathf.RoundToInt(progress.value*100)).ToString();
}