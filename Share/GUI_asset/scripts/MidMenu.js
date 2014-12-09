var reference :PauseButton;
function Resume()
{
	reference .PauseOrResume();
}
function Restart()
{
	GameManagement.gameManagement.Reset();
	Application.LoadLevel(0);
	reference .PauseOrResume();	
}