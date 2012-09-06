var speed: float = 2.5;
var target : Transform;

function FixedUpdate(){

    transform.position = Vector3.Lerp(transform.position, target.transform.position, speed*Time.deltaTime);
    var newRot = Quaternion.Euler(target.transform.eulerAngles); // get the equivalent quaternion
    transform.rotation = Quaternion.Slerp(transform.rotation, newRot, speed*Time.deltaTime);
}
