var thrust = 5;
var turnThrust = .5;
var autoCorrectPath = 5;
var shot : Transform;
var cannon : Transform;

function FixedUpdate () {
	if(Input.GetButton("Thrust")) {
		rigidbody.AddRelativeForce(Vector3.forward*thrust);
		rigidbody.AddRelativeForce(Vector3.left*transform.InverseTransformDirection(rigidbody.velocity).x*autoCorrectPath);
	}
	
	rigidbody.AddRelativeTorque(-Vector3.right*Input.GetAxis("Vertical")*turnThrust);
	rigidbody.AddRelativeTorque(Vector3.up*Input.GetAxis("Horizontal")*turnThrust);
	
	if(Input.GetButton("Stabilize")) rigidbody.angularVelocity *= .95;
	
	if(Input.GetButtonDown("Shoot")) {
		var s : Transform;
		s = Instantiate(shot,cannon.transform.position,cannon.transform.rotation);
	}

}

function explode() {
	
}



function respawn(pos,rot) {
	transform.position = pos;
	if(transform.rotation != null) transform.rotation = rot;
}

function OnCollisionEnter(other:Collision){
	if(other.collider.tag=="Obstacle") {
		respawn(Vector3.zero,Vector3(0,0,0));
	}
}