document.getElementById("addButton").addEventListener("click", () => {
  const website = document.getElementById("inputField").value.trim();
  if (website) {
    chrome.storage.local.get({ trackedWebsites: {} }, (data) => {
      const trackedWebsites = data.trackedWebsites;
      if (!trackedWebsites[website]) {
        trackedWebsites[website] = 0; // Initialize time to zero
      }
      chrome.storage.local.set({ trackedWebsites }, () => {
        document.getElementById("inputField").value = ""; // Clear input
        displayWebsites();
      });
    });
  }
});

function displayWebsites() {
  chrome.storage.local.get("trackedWebsites", (data) => {
    const websiteList = document.getElementById("websiteList");
    websiteList.innerHTML = ""; // Clear list
    
    for (const [website, timeSpent] of Object.entries(data.trackedWebsites || {})) {
      const item = document.createElement("div");
      item.className = "website-item";
      
      const name = document.createElement("span");
      name.textContent = formatDisplayName(website); // Display formatted name
      
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
    const trackedWebsites = data.trackedWebsites;
    delete trackedWebsites[website]; // Remove only when explicitly requested
    chrome.storage.local.set({ trackedWebsites }, displayWebsites);
  });
}

function formatDisplayName(url) {
  try {
    const domain = new URL(url).hostname.replace("www.", "");
    return domain.charAt(0).toUpperCase() + domain.slice(1);
  } catch (error) {
    return url;
  }
}

// Format time as HH:MM:SS
function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Update display on popup load
displayWebsites();

// Listen for updates from background script
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "updateTimes") {
    displayWebsites();
  }
});
