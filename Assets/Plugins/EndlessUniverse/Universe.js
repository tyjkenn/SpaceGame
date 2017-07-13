#pragma strict
var objectTypes : ObjectType[] = new ObjectType[0];
var spawnDistance : Vector3 = Vector3.one*5;
var gridSize : Vector3 = Vector3(6,6,6);
var originOffset : Vector3 = Vector3.zero;

var generateInitially : boolean = true;
public var maxOffset : Vector3;

var useMaxX : boolean;
var maxX : float;
var useMinX : boolean;
var minX : float;

var useMaxY : boolean;
var maxY : float;
var useMinY : boolean;
var minY : float;

var useMaxZ : boolean;
var maxZ : float;
var useMinZ : boolean;
var minZ : float;

var endlessAlongX : boolean = true;
var endlessAlongY : boolean = true;
var endlessAlongZ : boolean = true;

var showHandles : boolean = true;

private var grid : Transform[,,];
var gridPos : Vector3 = Vector3.zero;

//starting position
private var origin : Vector3;
//position of last generation
private var lastCheckpoint : Vector3;
private var offset : Vector3;

private var errorless = true;

/**makes an initial generation and sets up origin
 */
function Start () {
	UpdateOrigin();
	lastCheckpoint = transform.position;
	CheckErrors();
	if(errorless) Initialize();
}

//Gets an object type
function GetObjectType(name : String){
	for(ob in objectTypes){
		if(ob.name == name) return ob;
	}
	return null;
}

//create a new grid, empty or filled depending on generateInitially
function Initialize(){
	grid = new Transform[gridSize.x,gridSize.y,gridSize.z];
	if(generateInitially){
		for(var x : int = 0; x<gridSize.x;x++){
			for(var y : int = 0; y<gridSize.y;y++){
				for(var z : int = 0; z<gridSize.z;z++){
					TryBuilding(x,y,z);
				}
			}
		}
	}
}

//Choose an object based on set probabilities
function ChooseObject(){
	var rand = Random.Range(0.0,1.0);
	for(var i = 0; i < objectTypes.Length; i++){
		var sum : float = 0;
		for(var j = i; j >= 0; j--){
			sum += objectTypes[j].chance;
		}
		if(sum>rand) return objectTypes[i];
	}
	return null;
}

function  Update() {
	if(errorless){
		if(endlessAlongX){
			if(transform.position.x >= lastCheckpoint.x+spawnDistance.x){
				lastCheckpoint.x += spawnDistance.x;
				gridPos.x++;
				ShiftRight();
			}
			if(transform.position.x <= lastCheckpoint.x-spawnDistance.x){
				lastCheckpoint.x -= spawnDistance.x;
				gridPos.x--;
				ShiftLeft();
			}
		}
		if(endlessAlongZ){
			if(transform.position.z >= lastCheckpoint.z+spawnDistance.z){
				lastCheckpoint.z += spawnDistance.z;
				gridPos.z++;
				ShiftForward();
			}
			if(transform.position.z <= lastCheckpoint.z-spawnDistance.z){
				lastCheckpoint.z -= spawnDistance.z;
				gridPos.z--;
				ShiftBack();
			}
		}
		if(endlessAlongY){
			if(transform.position.y >= lastCheckpoint.y+spawnDistance.y){
				lastCheckpoint.y += spawnDistance.y;
				gridPos.y++;
				ShiftUp();
			}
			if(transform.position.y <= lastCheckpoint.y-spawnDistance.y){
				lastCheckpoint.y -= spawnDistance.y;
				gridPos.y--;
				ShiftDown();
			}
		}
	}
}

//converts a grid point to a world position
function GridToWorld(x:int,y:int,z:int, offset : Vector3){
	return origin + Vector3((x+gridPos.x)*spawnDistance.x+offset.x,(y+gridPos.y)*spawnDistance.y+offset.y,(z+gridPos.z)*spawnDistance.z+offset.z);
}
//overload with no offset
function GridToWorld(x:int,y:int,z:int){
	return GridToWorld(x,y,z, Vector3.zero);
}

//check whether a certain point is in the boundaries of the Universe generator
function InBounds(pos : Vector3){
	return (!useMinX || pos.x>=minX) && (!useMaxX || pos.x<=maxX) && (!useMinY || pos.y>=minY) && (!useMaxY || pos.y<=maxY) &&
				(!useMinZ || pos.z>=minZ) && (!useMaxZ || pos.z<=maxZ);
}

