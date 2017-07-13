using UnityEngine;
using System.Collections;
using System.Linq;

public class Forcefield : MonoBehaviour {
	public Vector2 scroll;
	public Renderer rend;
	public Transform ship;
	// Use this for initialization
	void Start () {
		Mesh mesh = GetComponent<MeshFilter>().mesh;
		mesh.triangles = mesh.triangles.Reverse().ToArray();
		rend = GetComponent<Renderer>();
	}
	
	// Update is called once per frame
	void Update () {
		Vector2 offset = Time.time * scroll;
		rend.material.SetTextureOffset("_MainTex", offset);
		Color c = rend.material.color;
		c.a = (ship.transform.position.magnitude-150f)/100f;
		rend.material.color = c;
	}
}