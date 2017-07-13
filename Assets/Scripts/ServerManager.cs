using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

/// <summary>
/// I was having a problem of the planet health getting out of sync, so I made it so changes
/// in health get syncronized by first telling the server to subtract health. Then the server
/// tells each client to subtract health. This way, when one client destroys an alien that
/// reaches Earth, and that destruction reaches all clients, the clients can still can the
/// change in health that goes with it.
/// </summary>
public class ServerManager : NetworkBehaviour {

    [Command]
    public void CmdSubtractHealth()
    {
        RpcSubtractHealth();
    }

	[ClientRpc]
    public void RpcSubtractHealth()
    {
        FindObjectOfType<GameManager>().planetHealth--;
    }
}
