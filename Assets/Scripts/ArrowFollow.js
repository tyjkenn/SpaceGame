var arrow : Texture;
var cam : Camera;
var dim : int = 30;
private var yOffset : float;

function OnGUI() {
	yOffset = 2*(0.5-cam.rect.y)*cam.pixelHeight;
	var objects = GameObject.FindGameObjectsWithTag("Ship");
	for(var ob : GameObject in objects) {
		var pos = cam.WorldToViewportPoint(ob.transform.position);
		if(pos.z>0){
			var newX = pos.x*cam.pixelWidth +(dim/2);
			var newY = cam.pixelHeight-pos.y*cam.pixelHeight-(dim/2)-30+yOffset;
			if(newY<(yOffset+cam.pixelHeight) && newY >yOffset){
				GUIUtility.RotateAroundPivot(90, Vector2(newX, newY));
				Graphics.DrawTexture(Rect(newX,newY,dim,dim),arrow,null);
				GUIUtility.RotateAroundPivot(-90, Vector2(newX, newY));
			}
		}
	} 
}