#pragma strict

var painting1 : Material;
var painting2 : Material;

private var otherPainting : boolean;

function OnBecameInvisible(){
	otherPainting = !otherPainting;
	if(otherPainting) GetComponent.<Renderer>().material = painting2;
	else GetComponent.<Renderer>().material = painting1;
}