# Holmes-Gym-Scriptable-Widget
A script for the iOS Scriptabble app to see the relative occupancy of your local Holmes Place gym 🏋️‍♂️🏋️‍♀️💪

## How to use this

1. Install the Scriptable iOS app and your iDevice.
2. Add this script to your iCloud Drive Scriptable folder or to your local device Scriptable folder.
3. You should see the script entry "holmes" in the Scriptable app' "Scripts" list. Running it will show you the default gym.
4. Clicking on the 3 dots **(...)** over the script entry will show you the raw js script file. 
5. (Here you can also set the gymID manually, if you really want to, but you can set it easier later, in the **Widget setup**.)
6. Find your gymID on the Holmes api - you can search by the name, i.e. "Neue Welt" on the Holmes public API:
`https://de.memberjourneyhub.eu/holmesplace/api/memberzone/clubs`

The `id` value is the correct value, NOT the entry number.

### Example search

![image](https://user-images.githubusercontent.com/2085575/227191872-c8f25c2f-61d7-4109-be07-4d2712ac3b57.png)

`id` = `15` (<= this is your gymID for the script/widget)

### Widget setup

Adding a Widget to your Home screen
1. Long press on an empty spot on your Home screen.
2. Press the **+** in the top-left corner.
3. Look for Scriptable using the search box and select it.
4. Choose the size of the widget, then tap on "Add Widget".
5. Long press on the newly added widget as instructed.
6. Select "Edit Widget" from the popover menu.
7. Tap on the "Choose" from the Script row and select the "holmes" script.
8. Tap on the input from the "Parameter" row and enter your gymID as a number, i.e. `15` .
9. Tap on "Done" and then somewhere outside the Widget settings box - The widget should start running!

### Notes

You should be able to see at least the right name after the first run.

The Capacity API is quite unreliable, so don't worry if you see `0` a lot before the actual values are obtained.


Feel free to fork and improve this script or e-mail me with your suggestions to: `blizz@blizzd.com`.
