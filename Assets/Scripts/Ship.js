var thrust = 5;
var turnThrust = .5;
var autoCorrectPath = 5.0;
var shot : Transform;
var cannon : Transform;
var shootSpeed = 2000;
var pNum = 1;
var fieldRadius = 200;

function FixedUpdate () {
	if(Input.GetButton("Thrust"+ pNum)) {
		print(Vector3.forward*thrust*Mathf.Pow(1,-1));
		rigidbody.AddRelativeForce(Vector3.forward*thrust*Mathf.Pow(1,
		(-(transform.InverseTransformDirection(rigidbody.velocity).z/10))));
		rigidbody.AddRelativeForce(Vector3.left*transform.InverseTransformDirection(rigidbody.velocity).x*autoCorrectPath);
	}
	rigidbody.AddRelativeTorque(-Vector3.right*Input.GetAxis("Vertical"+ pNum)*turnThrust);
	rigidbody.AddRelativeTorque(Vector3.up*Input.GetAxis("Horizontal"+ pNum)*turnThrust);
	
	if(Input.GetButton("Stabilize"+ pNum)) rigidbody.angularVelocity *= .95;
	
	if(Input.GetButtonDown("Shoot"+ pNum)) {
		var theShot : Transform;
		theShot = Instantiate(shot,cannon.transform.position,cannon.transform.rotation);
		theShot.rigidbody.velocity = rigidbody.velocity;
		theShot.rigidbody.AddRelativeForce(Vector3.forward*shootSpeed);
	}
	
	//if player is moving out of range
	

}

function explode() {
	
}



function respawn(pos,rot) {
	transform.position = pos;
	transform.rotation = rot;
}

function OnCollisionEnter(other:Collision){
	if(other.collider.tag=="Obstacle") {
		respawn(Vector3(50,50,50),Vector3(0,0,0));
	}
}