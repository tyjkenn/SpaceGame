using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

public class AsteroidBelt : MonoBehaviour {

    public int maxOffset = 5;
    public int amount = 20;
    public int diameter = 300;
    public Transform asteroid;
    public float orbitSpeed = .1f;

    void Start()
    {
        for (var i = 1; i <= amount; i++)
        {
            var rad = ((Mathf.PI * 2) / amount) * i;
            var xPos = Mathf.Sin(rad) * diameter + Random.Range(-maxOffset, maxOffset);
            var yPos = Mathf.Cos(rad) * diameter + Random.Range(-maxOffset, maxOffset);
            var zOffset = Random.Range(-maxOffset, maxOffset);
            Transform a;
            a = Instantiate(asteroid,
                new Vector3(xPos, yPos, zOffset),
                transform.rotation
            );
            a.transform.parent = this.transform;
            NetworkServer.Spawn(a.gameObject);
        }
    }

    void Update()
    {
        transform.Rotate(Vector3.forward * orbitSpeed, Space.Self);
    }
}
