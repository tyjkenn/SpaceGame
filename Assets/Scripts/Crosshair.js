var target : Transform;
var targeter : GameObject;

function Update () {
	if(target != null){
		transform.position = target.position;
	}
}

public function setTarget(tar : Transform){
	target = target;
}