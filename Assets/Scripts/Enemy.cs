using UnityEngine;
using System.Collections;
using UnityEngine.Networking;

/// <summary>
/// Represents an alien that flies toward Earth to destroy it. IT is syncronized across all clients.
/// </summary>
public class Enemy : NetworkBehaviour {

	public float speed = 5.0f;
	public Transform explosion;
	public bool moving = false;
	private GameManager gameManager;
	private float timeUntilKill = .5f;
    [SyncVar] //This needs to be synced, so the alien gets destroyed on all clients
    public bool beingShotAt = false;
	private Transform attacker;

	void Start(){
		transform.LookAt(Vector3.zero);
	}

	void OnTriggerEnter(Collider other){
		if(other.tag == "Planet"){
            FindObjectOfType<ServerManager>().CmdSubtractHealth();
			Destroy(gameObject);
		}
	}

	public void LinkToGameManager(GameManager gm){
		gameManager = gm;
	}
	
	// Update is called once per frame
	void Update () {
		//in the tutorial, the enemies are stationary
		if(moving){
			transform.position = Vector3.MoveTowards(transform.position,Vector3.zero,speed*Time.deltaTime);
		}
		if(beingShotAt){
			timeUntilKill -= Time.deltaTime;
			if(timeUntilKill<=0){
				//reset
				attacker.GetComponent<Ship>().shotRange.GetComponent<ShootingRange>().crosshair.GetComponent<Crosshair>().target = null;
				attacker.GetComponent<Ship>().cannon.GetComponent<LightningBolt>().target = null;
				Instantiate(explosion,transform.position, transform.rotation);
				Destroy (gameObject);
			}
		}
	}

	public void TakeHit(Transform player){
		attacker = player;
		beingShotAt = true;
	}
}