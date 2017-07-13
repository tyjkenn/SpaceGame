using UnityEngine;
using System.Collections;

public class Tutorial : MonoBehaviour {

	public GUISkin skin;
	public Transform target;
	public Transform ship;
	public Transform enemy;
	public int objective = 0;
	public int enemiesOut = 0;
	public float timer = 0f;
	bool paused = false;
	// Update is called once per frame
	void Update () {
		if(objective == 2){
			if(ship.GetComponent<Ship>().touchState==1 && ship.GetComponent<Rigidbody>().angularVelocity.magnitude<.04){
				CompleteObjective();
			}
		}else if(objective==3){
			if(ship.Find("shotRange").GetComponent<ShootingRange>().target!=null){
				CompleteObjective();
			}
		} else if(objective==4){
			if(enemiesOut<=0){
				enemiesOut = 0;
				timer += Time.deltaTime;
				if(timer>=2) CompleteObjective();
			}
		}
	}

	string[] instructions = new string[6]{
	    "Welcome to earth defense training. Begin by testing the forward thrust touching the right side of the screen.",
	    "Now that you got that down, trying turning by tilting the device",
		"You'll probably be dizzy soon. Straighten out by touching the left side of the screen.",
		"Your first target approaches. You'll find it under the green arrow. Fly in range.",
		"The target in now in range, as shown by the red box. While still in range, touch both sides of the screen to shoot",
		"Congratulations! You have mastered your training and are ready to defend earth."
	};
	string[] shortInstructions = new string[6]{
		"Thrust toward the red region by touching on the right",
		"Turn around by tilting",
		"Stabilize by wouching the left side of the screen",
		"Get close to the target ship",
		"Press both sides to fire at the target while in range",
		""
	};

	void Start(){
		Pause ();
	}

	void OnGUI(){
		GUI.skin = skin;
		if(paused) DisplayInstructions();
		else GUI.Box (new Rect(0,0,Screen.width,30),shortInstructions[objective]);
		if(GUI.Button(new Rect(0,0,60,30),"Reset")){
			Pause();
		}
	}

	void DisplayInstructions(){
		GUI.Box (new Rect(0,0,Screen.width,Screen.height),"");
		GUI.Label (new Rect(Screen.width*.25f,Screen.height*.2f,Screen.width*.5f,Screen.height*.4f), instructions[objective]);
		if(GUI.Button (new Rect(Screen.width*.25f,Screen.height*.7f,Screen.width*.5f,Screen.height*.1f),
		          "Begin")){
			Unpause();
		}
	}

	void Pause(){
		Time.timeScale = 0;
		ship.GetComponent<Ship>().enabled = false;
		paused = true;
	}
	void Unpause(){
		Time.timeScale = 1;
		ship.GetComponent<Ship>().enabled = true;
		paused = false;
		if(objective==5){
			Application.LoadLevel("menu");
		}
	}

	public void CompleteObjective() {
		objective++;
		if(objective == 3){
			Transform theEnemy = Instantiate(enemy,(Vector3.forward*600)+(Vector3.forward*transform.position.z),Quaternion.identity) as Transform;
			theEnemy.GetComponent<Enemy>().moving = false;
			enemiesOut++;
		}
		Pause();
	}
}
