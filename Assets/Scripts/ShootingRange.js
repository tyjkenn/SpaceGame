var crosshairs : Transform;
var target : Collider;
var ch : Transform;

function OnTriggerEnter(other:Collider){
	if(other.tag == "Ship") {
		ch = Instantiate(crosshairs,other.transform.position,other.transform.rotation);
		var o : Crosshair;
    	o = ch.GetComponent("Crosshair");
    	o.target = other.transform;
    	o.targeter = gameObject;
    	target = other;
	}
}
function OnTriggerExit(other:Collider){
	if(other.tag == "Ship") {
		Destroy(ch.gameObject);
		target = null;
	}
}