using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FollowCamera : MonoBehaviour {

    public float speed = 2.5f;
    public Transform target;
	
	void FixedUpdate () {
        transform.position = Vector3.Lerp(transform.position, target.transform.position, speed * Time.deltaTime);
        var newRot = Quaternion.Euler(target.transform.eulerAngles); // get the equivalent quaternion
        transform.rotation = Quaternion.Slerp(transform.rotation, newRot, speed * Time.deltaTime);
    }
}