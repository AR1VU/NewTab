importScripts('./sheet-url.js', './csv.js', './db-manager.js');


// Installation steps.
chrome.runtime.onInstalled.addListener(() => {
  // Clear the local storage and read the feed immediately.
  chrome.storage.local.clear();
  refresh();

  // Create an alarm to read the feed every hour.
  chrome.alarms.create('refresh', { periodInMinutes: 60 });
});


// Alarm steps.
chrome.alarms.onAlarm.addListener((alarm) => {
  refresh();
});


async function refresh() {
  try {
    // Uses the DBManager to read the feed.
    let dbm = new DBManager(SHEET_URL);
    await dbm.load();
    await dbm.refresh();
    await dbm.save();
  } catch (err) {
  }
}


async function report() {
  // Reports the last checked times, to confirm everything is working.
  let sheet = await getLocalStorage('sheet') || {};
  console.log(SHEET_URL, 'last checked at', sheet.lastChecked);
}
