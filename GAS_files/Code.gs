const GITHUB_PAGES_URL = "https://242pc.github.io/barcode_qr_reader/";
const SPREADSHEET_ID = "1H8y17GJMij3Y4lrYiDZFNFm2G8bUq_oarVkhAA90TLk";

function doGet() {
  const template = HtmlService.createTemplateFromFile('Index');
  template.gasUrl = ScriptApp.getService().getUrl();
  template.githubUrl = GITHUB_PAGES_URL;
  return template.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function saveData(barcodeValue) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("result");
  const bValues = sheet.getRange("B:B").getValues();
  let lastRowB = 0;
  
  for (let i = bValues.length - 1; i >= 0; i--) {
    if (bValues[i][0] !== "") { lastRowB = i + 1; break; }
  }
  
  const targetRow = Math.max(2, lastRowB + 1);
  sheet.getRange(targetRow, 2).setValue(barcodeValue);
}


function test() { saveData("TEST"); }
