chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetchAndDisplay") {
    fetch(request.url)
      .then(response => {
        if (!response.ok) throw new Error("Network response was not ok");
        
        // Get file content and content type
        const contentType = response.headers.get("Content-Type");
        return response.text().then(content => ({
          content,
          contentType
        }));
      })
      .then(({ content, contentType }) => {
        // Determine filename based on content type
        let filename = "downloaded_file.txt";
        if (contentType === "application/json") {
          filename = "downloaded_file.json";
        }

        // Send content and filename to content.js
        chrome.tabs.sendMessage(sender.tab.id, {
          action: "displayContent",
          content: content,
          url: request.url,
          filename
        });
      })
      .catch(error => {
        console.error("Error fetching the file:", error);
      });
  }

  if (request.action === "downloadFile") {
    // Use filename passed from content.js
    chrome.downloads.download({
      url: request.url,
      filename: request.filename // Correct filename based on content type
    }, (downloadId) => {
      if (chrome.runtime.lastError) {
        console.error("Download failed:", chrome.runtime.lastError);
      } else {
        console.log("Download started with ID:", downloadId);
      }
    });
  }
});
