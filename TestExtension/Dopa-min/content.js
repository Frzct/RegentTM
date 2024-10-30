chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "showOverlay") {
    displayOverlay();
  }
});

function displayOverlay() {
  chrome.storage.local.get("trackedWebsites", (data) => {
    const trackedWebsites = data.trackedWebsites || {};
    const currentURL = window.location.href;

    // Check if the current URL matches any tracked website
    const trackedWebsite = Object.keys(trackedWebsites).find(site => currentURL.includes(site));
    if (trackedWebsite) {
      // Create overlay
      const overlay = document.createElement("div");
      overlay.id = "trackingOverlay";
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
      overlay.style.display = "flex";
      overlay.style.alignItems = "center";
      overlay.style.justifyContent = "center";
      overlay.style.zIndex = "1000";

      // Create white rectangle container
      const rectangle = document.createElement("div");
      rectangle.style.width = "80%";
      rectangle.style.maxWidth = "600px";
      rectangle.style.padding = "20px";
      rectangle.style.backgroundColor = "white";
      rectangle.style.borderRadius = "8px";
      rectangle.style.textAlign = "center";

      // Create content inside rectangle
      const message = document.createElement("h2");
      message.innerText = `Do you really need to access ${trackedWebsite}?`;
      message.style.color = "black";
      message.style.marginBottom = "20px";
      rectangle.appendChild(message);
      
      // Create close button
      // Countdown close button for "Yes, I really need it"
      let countdown = 5;
      const closeButton = document.createElement("button");
      closeButton.innerText = "Yes, I really need it";
      closeButton.style.padding = "10px 20px";
      closeButton.style.fontSize = "16px";
      closeButton.style.cursor = "not-allowed";
      closeButton.disabled = true;
      rectangle.appendChild(closeButton);

      //Count down for the close button
      const countdownInterval = setInterval(() => {
        countdown--;
        closeButton.innerText = `Yes, I really need it (${countdown})`;
  
        if (countdown === 0) {
          clearInterval(countdownInterval);
          closeButton.innerText = "Yes, I really need it";
          closeButton.disabled = false;
          closeButton.style.cursor = "pointer";
        }
      }, 1000);

       // Remove overlay when "Yes" button is enabled and clicked
       closeButton.addEventListener("click", () => {
        if (!closeButton.disabled) {
          overlay.style.display = "none";
        }
      });

      // Append the rectangle to the overlay
      overlay.appendChild(rectangle);

      // Add overlay to the document
      document.body.appendChild(overlay);
    }
  });
}

/////

