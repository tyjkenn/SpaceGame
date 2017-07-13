#pragma strict

function LateUpdate () {
	transform.Translate(Vector3.right*Input.GetAxis("Horizontal")*.2);
	transform.Translate(Vector3.up*Input.GetAxis("Vertical")*.2);
}