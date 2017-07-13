#pragma strict

enum Axis{
	X,
	Y,
	Z
};

var axis : Axis;

var lower : float;
var lowerType : String;
var upper : float;
var upperType : String;

function Update () {
	if(lowerType!=null && upperType != null){
		var type1 : ObjectType = GetComponent(Universe).GetObjectType(lowerType);
		var type2 : ObjectType = GetComponent(Universe).GetObjectType(upperType);
		if(axis==Axis.X){
			if(transform.position.x<=lower) {
				type1.chance = 1;
				type2.chance = 0;
			}else if(transform.position.x>=upper) {
				type1.chance = 0;
				type2.chance = 1;
			} else {
				type2.chance = (transform.position.x-lower)/(upper-lower);
				type1.chance = 1-type2.chance;
			}
		} else if(axis==Axis.Y){
			if(transform.position.y<=lower) {
				type1.chance = 1;
				type2.chance = 0;
			}else if(transform.position.y>=upper) {
				type1.chance = 0;
				type2.chance = 1;
			} else {
				type2.chance = (transform.position.y-lower)/(upper-lower);
				type1.chance = 1-type2.chance;
			}
		} else if(axis==Axis.Z){
			if(transform.position.z<=lower) {
				type1.chance = 1;
				type2.chance = 0;
			}else if(transform.position.z>=upper) {
				type1.chance = 0;
				type2.chance = 1;
			} else {
				type2.chance = (transform.position.z-lower)/(upper-lower);
				type1.chance = 1-type2.chance;
			}
		}
	}
}