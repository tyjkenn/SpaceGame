======Space Game======

I really need to come up with a real title for this game, but essentially, the
object of the game is to defend earth from attacking aliens. You fly a ship
around with a friend and try to zap aliens before they reach Earth.

======Compiling Instructions======

So, the game file is actually quite large, so I only included in this directory
this readme and some of the most notable code files, the ones I actually made
significant changes to for this project. The rest of the project, including the
artwork and other Unity files, can be found at my github account. To actually
compile the game would require a copy of Unity3D, so I also included a Windows
executable that I already built based on the code as it was on July 12, 2017. If
You do want to build the project yourself, you will need to do the following:

  1. Download Unity from http://unity3d.com.
  2. Clone the repository.
  3. Open the project in Unity. Unity will then generate some files that are used
     by the Unity Editor but that were not in the repository.
  4. Go to Project -> Build Settings. Selected Windows Standalone and choose the
     Build option. It will prompt you for path for the windows executable and
     build in that location.

======Current state of the project======
Unfortunately, I did not have time to work out all of the bugs in the game. Also,
adding the networking introduced some bugs in other parts of the game that I still
have not fixed. The only game mode that works is Earth Defense. Start a game by
choosing the LAN Host(H) option on the right. Others clients can then join the
game by entering the server's IP address in the box and then choosing the LAN
Client(C) option. It currently tries to run on port 7777.
