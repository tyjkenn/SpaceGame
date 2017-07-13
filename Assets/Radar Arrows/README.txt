**Radar Arrows**

In order to use Radar Arrows, attach the RadarArrows script to the camera. 
Then attach a texture to use as your arrow. An arrow texture is included in 
the Textures folder.

This is what the variables mean:

Size
	Width (and height) of the arrow texture. The width and height should be the same,
	so enter just one length. The width/length of the included arrow is 30.
	
Tag To Find
	Arrows will appear for each object with this tag. For example, if the Tag to Find
	is "Enemy", all objects with the "Enemy" tag will have arrows.
	
Hover On Screen
	If true, an arrow will appear above the object when it in on-screen. If false, arrows
	will only appear around the edge of the screen, pointing to objects off-screen.
	
Distance Above
	If "Hover On Screen" is checked, the arrows will hover this distance above the object.
	
Blind Spot
	Arrows usually jump around rapidly when the object is directly behind the camera. (A fraction
	of a degree could move it from the left side to the right.) It is usually better to leave a
	blind spot, where arrows vanish completely. The blind spot variable is a percentage of the
	camera dimensions. For example, if Blind Spot is 0.33, the arrow will disappear if it would
	be in the center third of the camera if the camera were rotated around 180 degrees.
	
Hover Angle
	The angle at which all arrows for on-screen objects should point. A 270 degree angle will
	result in  an arrow appearing above, pointing down.