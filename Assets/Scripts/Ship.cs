using UnityEngine;
using System.Collections;
using UnityEngine.Networking;

public class Ship : NetworkBehaviour {
	
	public int thrust = 5;	//forward thrust power
	public float turnThrust = .5f;	//torque added to ship when turning
	public float autoCorrectPath = 5.0f;	//too much side-drifting just makes the game frustratingly impossible
	public Transform cannon;	//child object from which to launch lightning
	public Transform explosion; //special effects prefab when the ship or the enemy dies
	public Transform shotRange; //invisible child object trigger to test for enemies in range
	public Transform thruster; //special effect child object to go behind the ship
	public Transform noTargetShot;	//special effect prefab to show when player tries firing when enemies are not in range
	public int shootSpeed = 200; 
	public int fieldRadius = 200;
	public float respawnDelay = 0f;
	public float control = .3f;
	public float maxSpeed = 100f;
	public Transform cam;
	public float boostLength = 3f;
	public float boostForce = 10;
	public float boostMaxSpeed = 300;
	public float shootRechargeTime = .5f;
	public int touchState = 0;

	private float timer = 0f;
	private bool crashed = false;
	private float boostingTime = 0f;

    //This marks the following variable as something that should be synced with the other clients. Whenever there is
    //a change in this variable, it is suppose to notify the server so the player's ship on every client reflects that
    //change.
    [SyncVar]
	public bool boosting = false;
	private float shootTimer = 0f;

	void Start(){
		Input.gyro.enabled = true;
        if (isLocalPlayer)
        {
            GameObject.FindGameObjectWithTag("MainCamera").GetComponent<FollowCamera>().target = transform.FindChild("cameraPoint");
            var forcefields = FindObjectsOfType<Forcefield>();
            foreach (var field in forcefields)
            {
                field.ship = transform;
            }
        }
	}

