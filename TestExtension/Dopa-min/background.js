let timers = {}; // Stores active timers for each website

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    chrome.storage.local.get("trackedWebsites", (data) => {
      const trackedWebsites = data.trackedWebsites || {};
      const activeWebsite = Object.keys(trackedWebsites).find(site => tab.url.includes(site));
      
      if (activeWebsite) {
        startTimer(activeWebsite, tabId);
        // Show overlay immediately when first opening the website
        chrome.tabs.sendMessage(tabId, { type: "showOverlay" });
      } else {
        stopAllTimers();
      }
    });
  }
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  chrome.storage.local.get("trackedWebsites", (data) => {
    const trackedWebsites = data.trackedWebsites || {};
    const activeWebsite = Object.keys(trackedWebsites).find(site => tab.url.includes(site));
    
    if (activeWebsite) {
      startTimer(activeWebsite, activeInfo.tabId);
    } else {
      stopAllTimers();
    }
  });
});

function startTimer(website, tabId) {
  if (!timers[website]) {
    timers[website] = setInterval(() => {
      chrome.storage.local.get("trackedWebsites", (data) => {
        const trackedWebsites = data.trackedWebsites || {};
        if (trackedWebsites[website] !== undefined) {
          trackedWebsites[website]++;
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
    clearInterval(timers[website]);
    delete timers[website];
  }
}
