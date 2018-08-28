import factory from '../../assets/map/factory.jpg';
import customs from '../../assets/map/customs.jpg';
import resort from '../../assets/map/resort.png';
import shoreline from '../../assets/map/shoreline.png';
import woods from '../../assets/map/woods.jpg';
import interchange from '../../assets/map/interchange-temp.png';

export var mapArray = [{
"name":"factory",
"url":"https://s3.amazonaws.com/scavco/maps/factory.jpg",
"size":[2000,1500],
"extracts":[{
  "name":"Main Extract",
  "xy":[-33, 50],
  "key":''
},{
  "name":"Under Fork Lift Stairs",
  "xy":[-20, 208],
  "key":"Factory"
},{
  "name":"Locked Extract",
  "xy":[-253, 64],
  "key":"Factory"
}]
},{
"name":"customs",
"url":customs,
"size":[3000,1500],
"extracts": []
},{
"name":"woods",
"url":woods,
"size":[2000,1500],
"extracts": []
},{
"name":"shoreline",
"url":shoreline,
"size":[2000,1500],
"extracts":[{
  "name":"Tunnel Extract",
  "xy":[-90, 305],
  "key":''
},{
  "name":"Road to Customs",
  "xy":[-163, 68],
  "key":''
},{
  "name":"Rock Passage",
  "xy":[-246, 194],
  "key":'Temp'
}]
},{
"name":"resort",
"url":resort,
"size":[2000,1500],
"extracts": []
},{
"name":"interchange",
"url":'https://i.imgur.com/aUXxB3j.jpg',
"size":[2000,1500],
"extracts": []
}]

var newMapArray = [{
"name":"factory",
"url":"https://s3.amazonaws.com/scavco/maps/factory.jpg",
"size":[2000,1500],
"markers":{
	"name":"extracts",
	"pins":[{
		  "name":"Main Extract",
		  "xy":[-33, 50],
		  "key":''
		},{
		  "name":"Under Fork Lift Stairs",
		  "xy":[-20, 208],
		  "key":"Factory"
		},{
		  "name":"Locked Extract",
		  "xy":[-253, 64],
		  "key":"Factory"
		}]
}
}]