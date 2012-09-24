private var target : GameObject;
var targetForce = 200;
var maxSpeed = 1000;

function Update () {
	if(target != null){
		var diff = target.transform.position - transform.position;
		var sum = diff.x+diff.y+diff.z;
		var unitVector = diff / Mathf.Abs(sum);
		rigidbody.AddForce(unitVector*targetForce);
		if(rigidbody.velocity.magnitude>maxSpeed){
			rigidbody.AddForce(-rigidbody.velocity);
		}
	}
}
function OnCollisionEnter(collision : Collision){
	if(collision.gameObject.tag=="Ship"){
		Destroy(gameObject);
	}
}