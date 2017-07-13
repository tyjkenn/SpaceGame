using UnityEngine;
using System.Collections;

public class Booster : MonoBehaviour {


	void OnTriggerEnter(Collider other){
		Debug.Log (other);
		if(other.tag=="Ship"){
			Debug.Log ("Booster knows it is a ship");
			other.GetComponent<Ship>().Boost();
		}
	}
}
