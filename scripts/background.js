window.spoiler = {}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    window.spoiler[request.url] = request.count
})

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({url: 'popup.html'})
})

// window.bears = {}
// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     window.bears[request.url] = request.count
// })

// chrome.browserAction.onClicked.addListener(function (tab) {
//     chrome.tabs.create({url: 'popup.html'})
// })