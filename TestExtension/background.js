let timerInterval = null;
let timeSpent = 0;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    chrome.storage.local.get("trackedWebsite", (data) => {
      const trackedWebsite = data.trackedWebsite;
      if (tab.url.includes(trackedWebsite)) {
        startTimer();
      } else {
        stopTimer();
      }
    });
  }
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  chrome.storage.local.get("trackedWebsite", (data) => {
    const trackedWebsite = data.trackedWebsite;
    if (tab.url.includes(trackedWebsite)) {
      startTimer();
    } else {
      stopTimer();
    }
  });
});

function startTimer() {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      timeSpent++;
      chrome.storage.local.set({ timeSpent });

      // Send a message to the popup to update the timer display
      chrome.runtime.sendMessage({ type: "updateTime", timeSpent });
    }, 1000);
  }
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;

    // Store the time spent in local storage for future reference
    chrome.storage.local.set({ timeSpent });
  }
}
