var maxOffset = 5;
var amount = 20;
var diameter = 300;
var asteroid : Transform;
var orbitSpeed = .1;

function Start(){
	for(var i = 1; i <= amount; i++) {
		var rad = ((Mathf.PI*2)/amount)*i;
		var xPos = Mathf.Sin(rad)*diameter+Random.Range(-maxOffset,maxOffset);
		var yPos = Mathf.Cos(rad)*diameter+Random.Range(-maxOffset,maxOffset);
		var a : Transform;
		a = Instantiate(asteroid, 
			Vector3(xPos,yPos,0),
			transform.rotation
		);
		a.transform.parent = this.transform;
	}
}

function Update () {
	transform.Rotate(Vector3.forward*orbitSpeed,Space.Self);
}