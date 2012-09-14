
function OnGUI () {
	GUILayout.BeginArea (Rect((Screen.width/2)-100, (Screen.height/2) , 200, 200));
	if(GUILayout.Button ("Play")){
		Application.LoadLevel("game");
	}
	GUILayout.EndArea ();

}