function Resume()
{
	if(GameStatus.Game.gamePause)
	{
		GameManagement.gameManagement.PauseOrResume();
		transform.parent.parent.position=Vector2(10000,0);
	}
}