var gameName = "GDCORE_Gravity_Battle";

private var btnX:float;
private var btnY:float;
private var btnW:float;
private var btnH:float;
private var refreshing:boolean;
//private var hostData:HostData;
MasterServer.ipAddress = "10.2.100.19";
MasterServer.port = 23466;
Network.natFacilitatorIP = "10.2.100.19";
Network.natFacilitatorPort = 23466;



function Start(){
	btnX = Screen.width *.05;
	btnY = Screen.width *.05;
	btnW = Screen.width *.1;
	btnH = Screen.width *.1;
}

function Update() {
	if(refreshing){
		if(MasterServer.PollHostList().Length>0) {
			refreshing = false;
			Debug.Log(MasterServer.PollHostList().Length);
			//hostData = MasterServer.PollHostList();
		}
	}
}

function StartServer(){
	Network.InitializeServer(32,25001,!Network.HavePublicAddress());
}

function OnServerInitialized() {
	Debug.Log("Server Initialized");
	//MasterServer.RegisterHost(gameName, "Gravity Battle", "Knock the other players into asteroids.");
}
function refreshHostList(){
	MasterServer.RequestHostList(gameName);
	refreshing = true;
	
}

function OnMasterServerEvent(mse:MasterServerEvent){
	switch(mse){
		case MasterServerEvent.RegistrationSucceeded:
			Debug.Log("Registered in Master Server");
			break;
		case MasterServerEvent.RegistrationFailedGameName:
			Debug.Log("Failed Game Name");
			break;
		case MasterServerEvent.RegistrationFailedNoServer:
			Debug.Log("No server is running.");
			break;
		case MasterServerEvent.HostListReceived:
			Debug.Log("Host list received");
			break;
	}
}

function OnGUI () {
	if(GUI.Button(Rect(btnX,btnY,btnW,btnH),"Start Server")){
		Debug.Log("Starting Server");
		StartServer();
	}
	if(GUI.Button(Rect(btnX,btnY+5+btnH,btnW,btnH),"Refresh Hosts")){
		Debug.Log("Refreshing");
		refreshHostList();
	}
	
	/*for(var i:int = 0; i <hostData.length; i++){
		GUI.Button(Rect(btnX*1.5,btnY*1.2*(btnH*i),btnW*3,btnH*.5), hostData[i].gameName);
	}*/
}