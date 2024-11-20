let timers = {}; // Stores active timers for each website
let activeTabId = null; // Stores the ID of the currently active tracked tab

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Adds a listener to "onUpdated", which returns the tabId, the Info, and the tab itself.
  if (changeInfo.status === "complete") {
    chrome.storage.local.get("trackedWebsites", (data) => {
      const trackedWebsites = data.trackedWebsites || {};
      const activeWebsite = Object.keys(trackedWebsites).find(site => tab.url.includes(site));

      if (activeWebsite) {
        startTimer(activeWebsite, tabId); // Start the timer if the website is in tracked websites
        chrome.tabs.sendMessage(tabId, { type: "showOverlay" }); // Show overlay when the website first loads
        activeTabId = tabId; // Set activeTabId to the current tracked tab
      }
    });
  }
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  // Used for when a tab gets activated, or clicked on.
  const tab = await chrome.tabs.get(activeInfo.tabId);

  chrome.storage.local.get("trackedWebsites", (data) => {
    const trackedWebsites = data.trackedWebsites || {};
    const activeWebsite = Object.keys(trackedWebsites).find(site => tab.url.includes(site));

    stopAllTimers(); // Stop all timers before starting a new one

    // Start the timer and show overlay for the new tracked tab, if applicable
    if (activeWebsite) {
      startTimer(activeWebsite, activeInfo.tabId); // Start timer for the tracked tab
      chrome.tabs.sendMessage(activeInfo.tabId, { type: "showOverlay" }); // Show overlay when switching to tracked tab
      activeTabId = activeInfo.tabId; // Update activeTabId to the new active tracked tab
    } else {
      activeTabId = null; // Reset if there's no tracked website in the active tab
    }
  });
});

function startTimer(website, tabId) {
  if (!timers[website]) {
    // Creates a new interval, activating every 1000 milliseconds, or 1 second.
    timers[website] = setInterval(() => {
      chrome.storage.local.get("trackedWebsites", (data) => {
        const trackedWebsites = data.trackedWebsites || {};
        if (trackedWebsites[website] !== undefined) {
          trackedWebsites[website]++; // Adds time to the tracked website.
          chrome.storage.local.set({ trackedWebsites });

          if (trackedWebsites[website] > 15 * 60){
            chrome.tabs.sendMessage(tabId, { type: "timeLimitEnd" })

            return
          }

          // Notify popup to update displayed times
          chrome.runtime.sendMessage({ type: "updateTimes" });
        }
      });
    }, 1000);
  }
}

function stopAllTimers() {
  for (const website in timers) {
    clearInterval(timers[website]); // Clears the interval stored in the website...
    delete timers[website]; // And deletes the entry from the Object.
  }
}
