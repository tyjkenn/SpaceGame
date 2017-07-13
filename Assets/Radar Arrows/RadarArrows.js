#pragma strict

var arrow : Texture; //the texture for your arrow
var size : float = 30; //dimension (width and height should be the same)
var tagToFind :String = "Enemy"; //the tag that the script looks for
var hoverOnScreen : boolean= true; //whether arrows should appear over the object onscreen
var distanceAbove :float = 1; //if hoverOnScreen, the distance above the arrow should hover
var blindSpot : float = .5;  //how much behind the camera should be discounted in rendering arrows
var hoverAngle : float = 270; //rotation of arrows for objects on-screen

private var xCenter : float; //center of screen horizontally
private var yCenter : float; //center of screen vertically
private var halfSize : float; //half of the dimension
private var screenSlope : float; //slope diagonally across the screen
private var errorless : boolean = false; //whether the program will execute
private var cam : Camera; //your camera

function Start(){
	cam = gameObject.GetComponent(Camera);
	if(cam) {//if object is a camera
		if(arrow!=null){
			errorless = true; //free of errors
		}else{
			Debug.Log("Please attach an arrow texture to the RadarArrow script.");
			errorless = false;
		}
	} else {
		Debug.Log("RadarArrows must be attached to a camera.");
		errorless = false;
	}
}

function OnGUI() {
	//weird things happen when we execute every OnGUI
	if(Event.current.type.Equals(EventType.Repaint) && errorless){
		//set up (in case of screen change)
		xCenter = cam.pixelWidth/2;
		yCenter = cam.pixelHeight/2;
		var sw : float = cam.pixelWidth;
		var sh : float = cam.pixelHeight;
		screenSlope = sh/sw;
		halfSize = size/2;
		//find all the objects with the tag
		var objects = GameObject.FindGameObjectsWithTag(tagToFind);
		//loop through objects with the tag
		for(var ob : GameObject in objects) {
			//find the obejct relative to the camera
			var angle = hoverAngle-180;
			var rad = angle*(Mathf.PI/180.0);
			var arrowPos = cam.transform.right*Mathf.Cos(rad)+cam.transform.up*Mathf.Sin(rad);
			var worldPos = ob.transform.position + (arrowPos * distanceAbove);
	        var pos = cam.WorldToViewportPoint(worldPos);
	        if(pos.z<0){
	        	pos.x*=-1;
	        	pos.y*=-1;
	        }
	        //proceed with drawing only if the object is not in the blind spot
	        if(pos.z>0 || (pos.z<0 && (pos.x>.5+(blindSpot/2)||pos.x<.5-(blindSpot/2)) 
	        		&& (pos.y<.5-(blindSpot/2)||pos.y>.5+(blindSpot/2)))){
	        	//find the new position
	            var newX = pos.x*cam.pixelWidth;
	            //camera coordinates are reversed vertically compared to pixel coordinates
	            var newY = cam.pixelHeight-pos.y*cam.pixelHeight; 
	            //if the object is offscreen
	           	if(pos.z<0 || (newY<0 || newY>cam.pixelHeight || newX<0 || newX>cam.pixelWidth)){
	           		var a = CalculateAngle(cam.pixelWidth/2,cam.pixelHeight/2,newX,newY);
	           		var coord = ProjectToEdge(newX,newY);
	                GUIUtility.RotateAroundPivot(a, coord);
	                Graphics.DrawTexture(Rect(coord.x-halfSize,coord.y-halfSize,size,size),arrow);
	                GUIUtility.RotateAroundPivot(-a, coord);
	            }else if(hoverOnScreen){ //if the object is on-screen, draw hover arrows
	            	var nh = Mathf.Sin(rad)*size;
	            	var nw = Mathf.Cos(rad)*size;
	            	//when on-screen, just rotate 90 degrees and draw
	            	GUIUtility.RotateAroundPivot(-angle+180, Vector2(newX+nw, newY-nh));
	                Graphics.DrawTexture(Rect(newX+nw,newY-nh-halfSize,size,size),arrow,null);
	                GUIUtility.RotateAroundPivot(angle-180, Vector2(newX+nw, newY-nh));
		        }
			}
		} 
	}
}

//calculates the angle to rotate the arrow
function CalculateAngle(x1:float,y1:float,x2:float,y2:float) {
	var xDiff = x2-x1;
	var yDiff = y2-y1;
	var rad = Mathf.Atan(yDiff/xDiff);
	var deg = rad*180/Mathf.PI;
	if(xDiff<0) {
		deg+=180;
	}
	return deg;
}

//moves the arrow from the center to the edge of the screen
function ProjectToEdge(x2:float,y2:float){
	var xDiff : float = x2-(cam.pixelWidth/2);
	var yDiff : float = y2-(cam.pixelHeight/2);
	var slope : float = yDiff/xDiff;
	var coord = Vector2(0,0);
	var ratio : float;
	if(slope>screenSlope || slope<-screenSlope){
		//project on top/bottom
		ratio = (yCenter-halfSize)/yDiff;
		if(yDiff<0){
			coord.y = halfSize;
			ratio*=-1;
		}else coord.y = cam.pixelHeight-halfSize;
		coord.x = xCenter+xDiff*ratio;
	}else{
		//project on left/right
		ratio = (xCenter-halfSize)/xDiff;
		if(xDiff<0){
			coord.x = halfSize;
			ratio*=-1;
		}else coord.x = cam.pixelWidth-halfSize;
		coord.y = yCenter+yDiff*ratio;
	}
	return coord;
}