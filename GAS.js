function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById("YOUR_SHEET_ID").getSheetByName("Sheet1");

    const name = e.parameter.name;
    const phone = e.parameter.phone;
    const email = e.parameter.email;
    const college = e.parameter.college;

    const blob = e.parameter.screenshot;
    const file = DriveApp.createFile(blob);
    const fileUrl = file.getUrl();

    sheet.appendRow([name, phone, email, college, fileUrl, new Date()]);
    return ContentService.createTextOutput("Success");
  } catch (err) {
    return ContentService.createTextOutput("Error: " + err.message);
  }
}
