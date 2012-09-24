
function OnGUI () {
	GUILayout.BeginArea (Rect((Screen.width/2)-100, (Screen.height/2) , 200, 200));
	if(GUILayout.Button ("Multiplayer Split-Screen")){
		Application.LoadLevel("game");
	}
	GUILayout.EndArea ();

}