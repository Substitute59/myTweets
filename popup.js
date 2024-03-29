let tweets = '';
let cb = null;
let apikey = null;
let apikeysecret = null;
let accesstoken = null;
let accesstokensecret = null;

chrome.storage.sync.get(['apikey', 'apikeysecret', 'accesstoken', 'accesstokensecret'], function(result) {
    apikey = result.apikey;
    apikeysecret = result.apikeysecret;
    accesstoken = result.accesstoken;
    accesstokensecret = result.accesstokensecret;
    if (apikey, apikeysecret, accesstoken, accesstokensecret) {
        cb = new Codebird;
        cb.setUseProxy(false);
        cb.setConsumerKey(apikey, apikeysecret);
        cb.setToken(accesstoken, accesstokensecret);

        cb.__call("statuses_homeTimeline", {
            count: 200
        }, function(reply, rate, err) {
            reply.forEach(tweet => {
                tweets += `
                    <div class="tweet">
                        <div class="tweet-userimage"><img src="${tweet.user.profile_image_url}"/></div>
                        <div class="tweet-content">
                            <div class="tweet-username"><a href="https://twitter.com/${tweet.user.screen_name}">${tweet.user.name}</a></div>
                            <div class="tweet-text">${tweet.text.parseURL()}</div>
                            <div class="tweet-retweet"><button class="retweet-button" data-id="${tweet.id_str}">Retweet</button></div>
                        </div>
                    </div>
                `;
            });
            document.getElementById('tweets').innerHTML = tweets;
            document.getElementById('loader').style.display = 'none';

            chrome.cookies.get({
                "url": "http://developer.chrome.com/extensions/cookies.html",
                "name": "scroll"
            }, function(cookie) {
                if (cookie) {
                    window.scrollTo(0, parseInt(cookie.value));
                }
            });
        });
    } else {
        document.getElementById('tweets').innerHTML = '<div class="error">Veuillez renseigner vos API keys dans les options</div>';
        document.getElementById('loader').style.display = 'none';
    }
});

document.addEventListener('click', e => {
    if (e.target.className === 'retweet-button') {
        cb.__call("statuses_retweet_ID", {
            id: e.target.dataset.id
        }, function(reply, rate, err) {
            var span = document.createElement('span');
            span.className = 'success';
            span.textContent = "Retweeté !";
            e.target.after(span);
        });
    }
    if (e.target.tagName === 'A') {
        chrome.tabs.create({url: e.target.href, active: false});
    }
});

window.addEventListener('scroll', () => {
    console.log(window.scrollY);
    var event = new Date();
    event.setMinutes(event.getMinutes() + 10);
    chrome.cookies.set({
        "name": "scroll",
        "url": "http://developer.chrome.com/extensions/cookies.html",
        "value": window.scrollY.toString(),
        "expirationDate": event.getTime()
    }, function (cookie) {
        console.log(JSON.stringify(cookie));
        console.log(chrome.extension.lastError);
        console.log(chrome.runtime.lastError);
    });
});

String.prototype.parseURL = function() {
    return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function( url ) {
        return url.link( url );
    });
};
