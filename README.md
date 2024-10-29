# Helpscout Modal Extension
This extension for Chrome and Firefox browsers adds support for opening file attachments in a modal.
This extension has been tested for multiple Chrome-based browsers (i.e. Chrome, Arc, Brave) but not for Firefox.
**Use at your own risk**

Installation Instructions (Chrome Based Browsers):

Step 1: Download and Prepare Extension Files

	1.Make sure the following files are in the extension folder:
		•manifest.json
		•background.js
		•content.js
		•Optional icons (e.g., icon16.png, icon48.png, icon128.png)

Step 2: Install the Extension in Chrome

	1.Open Chrome and go to chrome://extensions/.
	2.Enable Developer Mode: Turn on “Developer mode” by toggling the switch in the top-right corner.
	3.Load Unpacked Extension:
		•Click “Load unpacked” and select the extension folder containing the files.
	4.Verify Installation:
		•You should now see the extension in the list on chrome://extensions/.
		•Ensure that the permissions (notifications, tab access) are allowed.

Step 3: How to Use the Extension

	1.Open a Web Page with .txt File Links:
		•Go to a website that has links to .txt files (for example, a HelpScout ticket).
	2.Click the .txt File Link:
		•When you click a link to a .txt file, the extension will fetch the content and display it in a modal window on the page.
	3.Close the Modal:
		•Use the “Close” button in the modal to close the content and return to the page.


Additional Notes

	•File Access: This extension intercepts .txt file links and fetches them to display in a modal on the same page. It does not open new tabs or initiate file downloads.
	•Compatibility: This extension was tested on Chrome and Arc browsers but may work in other Chromium-based browsers.
