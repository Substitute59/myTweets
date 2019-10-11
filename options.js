let apikey = null;
let apikeysecret = null;
let accesstoken = null;
let accesstokensecret = null;
chrome.storage.sync.get(['apikey', 'apikeysecret', 'accesstoken', 'accesstokensecret'], function(result) {
    apikey = result.apikey;
    if (apikey) document.getElementById('apikey').value = apikey;
    apikeysecret = result.apikeysecret;
    if (apikeysecret) document.getElementById('apikeysecret').value = apikeysecret;
    accesstoken = result.accesstoken;
    if (accesstoken) document.getElementById('accesstoken').value = accesstoken;
    accesstokensecret = result.accesstokensecret;
    if (accesstokensecret) document.getElementById('accesstokensecret').value = accesstokensecret;
});

document.getElementById('submit').addEventListener('click', e => {
    const apikey = document.getElementById('apikey').value;
    const apikeysecret = document.getElementById('apikeysecret').value;
    const accesstoken = document.getElementById('accesstoken').value;
    const accesstokensecret = document.getElementById('accesstokensecret').value;
    chrome.storage.sync.set({ apikey: apikey }, function() {
        
    });
    chrome.storage.sync.set({ apikeysecret: apikeysecret }, function() {
        
    });
    chrome.storage.sync.set({ accesstoken: accesstoken }, function() {
        
    });
    chrome.storage.sync.set({ accesstokensecret: accesstokensecret }, function() {
        
    });
    var span = document.createElement('span');
    span.className = 'success';
    span.textContent = "Ok !";
    e.target.after(span);
});