chrome.storage.local.get("trackedWebsite", (data) => {
  const trackedWebsite = data.trackedWebsite;
  if (window.location.href.includes(trackedWebsite)) {
    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "trackingOverlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    overlay.style.color = "white";
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "1000";

    // Create content in overlay
    const message = document.createElement("h2");
    message.innerText = "You are being tracked on this website";
    overlay.appendChild(message);

    // Create close button
    const closeButton = document.createElement("button");
    closeButton.innerText = "Close";
    closeButton.style.marginTop = "20px";
    closeButton.style.padding = "10px 20px";
    closeButton.style.fontSize = "16px";
    closeButton.style.cursor = "pointer";
    closeButton.addEventListener("click", () => {
      overlay.style.display = "none";
    });
    overlay.appendChild(closeButton);

    // Add overlay to the document
    document.body.appendChild(overlay);
  }
});
