private var xr;
private var yr;
var maxXRotation = 2;
var maxYRotation = 2;

function Start() {
	xr = Random.Range(-maxXRotation,maxXRotation);
	yr = Random.Range(-maxYRotation,maxYRotation);
}


function Update () {
	transform.Rotate(Vector3(xr,yr,0));
}