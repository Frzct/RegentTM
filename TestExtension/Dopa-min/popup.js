document.getElementById("addButton").addEventListener("click", () => {
  const website = document.getElementById("inputField").value.trim();

  if (!website) { return } // This is known as a guard statement. If this doesn't happen, stop execution of the following lines.

  chrome.storage.local.get({ trackedWebsites: {} }, (data) => {
    const trackedWebsites = data.trackedWebsites;
    trackedWebsites[website] = 0; // Initialize with zero time spent
    chrome.storage.local.set({ trackedWebsites }, () => {
      document.getElementById("inputField").value = ""; // Clear input
      displayWebsites();
    });
  });
});

function displayWebsites() {
  chrome.storage.local.get("trackedWebsites", (data) => {
    const websiteList = document.getElementById("websiteList");
    websiteList.innerHTML = ""; // Clear list
    
    for (const [website, timeSpent] of Object.entries(data.trackedWebsites || {})) {
      const item = document.createElement("div");
      item.className = "website-item";
      
      const name = document.createElement("span");
      name.textContent = website;
      
      const time = document.createElement("span");
      time.className = "time";
      time.textContent = `Time: ${formatTime(timeSpent)}`;
      
      const removeButton = document.createElement("span");
      removeButton.className = "remove-button";
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => removeWebsite(website));
      
      item.appendChild(name);
      item.appendChild(time);
      item.appendChild(removeButton);
      
      websiteList.appendChild(item);
    }
  });
}

function removeWebsite(website) {
  chrome.storage.local.get("trackedWebsites", (data) => {
    const trackedWebsites = data.trackedWebsites; // Gets the trackedWebsites list.
    delete trackedWebsites[website]; // Remove website from the list. Also, note that you can still make alterations to the children of an object/list even if its constant. Just, can't alter the object itself.
    chrome.storage.local.set({ trackedWebsites }, displayWebsites); // Update storage and display
  });
}

// Format time as HH:MM:SS
function formatTime(seconds) {

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60; // The "%" operator returns the remainder after dividing arg1 by arg2 (e.g. 15 % 60 returns 15 and 60 % 60 returns 0)

  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
} // Changes every argument to string format.

// Update the display on popup load
displayWebsites();

// Listen for updates from background script to refresh times
chrome.runtime.onMessage.addListener((message) => {

  if (message.type === "updateTimes") {
    displayWebsites();
  }

});
