var gravitationalConstant = 5.0;

function FixedUpdate () {
	var planets = GameObject.FindGameObjectsWithTag("Planet");
	for(var planet in planets){
		var distance = Vector3.Distance(transform.position, planet.transform.position);
		var unitVector = planet.transform.position-transform.position;
		var sum = unitVector.x+unitVector.y+unitVector.z;
		unitVector /= Mathf.Abs(sum);
		rigidbody.AddForce((unitVector/distance)*gravitationalConstant);
	}
}