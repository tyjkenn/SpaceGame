using UnityEngine.Networking;

/// <summary>
/// Extends Unity's Network manager. This will have any events related to connecting or disconnecting clients.
/// </summary>
public class NetManager : NetworkManager {

    public EnemySpawn spawn;
    public FollowCamera cam;

    /// <summary>
    /// The only thing we need to do specific to the game is wait to spawn enemies until two clients are
    /// connected.
    /// </summary>
    public void Update()
    {
        if (numPlayers >= 2)
        {
            spawn.enabled = true;
        }
    }

}
