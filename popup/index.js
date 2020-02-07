(function() {
  function createToc(headings) {
    const toc = document.createElement('div');
    toc.setAttribute('id', 'toc');

    for (let i = 0; i < headings.length; ++i) {
      const item = document.createElement('div');
      item.innerText = headings[i].text;
      item.setAttribute('class', 'toc-item');
      item.style = `padding-left: ${headings[i].tagName[1]}em;`;
      item.onclick = () => scrollToHeading(i);
      toc.append(item);
    }
    document.getElementById('toc').replaceWith(toc);
  }

  async function getHeadings() {
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    const response = await browser.tabs.sendMessage(tabs[0].id, {
      command: 'getHeadings',
    });
    createToc(response);
  }

  async function scrollToHeading(index) {
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    browser.tabs
      .sendMessage(tabs[0].id, { command: 'scrollToHeading', index: index })
      .catch(alert);
  }

  browser.tabs.executeScript({ file: '/browser-polyfill.min.js' });
  browser.tabs
    .executeScript({ file: '/content_scripts/index.js' })
    .then(getHeadings)
    .catch(alert);
})();
