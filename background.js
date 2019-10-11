chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {urlMatches: 'https://*/'},
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {urlMatches: 'http://*/'},
                })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });

    chrome.storage.sync.set({
        twitter: {
            apikey: null,
            apikeysecret: null,
            accesstoken: null,
            accesstokensecret: null
        }
    });
});