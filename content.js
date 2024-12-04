(() => {
    const MODAL_ID = "customTxtModal";
    const MODAL_MAX_HEIGHT = "80vh";
    const MODAL_WIDTH = "90%";
    const MODAL_MAX_WIDTH = "800px";
    const HEADER_TITLE = "File Preview";
    const REPLY_BOX_EXPAND_FEATURE_KEY = "replyBoxExpandEnabled";

    // Function to escape HTML characters
    const escapeHtml = (text) => {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(text));
        return div.innerHTML;
    };

    // Function to make URLs clickable in text
    const makeLinksClickable = (text) => {
        const urlRegex = /(https?:\/\/[^\s\[\]()<>]+(?:\.[^\s\[\]()<>]+)+[^\s\[\]()<>]*)/g;
        return text.replace(urlRegex, (url) => `<a href="${url}" target="_blank" style="color: #4CA9FF;">${url}</a>`);
    };

    // Function to pretty print JSON
    const prettyPrintJson = (json) => {
        try {
            const parsedJson = JSON.parse(json);
            return escapeHtml(JSON.stringify(parsedJson, null, 2));
        } catch {
            console.error("Invalid JSON");
            return escapeHtml(json);
        }
    };

    // Utility function to set styles
    const setStyles = (element, styles) => {
        Object.assign(element.style, styles);
    };

    // Function to create a button with common styles
    const createButton = (text, onClick) => {
        const button = document.createElement("button");
        button.textContent = text;
        setStyles(button, {
            padding: "6px 12px",
            border: "1px solid #000",
            color: "#000",
            borderRadius: "4px",
            background: "transparent",
            fontSize: "14px",
            cursor: "pointer"
        });
        button.onclick = onClick;
        return button;
    };

    // Function to create and show the custom modal
    const createModal = (content, downloadUrl, originalFilename) => {
        const isJson = content.trim().startsWith("{") && content.trim().endsWith("}") ||
                       content.trim().startsWith("[") && content.trim().endsWith("]");
        
        const originalContent = content;
        const displayContent = isJson ? prettyPrintJson(content) : makeLinksClickable(content);

        // Remove existing modal if present
        const existingModal = document.getElementById(MODAL_ID);
        if (existingModal) existingModal.remove();

        // Modal container
        const modal = document.createElement("div");
        modal.id = MODAL_ID;
        setStyles(modal, {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "5000",
            fontFamily: "Arial, sans-serif"
        });

        // Click outside to close
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.remove();
        });

        // Modal content box with dark mode styling
        const modalContent = document.createElement("div");
        setStyles(modalContent, {
            backgroundColor: "#000",
            width: MODAL_WIDTH,
            maxWidth: MODAL_MAX_WIDTH,
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            position: "relative",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            maxHeight: MODAL_MAX_HEIGHT,
            overflow: "hidden"
        });

        // Modal header
        const header = document.createElement("div");
        setStyles(header, {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 20px",
            backgroundColor: "#fff",
            color: "#fff",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px"
        });

        const title = document.createElement("h2");
        title.textContent = `${HEADER_TITLE} - ${originalFilename}`;
        title.style.fontSize = "16px";
        title.style.margin = "0";
        header.appendChild(title);

        // Button container
        const buttonContainer = document.createElement("div");
        setStyles(buttonContainer, {
            display: "flex",
            gap: "10px",
            padding: "10px"
        });

        // Copy button
        const copyButton = createButton("Copy", () => {
            navigator.clipboard.writeText(originalContent).then(() => {
                highlightButton(copyButton);
            }).catch(err => {
                console.error("Error copying text: ", err);
            });
        });

        // Download button
        const downloadButton = createButton("Download", () => {
            highlightButton(downloadButton);
            fetch(downloadUrl)
                .then(response => {
                    if (!response.ok) throw new Error("Network response was not ok");
                    return response.blob();
                })
                .then(blob => {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = originalFilename;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                })
                .catch(error => console.error("Error fetching the file:", error));
        });

        // Append buttons to container
        buttonContainer.appendChild(copyButton);
        buttonContainer.appendChild(downloadButton);

        // Assemble header and content
        header.appendChild(buttonContainer);
        const contentContainer = document.createElement("pre");
        setStyles(contentContainer, {
            overflowY: "auto",
            flex: "1",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            fontSize: "14px",
            color: "#fff",
            padding: "20px",
            margin: "0"
        });
        contentContainer.innerHTML = displayContent;

        // Assemble modal
        modalContent.appendChild(header);
        modalContent.appendChild(contentContainer);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

// ESC key close
        const escCloseHandler = (e) => {
            if (e.key === "Escape") {
                const customModal = document.getElementById(MODAL_ID); // Check for your custom modal
                if (customModal) {
                    e.preventDefault(); // Prevent default ESC behavior
                    e.stopPropagation(); // Stop the event from reaching HelpScout's listener
                    customModal.remove(); // Remove your custom modal
                    document.removeEventListener("keydown", escCloseHandler); // Cleanup the event listener
                    console.log("Custom modal closed.");
                }
            }
        };
        
        // Add the ESC key listener
        document.addEventListener("keydown", escCloseHandler, { capture: true });
    };

    // Function to highlight button temporarily using outline
    const highlightButton = (button) => {
        button.style.outline = "2px solid blue";
        setTimeout(() => {
            button.style.outline = "none";
        }, 2000);
    };

    // Function to expand the reply box
    const expandReplyBox = () => {
        const expandButton = document.querySelector('[data-testid="expand-button"]');
        if (expandButton) {
            console.log("Expand button found. Clicking to expand reply box.");
            expandButton.click();
        } else {
            console.warn("Expand button for reply box not found.");
        }
    };

    // Listen for the Reply button click if the feature is enabled
    if (localStorage.getItem(REPLY_BOX_EXPAND_FEATURE_KEY) === "false") {
        document.addEventListener("click", (event) => {
            const replyButton = event.target.closest("button[data-testid='reply-button']");
            if (replyButton) {
                console.log("Reply button clicked.");
                setTimeout(() => {
                    expandReplyBox(); // Attempt to expand the reply box
                }, 200); // Slight delay to ensure DOM is updated
            }
        });
    }

    // Intercept clicks on file links and fetch content
    document.addEventListener("click", (event) => {
        const anchor = event.target.closest("a");
        if (anchor) {
            const href = anchor.getAttribute("href");
            const originalFilename = anchor.getAttribute("title");

            // Ensure only .txt and .json files open in modal
            if (originalFilename && (originalFilename.endsWith(".txt") || originalFilename.endsWith(".json"))) {
                event.preventDefault();
                const fullDownloadUrl = window.location.origin + href;

                fetch(fullDownloadUrl)
                    .then(response => {
                        if (!response.ok) throw new Error("Network response was not ok");
                        return response.text().then(content => ({
                            content,
                            originalFilename
                        }));
                    })
                    .then(({ content, originalFilename }) => {
                        createModal(content, fullDownloadUrl, originalFilename);
                    })
                    .catch(error => console.error("Error fetching the file:", error));
            }
        }
    });

    console.log("Script initialized and listening for reply button clicks.");
})();
