using UnityEngine;
using System.Collections;

public class MainMenu : MonoBehaviour {

	int fontSize = 64;

	void OnGUI () {
		int sfs =  Mathf.Min(Mathf.FloorToInt(Screen.width * fontSize/1000), Mathf.FloorToInt(Screen.height * fontSize/1000));
		GUILayout.BeginArea (new Rect(Screen.width*.2f, Screen.height*.2f, Screen.width*.6f, Screen.height*.6f));
		GUILayout.Label("<size="+sfs+">Space Defender 3D</size>");
		if(GUILayout.Button ("<size="+sfs+">Tutorial</size>")){
			GetComponent<AudioSource>().Play();
			Application.LoadLevel("tutorial");
		}
		if(GUILayout.Button ("<size="+sfs+">Earth Defense</size>")){
			GetComponent<AudioSource>().Play();
			Application.LoadLevel("game");
		}
		if(GUILayout.Button ("<size="+sfs+">Training</size>")){
			GetComponent<AudioSource>().Play();
			Application.LoadLevel("distance");
		}
		if(GUILayout.Button ("<size="+sfs+">Credits</size>")){
			GetComponent<AudioSource>().Play();
		}
		GUILayout.EndArea ();
		
	}
	
	void Start(){
		PlayerPrefs.DeleteAll();
		if(!PlayerPrefs.HasKey ("highScorePlayer1")) PlayerPrefs.SetString("highScorePlayer1","Nebulaton");
		if(!PlayerPrefs.HasKey ("highScorePlayer2")) PlayerPrefs.SetString("highScorePlayer2","Xenalha");
		if(!PlayerPrefs.HasKey ("highScorePlayer3")) PlayerPrefs.SetString("highScorePlayer3","Zorgohn");
		if(!PlayerPrefs.HasKey ("highScorePlayer4")) PlayerPrefs.SetString("highScorePlayer4","Phleniph");
		if(!PlayerPrefs.HasKey ("highScorePlayer5")) PlayerPrefs.SetString("highScorePlayer5","Quazatali");
		if(!PlayerPrefs.HasKey ("highScore1")) PlayerPrefs.SetInt("highScore1",100);
		if(!PlayerPrefs.HasKey ("highScore2")) PlayerPrefs.SetInt("highScore2",70);
		if(!PlayerPrefs.HasKey ("highScore3")) PlayerPrefs.SetInt("highScore3",50);
		if(!PlayerPrefs.HasKey ("highScore4")) PlayerPrefs.SetInt("highScore4",30);
		if(!PlayerPrefs.HasKey ("highScore5")) PlayerPrefs.SetInt("highScore5",10);
		
	}
}