	void FixedUpdate () {
        if (!isLocalPlayer)
        {
            return;
        } else
        {
            if (boosting)
            {
                thruster.GetComponent<ParticleSystem>().enableEmission = true;
                GetComponent<AudioSource>().enabled = true;
            }
            else
            {
                GetComponent<AudioSource>().enabled = false;
                thruster.GetComponent<ParticleSystem>().enableEmission = false;
            }
        }

        Rigidbody rb = GetComponent<Rigidbody>();

		//apply boosters
		if(boosting){
			Debug.Log("Boosting for "+boostingTime+" seconds");
			boostingTime += Time.fixedDeltaTime;
			rb.AddRelativeForce (Vector3.forward*boostForce);
			if(boostingTime>= boostLength){
				Debug.Log ("Done boosting");
				boosting = false;
			}
		}
		if(crashed) {
			timer+=Time.fixedDeltaTime;
			if(timer>respawnDelay){
				timer = 0;
				respawn(new Vector3(50,50,50),Quaternion.identity);
				crashed = false;
			}
		} else {
			bool mobile = true;
			touchState = 0;
			float verticalAxis = 0;
			float horizontalAxis = 0;
			if(Application.platform==RuntimePlatform.Android || Application.platform==RuntimePlatform.IPhonePlayer){
				mobile = true;
			}
			mobile = false;
			if(mobile){
			//Get gyro turn
				Vector3 gyroDiff = Input.gyro.rotationRateUnbiased *180/Mathf.PI;//Input.gyro.attitude.eulerAngles-gyroCalibration.eulerAngles;
				touchState = 0;
				foreach(Touch touch in Input.touches){
					if (touch.phase != TouchPhase.Ended && touch.phase != TouchPhase.Canceled){
						if(touch.position.x<Screen.width/2 && touchState<=2){
							touchState += 1; //left side(stabilize) pressed
						} else if(touch.position.x>Screen.width/2 && touchState<=1){
							touchState += 2; //right side(thruster) pressed
						}
						//both touches, touchState = 3, shoot
					}
				}
				verticalAxis = gyroDiff.x/80f;
				horizontalAxis = -gyroDiff.y/80f;
			} else mobile = false;
			if((!mobile && Input.GetButton("Thrust"))||(mobile && touchState==2)) {
				Vector3 relVelocity = transform.InverseTransformVector(rb.velocity);
				//give speed cap and more control
				float thrustMult = Mathf.Pow((maxSpeed - relVelocity.z)/maxSpeed,2);
				rb.AddRelativeForce(Vector3.forward*thrust*thrustMult);
				relVelocity.x *= 1.0f-control;
				relVelocity.y *= 1.0f-control;
				rb.velocity = transform.TransformVector(relVelocity);
				thruster.GetComponent<ParticleSystem>().enableEmission = true;
				GetComponent<AudioSource>().enabled = true;
			} else{
				GetComponent<AudioSource>().enabled = false;
				thruster.GetComponent<ParticleSystem>().enableEmission = false;
			}
			if(mobile && touchState != 1){
				rb.AddRelativeTorque(-Vector3.right*verticalAxis*turnThrust);
				rb.AddRelativeTorque(Vector3.up*horizontalAxis*turnThrust);
			} else {
				rb.AddRelativeTorque(-Vector3.right*Input.GetAxis("Vertical")*turnThrust);
				rb.AddRelativeTorque(Vector3.up*Input.GetAxis("Horizontal")*turnThrust);
			}
			
			if((!mobile && Input.GetButton("Stabilize")||
			    (mobile && touchState==1))) {
				rb.angularVelocity *= .95f;
			}
			
			if((!mobile && Input.GetButtonDown("Shoot")||
			    (mobile && touchState == 3))) {
				if(shootTimer>=shootRechargeTime){
					shootTimer = 0f;
					Collider target = transform.Find("shotRange").GetComponent<ShootingRange>().target;
					transform.Find ("cannon").GetComponent<AudioSource>().Play();
					if(target==null) {
                        CmdEmptyShoot();
					}else{
						if(cannon.GetComponent<LightningBolt>().target==null){
							cannon.GetComponent<LightningBolt>().target = target.transform;
							target.GetComponent<Enemy>().TakeHit(transform);
							if(cam.GetComponent<GameManager>()){
								cam.GetComponent<GameManager>().enemiesKilled++;
							}
							if(cam.GetComponent<Tutorial>()){
								cam.GetComponent<Tutorial>().enemiesOut--;
							}
						}
					}
				}
			}
			shootTimer += Time.fixedDeltaTime;
		}
	}

    //This means the method is called by a client, but executed by the server. Every time this method is called,
    //a message get sent to the server telling it to call this method.
    [Command]
    void CmdEmptyShoot()
    {
        Transform theShot = Instantiate(noTargetShot, cannon.position, cannon.rotation) as Transform;
        theShot.parent = transform;
        NetworkServer.Spawn(theShot.gameObject); //tell the server that the object should be copied on all clients.
        Destroy(theShot.gameObject, 1);
    }

	void explode() {
		Transform exp;
		exp = Instantiate(explosion,transform.position, transform.rotation) as Transform;
		exp.parent = transform;
		crashed = true;
	}



	void respawn(Vector3 pos,Quaternion rot) {
		transform.position = pos;
		transform.rotation = rot;
		GetComponent<Rigidbody>().velocity = Vector3.zero;
		GetComponent<Rigidbody>().angularVelocity = Vector3.zero;
		crashed = false;
	}

	void OnCollisionEnter(Collision other){
		if(other.gameObject.tag=="Obstacle" || other.gameObject.tag=="Planet") {
			explode();
		}
	}

	void OnTriggerExit(Collider other){
		if(other.tag=="Forcefield"){
			explode();
		}
	}
	public void Boost(){
		Debug.Log ("Ship knows to boost");
		boosting = true;
		boostingTime = 0f;
	}
}