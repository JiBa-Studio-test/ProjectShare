var progress:UIProgressBar;
var label:UILabel;
var playerStatus:PlayerStatus;
function Awake()
{
	label=GetComponent(UILabel);
	progress=GameObject.Find("HP_Background").GetComponent(UIProgressBar);
	playerStatus=GameObject.FindWithTag("Player").GetComponent(PlayerStatus);
}
function FixedUpdate()
{
	progress.value=parseFloat(playerStatus.HP)/parseFloat(playerStatus.maxHP);
}
function Text()
{
	label.text="Health"+(Mathf.RoundToInt(progress.value*100)).ToString();
}