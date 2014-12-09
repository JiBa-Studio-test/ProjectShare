function Resume()
{
	if(GameStatus.Game.gamePause)
	{
		Time.timeScale=1;
		GameStatus.Game.gamePause=false;
		transform.parent.parent.position=Vector2(10000,0);
	}
}