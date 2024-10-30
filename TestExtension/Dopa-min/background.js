let timers = {}; // Stores active timers for each website

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => { // Adds a listener to "onUpdated", which returns the tabId, the Info and the tab itself.
  if (changeInfo.status === "complete") {
    chrome.storage.local.get("trackedWebsites", (data) => {
      const trackedWebsites = data.trackedWebsites || {};
      const activeWebsite = Object.keys(trackedWebsites).find(site => tab.url.includes(site));
      
      if (activeWebsite) {
        startTimer(activeWebsite, tabId);
        // Show overlay immediately when first opening the website
        chrome.tabs.sendMessage(tabId, { type: "showOverlay" });
      } else {
        stopAllTimers(); // Otherwise, end all timers.
      }
    });
  }
});

chrome.tabs.onActivated.addListener(async (activeInfo) => { // Used for when a tab gets activated, or clicked on.
  const tab = await chrome.tabs.get(activeInfo.tabId);

  chrome.storage.local.get("trackedWebsites", (data) => {
    const trackedWebsites = data.trackedWebsites || {};
    const activeWebsite = Object.keys(trackedWebsites).find(site => tab.url.includes(site));
    
    if (activeWebsite) {
      startTimer(activeWebsite, activeInfo.tabId); // If the website is there, start the timer.
    } else {
      stopAllTimers(); // Otherwise, don't.
    }
  });
});

function startTimer(website, tabId) {
  if (!timers[website]) {// If it finds the website in the timer, it will stop the execution of the following statements.
    timers[website] = setInterval(() => { // Creates a new interval, activating every 1000 milliseconds, or 1 second.
      chrome.storage.local.get("trackedWebsites", (data) => { // Gets "trackedWebsites" in the local storage.
      const trackedWebsites = data.trackedWebsites || {};
        if (trackedWebsites[website] !== undefined) {

          trackedWebsites[website]++; // Adds time to the tracked website.
          chrome.storage.local.set({ trackedWebsites });

            // Check if 30 minutes have passed (1800 seconds)
          if (trackedWebsites[website] % 1800 === 0) {
              // Send message to content script to display overlay
            chrome.tabs.sendMessage(tabId, { type: "showOverlay" });
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
