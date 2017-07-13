var enemy : Transform;

function Update () {
	transform.Translate(Vector3.up*((Input.GetKey(KeyCode.W)?1:0)-(Input.GetKey(KeyCode.S)?1:0))/2);
	transform.Translate(Vector3.right*((Input.GetKey(KeyCode.D)?1:0)-(Input.GetKey(KeyCode.A)?1:0))/2);
	transform.Translate(Vector3.forward*((Input.GetKey(KeyCode.Space)?1:0)-(Input.GetKey(KeyCode.LeftAlt)?1:0))/2);
	transform.Rotate(Vector3.up*((Input.GetKey(KeyCode.RightArrow)?1:0)-(Input.GetKey(KeyCode.LeftArrow)?1:0)));
	transform.Rotate(Vector3.right*((Input.GetKey(KeyCode.DownArrow)?1:0)-(Input.GetKey(KeyCode.UpArrow)?1:0)));
}

function OnGUI(){
	var scr = gameObject.GetComponent(RadarArrows);
	if(GUILayout.Button("Spawn Enemy")){
		var theEnemy : Transform;
		theEnemy = Instantiate(enemy,
            Vector3(Random.Range(-100,40),Random.Range(-100,100),Random.Range(-100,100)), Quaternion.identity);
	}
	GUILayout.Label("Blind Spot");
	GUILayout.BeginHorizontal();
		if(GUILayout.Button("-")) scr.blindSpot -= .1;
		GUILayout.Label(scr.blindSpot.ToString());
		if(GUILayout.Button("+")) scr.blindSpot += .1;
		scr.blindSpot = Mathf.Round(scr.blindSpot * 10) / 10;
	GUILayout.EndHorizontal();
	
	GUILayout.Label("Distance Above");
	GUILayout.BeginHorizontal();
		if(GUILayout.Button("-")) scr.distanceAbove -= .1;
		GUILayout.Label(scr.distanceAbove.ToString());
		if(GUILayout.Button("+")) scr.distanceAbove += .1;
		scr.distanceAbove = Mathf.Round(scr.distanceAbove * 10) / 10;
	GUILayout.EndHorizontal();
	
	GUILayout.Label("Size");
	GUILayout.BeginHorizontal();
		if(GUILayout.Button("-")) scr.size -= 2;
		GUILayout.Label(scr.size.ToString());
		if(GUILayout.Button("+")) scr.size += 2;
	GUILayout.EndHorizontal();
	
	scr.hoverOnScreen = GUILayout.Toggle(scr.hoverOnScreen,"Hover on-screen");
	GUILayout.Label("Hover Angle");
	scr.hoverAngle = GUILayout.HorizontalSlider(scr.hoverAngle,0,360);
}