var thrust = 5;
var turnThrust = .5;
var autoCorrectPath = 5.0;
var shot : Transform;
var cannon : Transform;
var explosion : Transform;
var shotRange : Transform;
var shootSpeed = 200;
var pNum = 1;
var fieldRadius = 200;
var respawnDelay = 0;
private var timer = 0;
private var crashed = false;

function FixedUpdate () {
	if(crashed) {
		timer++;
		if(timer>respawnDelay){
			timer = 0;
			respawn(Vector3(50,50,50),Vector3(0,0,0));
			crashed = false;
		}
	} else {
		if(Input.GetButton("Thrust"+ pNum)) {
			rigidbody.AddRelativeForce(Vector3.forward*thrust*Mathf.Pow(1,
			(-(transform.InverseTransformDirection(rigidbody.velocity).z/10))));
			rigidbody.AddRelativeForce(Vector3.left*transform.InverseTransformDirection(rigidbody.velocity).x*autoCorrectPath);
		}
		if(Input.GetButton("Brake"+pNum)){
			rigidbody.AddRelativeForce(Vector3.back*thrust*Mathf.Pow(1,
			((transform.InverseTransformDirection(rigidbody.velocity).z/10))));
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
			var target : GameObject = transform.Find("shotRange").GetComponent("ShootingRange").target.gameObject;
			theShot.GetComponent("Shot").target = target;
		}
	}
}

function explode() {
	var exp : Transform;
	exp = Instantiate(explosion,transform.position, transform.rotation);
	crashed = true;
}



function respawn(pos,rot) {
	transform.position = pos;
	transform.eulerAngles = rot;
	rigidbody.velocity = Vector3.zero;
	rigidbody.angularVelocity = Vector3.zero;
	crashed = false;
}

function OnCollisionEnter(other:Collision){
	if(other.collider.tag=="Obstacle" || other.collider.tag=="Planet") {
		explode();
	}
}