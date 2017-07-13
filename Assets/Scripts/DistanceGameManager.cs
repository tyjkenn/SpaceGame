using UnityEngine;
using System.Collections;

public class DistanceGameManager : MonoBehaviour {

	public Transform ship;
	public float difficultyIncreaseRate = 30000;
	public float maxEnemyChance = .1f;
	public float maxBoxChance = .4f;
	public Transform deathBack;
	public float deathBackSpeed = .5f;

	private Universe obVerse;

	// Use this for initialization
	void Start () {
		Universe[] universes = ship.GetComponents<Universe>();
		foreach(Universe univ in universes){
			if(univ.GetObjectType("Enemy")!=null) {
				obVerse = univ;
			}
		}
		deathBack.position = new Vector3(0,0,-100);
	}
	
	// Update is called once per frame
	void Update () {
		if(ship.position.z > 0){
			float enemyChance = -maxEnemyChance/(ship.position.z/difficultyIncreaseRate+1) + maxEnemyChance;
			obVerse.GetObjectType("Enemy").chance = enemyChance;
			float boxChance = -maxBoxChance/(ship.position.z/difficultyIncreaseRate+1) + maxBoxChance;
			obVerse.GetObjectType("TunnelObstacle").chance = boxChance;
		}
	}
	void FixedUpdate(){
		deathBack.Translate(new Vector3(0,0,-deathBackSpeed));
	}

	void OnGUI(){
		GUI.Label (new Rect(5,5,200,30),"Distance: "+(int)ship.position.z);
	}
}
