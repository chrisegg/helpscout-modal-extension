# Helpscout Modal Extension
This extension for Chrome and Firefox browsers adds support for opening file attachments in a modal.
This extension has been tested for multiple Chrome-based browsers (i.e. Chrome, Arc, Brave) and Firefox. **Use at your own risk**

### Installing Extension in Chrome-Based Browsers

1. **Download the Extension Files**  
   Make sure all necessary files (e.g., `manifest.json`, `content.js`, `background.js`) are downloaded and accessible on your computer.

2. **Open Chrome Extensions Page**  
   Go to `chrome://extensions/` in Chrome.

3. **Enable Developer Mode**  
   At the top right, turn on **Developer mode**.

4. **Load Unpacked**  
   Click on **Load unpacked** in the top left.

5. **Select the Extension Folder**  
   Browse and select the folder containing the extension files, then click **Select Folder**.

6. **Verify the Installation**  
   After loading, you should see your extension listed on the **Extensions** page. Ensure that it’s enabled.

Your extension should now be installed and running in Chrome.

---

### To install an .xpi file in Firefox, you can follow these steps:

1. **Download or Locate the `.xpi` File**:
   - Make sure you have the `.xpi` file for your extension saved on your computer.

2. **Open Firefox**:
   - Launch the Firefox browser.

3. **Install the Extension Using the Add-ons Manager**:
   - In Firefox, go to the menu by clicking the three horizontal lines at the top-right corner of the browser.
   - Select **Add-ons and Themes** (or you can go directly to `about:addons` by typing it into the address bar and pressing Enter).
   - In the Add-ons Manager, click on the gear icon ⚙ at the top of the page.

4. **Select "Install Add-on from File"**:
   - In the dropdown menu that appears, choose **Install Add-on from File**.
   - Navigate to the `.xpi` file on your computer, select it, and click **Open**.

5. **Grant Permissions (if prompted)**:
   - Firefox will ask if you want to install the extension and show the permissions it requires. Review the permissions, and click **Add** to install the extension.

6. **Confirm Installation**:
   - A confirmation message will appear indicating that the extension has been installed. If enabled, you’ll see its icon in the Firefox toolbar.

7. **Restart Firefox if Necessary**:
   - In most cases, Firefox will not require a restart for the extension to work, but if it does, simply restart the browser to activate the extension.

Your `.xpi` extension should now be installed and ready to use in Firefox.

---

### Additional Notes

- File Access: This extension intercepts .txt and .json file links and fetches them to display in a modal on the same page. It does not open new tabs or initiate file downloads. But there is an added download button so that the file can be downloaded.
- Compatibility: This extension was tested on Chrome, Arc, Brave, and Firefox browsers but may work in other browsers.
