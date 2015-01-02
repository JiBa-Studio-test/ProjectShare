#pragma strict

function Start () {

}

function Update () {

}

function SetFaceDirection(faceToRight : boolean)
{
	if((faceToRight && transform.localScale.x<0)||(!faceToRight && transform.localScale.x>0))
	{
		transform.localScale.x = -transform.localScale.x;
	}
}

function CallRanking()
{
	GetComponentInParent(PlayerControl).ShowRankingPanel();
}