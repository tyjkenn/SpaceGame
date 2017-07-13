using UnityEngine;
using System.Collections;

public class RadarArrows : MonoBehaviour {

	public Texture arrowGreen; //the texture for your arrow
	public Texture arrowYellow;
	public Texture arrowRed;
	public float size = 30; //dimension (width and height should be the same)
	public string tagToFind = "Enemy"; //the tag that the script looks for
	public bool hoverOnScreen = true; //whether arrows should appear over the object onscreen
	public float distanceAbove = 1; //if hoverOnScreen, the distance above the arrow should hover
	public float blindSpot = .5f;
	public float hoverAngle = 270;

	private float xCenter; //center of screen horizontally
	private float yCenter; //center of screen vertically
	private float halfSize; //half of the dimension
	private float screenSlope; //slope diagonally across the screen
	private bool errorless = false; //whether the program will execute
	private Camera cam; //your camera

	// Use this for initialization
	void Start () {
		cam = gameObject.GetComponent<Camera>();
		if(cam!=null) {//if object is a camera
			if(arrowGreen!=null){
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
	
	void OnGUI() {
		//weird things happen when we execute every OnGUI
		if(Event.current.type.Equals(EventType.Repaint) && errorless){
			//set up (in case of screen change)
			xCenter = cam.pixelWidth/2;
			yCenter = cam.pixelHeight/2;
			//get slope of screen
			float sw = cam.pixelWidth;
			float sh = cam.pixelHeight;
			screenSlope = sh/sw;

			halfSize = size/2;
			//find all the objects with the tag
			GameObject[] objects = GameObject.FindGameObjectsWithTag(tagToFind);
			//loop through objects with the tag
			foreach(GameObject ob in objects) {
				//find out which arrow texture to use
				Texture arrow;
				if(GetComponent<GameManager>()){
					if(ob.transform.position.magnitude>200) arrow = arrowGreen;
					else if(ob.transform.position.magnitude>125) arrow = arrowYellow;
					else arrow = arrowRed;
				}else{
					arrow = arrowGreen;
				}


				float angle = hoverAngle-180;
				float rad = angle*(Mathf.PI/180.0f);
				Vector3 arrowPos = cam.transform.right*Mathf.Cos(rad)+cam.transform.up*Mathf.Sin(rad);
				Vector3 worldPos = ob.transform.position + (arrowPos * distanceAbove);
				Vector3 pos = cam.WorldToViewportPoint(worldPos);
				if(pos.z<0){
					pos.x*=-1;
					pos.y*=-1;
				}
				if(pos.z>0 || (pos.z<0 && (pos.x>.5+(blindSpot/2)||pos.x<.5-(blindSpot/2)) 
				               && (pos.y<.5-(blindSpot/2)||pos.y>.5+(blindSpot/2)))){
					//find the new position
					float newX = pos.x*cam.pixelWidth;
					//camera coordinates are reversed vertically compared to pixel coordinates
					float newY = cam.pixelHeight-pos.y*cam.pixelHeight; 
					//if the object is offscreen
					if(pos.z<0 || (newY<0 || newY>cam.pixelHeight || newX<0 || newX>cam.pixelWidth)){
						float a = CalculateAngle(cam.pixelWidth/2,cam.pixelHeight/2,newX,newY);
						Vector2 coord = ProjectToEdge(newX,newY);
						GUIUtility.RotateAroundPivot(a, coord);
						Graphics.DrawTexture(new Rect(coord.x-halfSize,coord.y-halfSize,size,size),arrow);
						GUIUtility.RotateAroundPivot(-a, coord);
					}else if(hoverOnScreen){
						float nh = Mathf.Sin(rad)*size;
						float nw = Mathf.Cos(rad)*size;
						//when on-screen, just rotate 90 degrees and draw
						GUIUtility.RotateAroundPivot(-angle+180, new Vector2(newX+nw, newY-nh));
						Graphics.DrawTexture(new Rect(newX+nw,newY-nh-halfSize,size,size),arrow,null);
						GUIUtility.RotateAroundPivot(angle-180, new Vector2(newX+nw, newY-nh));
					}
				}
			} 
		}
	}

	//calculates the angle to rotate the arrow
	float CalculateAngle(float x1,float y1, float x2, float y2) {
		float xDiff = x2-x1;
		float yDiff = y2-y1;
		float rad = Mathf.Atan(yDiff/xDiff);
		float deg = rad*180/Mathf.PI;
		if(xDiff<0) {
			deg+=180;
		}
		return deg;
	}

	//moves the arrow from the center to the edge of the screen
	Vector2 ProjectToEdge(float x2, float y2){
		float xDiff = x2-(cam.pixelWidth/2);
		float yDiff = y2-(cam.pixelHeight/2);
		float slope = yDiff/xDiff;
		Vector2 coord = new Vector2(0,0);
		float ratio;
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
}
