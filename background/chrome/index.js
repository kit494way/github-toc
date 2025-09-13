chrome.runtime.onInstalled.addListener(() => {
  // 元のルールを削除した上で、
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    // 再度新しいルールを設定する
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
              hostEquals: 'github.com',
              schemes: ['https'],
            },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowAction()],
      },
    ]);
  });
});
