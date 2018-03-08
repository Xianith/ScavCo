import React, { Component } from 'react';

var API_KEY = 'AIzaSyBuiD7FAD9c7PAj0Np_ZwVsiHLbyTLKoBk';
var CLIENT_ID = '268531681980-bqf0gvhlgt0op2u526ts5ppvoov3hfk3.apps.googleusercontent.com';
var SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

export function initGapi(sheet, range, callback) {
	var scripts = document.getElementsByTagName('script');
	var source = "js/util/google-api.js";

	var params = {
	    spreadsheetId: sheet,
	    range: range,
	    valueRenderOption: 'FORMATTED_VALUE',
	    dateTimeRenderOption: 'SERIAL_NUMBER',
	};

	for (var s = 0; s < scripts.length; s++) {
		if(scripts[s].src == "http://scav.co/"+source) {
			var request = gapi.client.sheets.spreadsheets.values.get(params);
			request.execute((resp) => {
				callback(resp);
			});
			break;
		}
	}
	const script = document.createElement("script");
	script.src = source;

	script.onload = () => {
	    gapi.load('client', () => {
	        gapi.client.init({
	          'apiKey': API_KEY,
	          'clientId': CLIENT_ID,
	          'scope': SCOPE,
	          'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
	        }).then(function() {
		        var request = gapi.client.sheets.spreadsheets.values.get(params);
		        request.execute((resp) => {
		        	callback(resp);
		        });
	        });
	    });
	}
	script.onreadystatechange = () => {
	  if (this.readyState === 'complete') this.onload();
	}

	document.body.appendChild(script);
}
// export default class initGapi extends Component {

//   loadGapi() {
// 	const script = document.createElement("script");
// 	script.src = "js/util/google-api.js";

// 	script.onload = () => {
// 	    gapi.load('client', () => {
// 	        gapi.client.init({
// 	          'apiKey': API_KEY,
// 	          'clientId': CLIENT_ID,
// 	          'scope': SCOPE,
// 	          'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
// 	        }).then(function() {
// 		        // gapi.auth2.getAuthInstance().isSignedIn;
// 		        var params = {
// 		            spreadsheetId: sheet,
// 		            range: range,
// 		            valueRenderOption: 'FORMATTED_VALUE',
// 		            dateTimeRenderOption: 'SERIAL_NUMBER',
// 		        };
// 		        gapi.client.sheets.spreadsheets.values.get(params).then(function(response) {
// 		           var range = response.result;
// 		            if (range.values.length > 0) {
// 		              console.log(range)
// 		              return;
// 		            } else {
// 		              console.error('No data found.');
// 		            }
// 	          	}, function(reason) {
// 	            	console.error('error: ' + reason.result.error.message);
// 	          	});
// 	        });
// 	        gapi.client.load('sheets', 'v4', () => {
//               this.setState({ gapiReady: true });
//             });
// 	    });
// 	}
// 	// script.onreadystatechange = () => {
// 	//   if (this.readyState === 'complete') this.onload();
// 	// }

// 	document.body.appendChild(script);
//   }

//   componentDidMount() {
//     this.loadGapi();
//   }

//   render() {
//     if (this.state.gapiReady) {
//      return (
//        <h1>GAPI is loaded and ready to use.</h1>
//      );
//   };
// }
// }