using UnityEngine;
using System.Collections;

public class TutTarget : MonoBehaviour {

	public Transform cam;

	private int visibleCount = 0;

	void OnTriggerEnter(Collider other){
		if(other.tag=="Ship"){
			cam.GetComponent<Tutorial>().CompleteObjective();
			transform.position = new Vector3(0,0,-1000);
		}
	}

	void Update(){
		if(cam.GetComponent<Tutorial>().objective==1){
			transform.position = cam.position+(Vector3.back*1000);
			if(GetComponent<Renderer>().isVisible) {
				visibleCount++;
				if(visibleCount>=2) cam.GetComponent<Tutorial>().CompleteObjective();
			}
		}
	}
}
