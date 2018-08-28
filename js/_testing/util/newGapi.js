import ReactGoogleSheetConnector from "react-google-sheet-connector"
import { connectToSpreadsheet } from "react-google-sheet-connector"

var SHEET_ID = null;
var API_KEY = 'AIzaSyBuiD7FAD9c7PAj0Np_ZwVsiHLbyTLKoBk';
var CLIENT_ID = '268531681980-bqf0gvhlgt0op2u526ts5ppvoov3hfk3.apps.googleusercontent.com';
var SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

export function initGapi(sheet) {
		SHEET_ID = sheet;
}

const MyComponent = (props) => {
	<ReactGoogleSheetConnector clientid={CLIENT_ID}
	    apiKey={API_KEY}
	    spreadsheetId={SHEET_ID}
	    spinner={ <div className="loading-spinner"/> } >
	    <div>
	      This content will be rendered once the data has been fetched from the spreadsheet.
	    </div>
	</ReactGoogleSheetConnector>

    return (
        <div>
            {
                props.getSheet("Sheet Name")
                    .map((row, i) =>
                        JSON.stringify(row)
                    )
            }        
        </div>
    )
}

export default connectToSpreadsheet(MyComponent) 