Endless Universe is tool for spawning GameObjects around an object.

How to use:
	1. Drag the EndlessUniverse>Universe.js script to the object you would like 
	  to spawn your objects around. This is usually the camera or player. 
	2. Several spheres should appear arround the object with the script when it is 
	  selected. These are spawns. Adjust settings for Spawn Distance, Grid Size 
	  and Origin Offset to get the spawns where you want.
	3. Press the "New Type" button to define a new object type that could possibly
	  spawn. Drag the prefab or other object you want to spawn, and the chance
	  of it spawning at a certain spawn. The name is optional, but can be used for
	  code reference.
	4. Repeat for every object type you want. The chances must add up to one or less.
	  If they add up to less than one, there is a chance that no object will spawn.
	5. Set bounds and constraints. Maybe you want objects to only appear above ground.
	  Maybe you want to only spawn new objects when moving along X and Z. These
	  settings are controlled through Endless Along..., Maximums, and Minimums.

NOTE: You can attach the Universe script multiple times to create two spawning grids.
This is useful if, for example, you want an endless floor to always appear at a certain
Y, but also want obstacles to appear at any height above the ground.

Settings:

**Show Closest Spawns** - This is just for the Editor. If selected, it will mark the
  closest spawns to the host object.
**Spawn Distance** - Distance between spawning points.
**Grid Size** - Size of the spawning grid. A larger grid will spawn more objects at screen
  at one time, but will run a higher risk of performance issues.
**Origin Offset** - The spawning grid will by default be centered around the object to which
  the script is attached. If you would rather have off-centered, this is where you chance it.
**Max Offset** - amount of randomness applied to spawning. If the Max X offset is set to 1,
  the object could appear up to 1 unit away from the spawn.
**Generate Initially** - whether objects should spawn immediately. Otherwise, objects will only
  spawn after the host object begins to move.
**Endless Along...** - the axes along which objects should spawn endlessly. If only X and Z are
  checked, for example, movement along X and Z will spawn new objects while the Universe is
  completely unchanged by movement along Y.
**Maximums** - upper boundaries for spawning objects. If the host object moves close to these 
  boundaries, objects will stop spawning.
**Minimums** - lower boundaries for spawning objects. If the host object moves close to these
  boundaries, objects will stop spawning.
  
Another Note: ExampleScene1 relies on the Character Controller Standard Assets package.