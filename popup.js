// Flush any message on reload
clearMessage();

// Main function clear cookies.
function clearCookies() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.cookies.getAll({ url: tabs[0].url }, function (cookies) {
        for (var i = 0; i < cookies.length; i++) {
          chrome.cookies.remove({ url: tabs[0].url + cookies[i].path, name: cookies[i].name });
        }
       showMessage("Cookies cleared.");
      });
    });
  }
  
// Main function clear cache.
function clearCache() {
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.browsingData.removeCache({ originTypes: { unprotectedWeb: true } }, function () {
    showMessage('Cache cleared.');
    });
});
}

// Main function clear local and session storage
function clearStorage() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var currentTab = tabs[0];
        chrome.scripting.executeScript({
            target : {  tabId : currentTab.id },
            func : clearAppData,
        }).then(() => {
            showMessage("Local & Session Storage cleared.");
        });
    });
}

// Clear data function for call
function clearAppData(){
    window.localStorage.clear();
    window.sessionStorage.clear();
}

// Function to reload current page.
function reloadTab(){
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var currentTab = tabs[0];
        clearMessage();
        chrome.scripting.executeScript({
            target : {  tabId : currentTab.id },
            func : function(){
                window.location.reload();
            },
        }).then(() => {
        });
    });
}

// Function to show message.
function showMessage(message){
    if(message){
        document.getElementById('message').innerHTML = message;
    }else{
        clearMessage();
    }
}

// Function to clear message
function clearMessage() {
    document.getElementById('message').innerHTML = "";
}


// Register listeners
document.getElementById('clearCookiesBtn').addEventListener('click', clearCookies);
document.getElementById('clearCacheBtn').addEventListener('click', clearCache);
document.getElementById('clearStorageBtn').addEventListener('click', clearStorage);
document.getElementById('reloadeBtn').addEventListener('click', reloadTab);
  