//sets the origin according to player position. Used by editor. Not recommended for extension
function UpdateOrigin(){
	origin = transform.position-Vector3((gridSize.x-1)*spawnDistance.x/2,(gridSize.y-1)*spawnDistance.y/2,(gridSize.z-1)*spawnDistance.z/2) + originOffset;
}


/**Builds the object if odds are in favor
 */
function TryBuilding(x : int, y : int, z : int){
	var theOb = ChooseObject();
	if(theOb!=null){
		var off : Vector3 = Vector3(Random.Range(-maxOffset.x,maxOffset.x),
				Random.Range(-maxOffset.y,maxOffset.y),Random.Range(-maxOffset.z,maxOffset.z));
		
		var pos = GridToWorld(x,y,z,off);
		//conditions of bounds
		if(InBounds(pos)){
			grid[x,y,z] = Instantiate(theOb.transform,pos,Quaternion.identity);
		}
	}
}

//extra errors and warnings
private function CheckErrors(){
	var sum = 0;
	for(ob in objectTypes) {
		sum += ob.chance;
		if(ob.transform==null) {
			errorless = false;
			Debug.Log("Be sure to assign your object types.");
		}
	}
	if(sum > 1) {
		errorless = false;
		Debug.Log("Sum of the spawn chances should be <= 1 to work properly");
	}
}


/********Shifting functions; manipulate grid array for when the player moves and draws the objects******/
private function ShiftRight(){
	for(var x : int = 0; x<gridSize.x;x++){
		for(var y : int = 0; y<gridSize.y;y++){
			for(var z : int = 0; z<gridSize.z;z++){
				if(x<gridSize.x-1){
					if(x==0 && grid[x,y,z]!=null) Destroy(grid[x,y,z].gameObject);
					grid[x,y,z] = grid[x+1,y,z];
				} else TryBuilding(x,y,z);
			}
		}
	}
}

private function ShiftLeft(){
	for(var x : int = gridSize.x-1; x>=0;x--){
		for(var y : int = 0; y<gridSize.y;y++){
			for(var z : int = 0; z<gridSize.z;z++){
				if(x>0){
					if(x==gridSize.x-1 && grid[x,y,z]!=null) Destroy(grid[x,y,z].gameObject);
					grid[x,y,z] = grid[x-1,y,z];
				} else TryBuilding(x,y,z);
			}
		}
	}
}

private function ShiftForward(){
	for(var x : int = 0; x<gridSize.x;x++){
		for(var y : int = 0; y<gridSize.y;y++){
			for(var z : int = 0; z<gridSize.z;z++){
				if(z<gridSize.z-1){
					if(z==0 && grid[x,y,z]!=null) Destroy(grid[x,y,z].gameObject);
					grid[x,y,z] = grid[x,y,z+1];
				} else TryBuilding(x,y,z);
			}
		}
	}
}

private function ShiftBack(){
	for(var x : int = 0; x<gridSize.x;x++){
		for(var y : int = 0; y<gridSize.y;y++){
			for(var z : int = gridSize.z-1; z>=0;z--){
				if(z>0){
					if(z==gridSize.z-1 && grid[x,y,z]!=null) Destroy(grid[x,y,z].gameObject);
					grid[x,y,z] = grid[x,y,z-1];
				} else TryBuilding(x,y,z);
			}
		}
	}
}

private function ShiftUp(){
	for(var x : int = 0; x<gridSize.x;x++){
		for(var y : int = 0; y<gridSize.y;y++){
			for(var z : int = 0; z<gridSize.z;z++){
				if(y<gridSize.y-1){
					if(y==0 && grid[x,y,z]!=null) Destroy(grid[x,y,z].gameObject);
					grid[x,y,z] = grid[x,y+1,z];
				} else TryBuilding(x,y,z);
			}
		}
	}
}

private function ShiftDown(){
	for(var x : int = 0; x<gridSize.x;x++){
		for(var y : int = gridSize.y-1; y>=0;y--){
			for(var z : int = 0; z<gridSize.z;z++){
				if(y>0){
					if(y==gridSize.y-1 && grid[x,y,z]!=null) Destroy(grid[x,y,z].gameObject);
					grid[x,y,z] = grid[x,y-1,z];
				} else TryBuilding(x,y,z);
			}
		}
	}
}

class ObjectType {
	var name : String;
	var transform : Transform;
	var chance : float;
}