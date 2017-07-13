using UnityEngine;
using System.Collections;

public class GameManager : MonoBehaviour {

	public int planetHealth = 20;
	public int enemiesKilled = 0;
	public bool gameOver = false;
    public GameObject cam;

	public int playerRank = 6;
	public string playerName = "Joe Schmoe";
	int fontSize = 34;

	void Awake(){
		DontDestroyOnLoad(transform.gameObject);
	}
	void OnGUI () {
		cam.GetComponent<RadarArrows>().size = Screen.height/15;
		int sfs =  Mathf.Min(Mathf.FloorToInt(Screen.width * fontSize/1000), Mathf.FloorToInt(Screen.height * fontSize/1000));
		if(gameOver){
			GUILayout.BeginArea(new Rect(0, 0, Screen.width, Screen.height));
			GUILayout.FlexibleSpace(); 
			GUILayout.BeginVertical(); 
			GUILayout.FlexibleSpace();
			CenterText("<size="+sfs+">Game Over</size>");
			CenterText("<size="+sfs+">High scores</size>");
			for(int i = 1; i<=5; i++){
				CenterText("size="+sfs+">"+i+". "+PlayerPrefs.GetString("highScorePlayer"+i)+": "+PlayerPrefs.GetInt("highScore"+i)+"</size>");
			}
			CenterText("<size="+sfs+">Total Aliens Defeated: "+enemiesKilled+"</size>");
			if(playerRank<6){
				CenterText ("<size="+sfs+">You set a new high score!</size>");
				GUILayout.BeginHorizontal();
				GUILayout.FlexibleSpace();
				GUILayout.Label ("<size="+sfs+">Enter your name: </size>");
				playerName = GUILayout.TextField(playerName,25);
				if(GUILayout.Button ("<size="+sfs+">Submit</size>")){
					//bump other high scores down
					for(int i = 5; i>playerRank;i--){
						PlayerPrefs.SetString("highScorePlayer"+i,PlayerPrefs.GetString("highScorePlayer"+(i-1)));
						PlayerPrefs.SetInt("highScore"+i,PlayerPrefs.GetInt ("highScore"+(i-1)));
					}
					PlayerPrefs.SetString("highScorePlayer"+playerRank,playerName);
					PlayerPrefs.SetInt("highScore"+playerRank,enemiesKilled);
					playerRank = 6;
				}
				GUILayout.FlexibleSpace();
				GUILayout.EndHorizontal();
			} else {
				if(GUILayout.Button ("<size="+sfs+">Retry</size>")){
					Application.LoadLevel("menu");
					Destroy (gameObject);
				}
			}
			GUILayout.FlexibleSpace(); 
			GUILayout.EndVertical(); 
			GUILayout.FlexibleSpace();
			GUILayout.EndArea ();
		}else{
			GUILayout.Label ("<size="+sfs+">Planet Health: "+planetHealth+"</size>");
			GUILayout.Label ("<size="+sfs+">Enemies Killed: "+enemiesKilled+"</size>");
		}
	}

	public void CenterText(string label){
		GUILayout.BeginHorizontal();
		GUILayout.FlexibleSpace();
		GUILayout.Label(label);
		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();
	}

	public void TakeHit(int hit){
		planetHealth -= hit;
	}

	void Update(){
		if(planetHealth <= 0){
			Destroy(cam.GetComponent("FollowCamera"));
			gameOver = true;
			//check to see if a high score has been broken
			for(int i = 1; i<=5; i++){
				if(enemiesKilled > PlayerPrefs.GetInt ("highScore"+i)){
					playerRank = i;
					break;
				}
			}
			planetHealth = 20;
			Application.LoadLevel("end");
		}
	}

}
