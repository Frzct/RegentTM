document.getElementById("saveButton").addEventListener("click", () => {
  const website = document.getElementById("inputField").value;
  chrome.storage.local.set({ trackedWebsite: website, timeSpent: 0 }, () => {
    document.getElementById("websiteName").textContent = website;
    document.getElementById("timeSpent").textContent = "0";
    alert(`Tracking website: ${website}`);
  });
});

// Function to update the displayed time and website
function updateDisplay() {
  chrome.storage.local.get(["trackedWebsite", "timeSpent"], (data) => {
    document.getElementById("websiteName").textContent = data.trackedWebsite || "None";
    document.getElementById("timeSpent").textContent = data.timeSpent || "0";
  });
}

// Update display on popup load
updateDisplay();

// Listen for updates from the background script
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "updateTime") {
    document.getElementById("timeSpent").textContent = message.timeSpent;
  }
});
