var reference :LeftConnerButton;
function Resume()
{
	reference .PauseOrResume();
}
function Restart()
{
	Application.LoadLevel(0);
	reference .PauseOrResume();	
}