using UnityEngine;
using System.Collections;
using UnityEngine.Networking;

/// <summary>
/// Creates enemies at random locations around the stage perimeter. Because this is a NetworkBehavior, we can
/// tell Unity inside the editor that it should only exist on the server.
/// </summary>
public class EnemySpawn : NetworkBehaviour {

	public float spawnDistance = 300.0f;
	public float spawnDelay = 2.0f;//in seconds
	public Transform enemy;
	public Transform gameManager;

	private float timeSinceLastSpawn = 0.0f;

	// Use this for initialization
	void Start () {
	
	}
	
	void Update () {
		timeSinceLastSpawn += Time.deltaTime;
		if(timeSinceLastSpawn>spawnDelay){
			timeSinceLastSpawn -= spawnDelay;
			Transform theEnemy;
			theEnemy = Instantiate(enemy,Random.onUnitSphere * spawnDistance,Quaternion.identity) as Transform;
			theEnemy.GetComponent<Enemy>().LinkToGameManager(gameManager.GetComponent<GameManager>());
            //Even though the spawn only exists on the server, every enemy should be copied to every client. So
            //we "spawn" it.
            NetworkServer.Spawn(theEnemy.gameObject);
		}
	}
}