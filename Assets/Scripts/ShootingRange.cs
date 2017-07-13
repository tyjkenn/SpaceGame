using UnityEngine;
using System.Collections;

public class ShootingRange : MonoBehaviour {

	public Transform crosshairs;
	public Collider target;
	public Transform crosshair;
	public float shortestDist = Mathf.Infinity;

	// Use this for initialization
	void Start () {
		crosshair = Instantiate(crosshairs,Vector3.zero,Quaternion.identity) as Transform;
	}

	void OnTriggerStay(Collider other){
		if(other.tag == "Enemy") {
			float dist = Vector3.Distance(other.transform.position,transform.position);
			if(dist<shortestDist){
				crosshair.GetComponent<Renderer>().enabled = true;
				Crosshair o;
				o = crosshair.GetComponent<Crosshair>();
				o.target = other.transform;
				o.targeter = gameObject;
				target = other;
				shortestDist = dist;
			}
		}
	}
	void Update(){
		if(target==null){
			shortestDist = Mathf.Infinity;
		}
	}
	
	// Update is called once per frame
	void OnTriggerExit(Collider other){
		if(target==other){
			target=null;
			crosshair.GetComponent<Crosshair>().target = null;
			shortestDist = Mathf.Infinity;
		}
	}
}
