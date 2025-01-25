// Get elements
const autoExpandReplyBoxCheckbox = document.getElementById("autoExpandReplyBox");

// Load saved settings
chrome.storage.sync.get({ autoExpandReplyBox: true }, (data) => {
  autoExpandReplyBoxCheckbox.checked = data.autoExpandReplyBox;
});

// Save settings when toggled
autoExpandReplyBoxCheckbox.addEventListener("change", () => {
  const autoExpandReplyBox = autoExpandReplyBoxCheckbox.checked;
  chrome.storage.sync.set({ autoExpandReplyBox }, () => {
	console.log("Setting saved:", autoExpandReplyBox);
  });
});
