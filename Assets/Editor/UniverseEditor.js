@CustomEditor (Universe)
class UniverseEditor extends Editor {

    function OnInspectorGUI () {
        
        target.showHandles = EditorGUILayout.Toggle("Show Closest Spawns",target.showHandles);
        
        //Possible Object Definition
        GUILayout.BeginHorizontal();
        
        GUILayout.Label("Object");
        GUILayout.Label("Name");
        GUILayout.Label("Chance");
        GUILayout.EndHorizontal();
        for(var i = 0; i < target.objectTypes.Length; i++){
        	GUILayout.BeginHorizontal();
        	target.objectTypes[i].transform = EditorGUILayout.ObjectField(target.objectTypes[i].transform, Transform, true);
        	target.objectTypes[i].name = EditorGUILayout.TextField(target.objectTypes[i].name);
        	target.objectTypes[i].chance = EditorGUILayout.FloatField(target.objectTypes[i].chance);
        	if(GUILayout.Button("X")){
        		var tempAr = new Array(target.objectTypes);
	        	tempAr.RemoveAt(i);
	        	target.objectTypes = tempAr.ToBuiltin(ObjectType);
        	}
        	GUILayout.EndHorizontal();
        }
        if(GUILayout.Button("New Type")){
        	var tempArr = new Array(target.objectTypes);
        	tempArr.Add(new ObjectType());
        	target.objectTypes = tempArr.ToBuiltin(ObjectType);
        }
        
        //general controls
        GUILayout.Space(10);
        target.spawnDistance = EditorGUILayout.Vector3Field("Spawn Distance",target.spawnDistance);
        target.gridSize = EditorGUILayout.Vector3Field("Grid Size",target.gridSize);
        target.originOffset = EditorGUILayout.Vector3Field("Origin Offset",target.originOffset);
        target.maxOffset = EditorGUILayout.Vector3Field("Max Offset",target.maxOffset);
        target.generateInitially = EditorGUILayout.Toggle("Generate Initially",target.generateInitially);
        
        
        //limits and bounds
        GUILayout.Space(10);
        GUILayout.Label("Endless along...");
        GUILayout.BeginHorizontal();
        	GUILayout.Label("X");
        	target.endlessAlongX = EditorGUILayout.Toggle(target.endlessAlongX);
        	GUILayout.Label("Y");
        	target.endlessAlongY = EditorGUILayout.Toggle(target.endlessAlongY);
        	GUILayout.Label("Z");
        	target.endlessAlongZ = EditorGUILayout.Toggle(target.endlessAlongZ);
        GUILayout.EndHorizontal();
        GUILayout.Label("Maximums");
        GUILayout.BeginHorizontal();
        	GUILayout.Label("X");
        	target.useMaxX = EditorGUILayout.Toggle(target.useMaxX);
        	if(!target.useMaxX) GUI.enabled = false;
        	target.maxX = EditorGUILayout.FloatField(target.maxX);
        	GUI.enabled = true;
        	GUILayout.Label("Y");
        	target.useMaxY = EditorGUILayout.Toggle(target.useMaxY);
        	if(!target.useMaxY) GUI.enabled = false;
        	target.maxY = EditorGUILayout.FloatField(target.maxY);
        	GUI.enabled = true;
        	GUILayout.Label("Z");
        	target.useMaxZ = EditorGUILayout.Toggle(target.useMaxZ);
        	if(!target.useMaxZ) GUI.enabled = false;
        	target.maxZ = EditorGUILayout.FloatField(target.maxZ);
        	GUI.enabled = true;
        GUILayout.EndHorizontal();
        GUILayout.Label("Minimums");
        GUILayout.BeginHorizontal();
        	GUILayout.Label("X");
        	target.useMinX = EditorGUILayout.Toggle(target.useMinX);
        	if(!target.useMinX) GUI.enabled = false;
        	target.minX = EditorGUILayout.FloatField(target.minX);
        	GUI.enabled = true;
        	GUILayout.Label("Y");
        	target.useMinY = EditorGUILayout.Toggle(target.useMinY);
        	if(!target.useMinY) GUI.enabled = false;
        	target.minY = EditorGUILayout.FloatField(target.minY);
        	GUI.enabled = true;
        	GUILayout.Label("Z");
        	target.useMinZ = EditorGUILayout.Toggle(target.useMinZ);
        	if(!target.useMinZ) GUI.enabled = false;
        	target.minZ = EditorGUILayout.FloatField(target.minZ);
        	GUI.enabled = true;
        GUILayout.EndHorizontal();
        
        
        if (GUI.changed)
            EditorUtility.SetDirty (target);
    }
    
    function OnSceneGUI () {
    	target.UpdateOrigin();
    	if(target.showHandles){
	    	Handles.color = PickColor();
	    	for(var x = 0; x < target.gridSize.x; x++){
	    		for(var y = 0; y < target.gridSize.y; y++) {
	    	 		for(var z = 0; z < target.gridSize.z; z++) {
	    	 			var pos = target.GridToWorld(x,y,z);
	    	 			if(target.InBounds(pos)){
		    	 			Handles.SphereCap(0,pos,Quaternion.identity,.5);
						}
	    	 		}
	    	 	}
	    	}
		}
    }
    
    function PickColor() {
    	var universes = target.GetComponents(Universe);
    	var i;
    	for(i = 0; i < universes.Length; i++) {
    		if(universes[i]==target) {
    			break;
    		}
    	}
    	if(i==0) return Color.red;
    	if(i==1) return Color.green;
    	if(i==2) return Color.blue;
    	if(i==3) return Color.grey;
    	if(i==4) return Color.cyan;
    	if(i==5) return Color.yellow;
    	if(i==6) return Color.magenta;
    	return Color.black;
    }
}