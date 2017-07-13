using UnityEngine;
using System.Collections;

public class Crosshair : MonoBehaviour {

	public Transform target;
	public GameObject targeter;

	// Update is called once per frame
	void Update () {
		if(target != null){
			GetComponent<Renderer>().enabled = true;
			transform.position = target.position;
		} else {
			GetComponent<Renderer>().enabled = false;
		}
	}

	public void setTarget(Transform tar){
		target = tar;
	}
}
