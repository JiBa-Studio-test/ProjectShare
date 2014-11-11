var mainMenu:GameObject;
function Start()
{
	GameStatus.Game.gamePause=false;
	//mainMenu=GameObject.Find("MainMenu");
	mainMenu.SetActive(false);
}

function PauseOrResume()
{
	if(GameStatus.Game.gamePause)
	{
		Time.timeScale=1;
		GameStatus.Game.gamePause=false;
		mainMenu.SetActive(false);
	}
	else
	{
		Time.timeScale=0;
		GameStatus.Game.gamePause=true;
		mainMenu.SetActive(true);
	}
	
}