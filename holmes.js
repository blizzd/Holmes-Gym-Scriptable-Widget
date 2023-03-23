// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: magic;
let gymID = 15 //15 - neue welt
let param = args.widgetParameter;
if (param != null && param.length > 0) {
	gymID = param;
}

const gymName = await fetchGymInfo(gymID);
const externalGymID = await fetchExternalGymID(gymID);
const regionID = await fetchRegionID(gymID);
const currentGymCapacity = await fetchGymCapacity(externalGymID, regionID);

async function createWidget() {
  // Create new empty ListWidget instance
  let listwidget = new ListWidget();
  
    // Set new background color
  listwidget.backgroundColor = new Color("#000000");

  // Add widget heading
  let heading = listwidget.addText("Holmes 🏋️");
  heading.font = Font.lightSystemFont(20);
  heading.textColor = new Color("#b3a26c");

  // Spacer between header and capacity
  listwidget.addSpacer(30);
  
  // Add capacity text
  const capacityText = listwidget.addText(currentGymCapacity.toString());
  capacityText.font = Font.lightSystemFont(70);
  capacityText.centerAlignText();

	if (currentGymCapacity < 39) { // apiResult.capacitySettings.lowerRange
		capacityText.textColor = new Color("#33cc33");
	} else if (currentGymCapacity < 77) { // apiResult.capacitySettings.higherRange
		capacityText.textColor = new Color("#ff9900");
	} else {
		capacityText.textColor = new Color("#ff3300");
	}

	listwidget.addSpacer(1)
	
	// Add name text
	
  const gymNameText = listwidget.addText(gymName.toString());
  gymNameText.font = Font.lightSystemFont(12);
  gymNameText.leftAlignText();
  gymNameText.textColor = new Color("#ffffff");

  // Return the created widget
  return listwidget;
}

let widget = await createWidget();

// Check where the script is running
if (config.runsInWidget) {
  // Runs inside a widget so add it to the homescreen widget
  Script.setWidget(widget);
} else {
  // Show the medium widget inside the app
  widget.presentMedium();
}
Script.complete();


// Fetches the current capacity of the Holmes Place gym

async function fetchGymCapacity(eGym, region) {
const url = 'https://de.memberjourneyhub.eu/holmesplace/api/admin/capacity/check?clubExternalIds[]=' + eGym + '&regionId=' + region;
    const req = new Request(url);
    const result = await req.loadJSON();
    var counter = 0;
	for (var i in result) {
		if (i == eGym) {  
			counter = result[i].currentlyCheckedInCount;
			break;
			// .numberOfAvailableSpots
        }
    }
    return counter;
}

// Fetches the name of the Holmes Place gym

async function fetchGymInfo(gym) {
    const url = 'https://de.memberjourneyhub.eu/holmesplace/api/memberzone/clubs';
    const req = new Request(url);
    const apiResult = await req.loadJSON();
	var name = 'Your Holmes Place';
    for (var i in apiResult){
        if (apiResult[i].id == gym) {
            name = apiResult[i].name;
			break;
        }
    }
    return name;
}

// Fetches the externalID of the Holmes Place gym for the capacity API

async function fetchExternalGymID(gym) {
    const url = 'https://de.memberjourneyhub.eu/holmesplace/api/memberzone/clubs';
    const req = new Request(url);
    const apiResult = await req.loadJSON();
	var externalID = 0;
    for (var i in apiResult){
        if (apiResult[i].id == gym) {
            externalID = apiResult[i].externalId;
			break;
        }
    }
    return externalID;
}

// Fetches the regionID of the Holmes Place gym for the capacity API

async function fetchRegionID(gym) {
    const url = 'https://de.memberjourneyhub.eu/holmesplace/api/memberzone/clubs';
    const req = new Request(url);
    const apiResult = await req.loadJSON();
	var regionID = 0;
    for (var i in apiResult){
        if (apiResult[i].id == gym) {
            regionID = apiResult[i].regionId;
			break;
        }
    }
    return regionID;
}
