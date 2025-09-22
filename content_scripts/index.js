(() => {
  if (window.ghTocHasRun) {
    return;
  }
  window.ghTocHasRun = true;

  const selectors = [
    'h1.gh-header-title',
    'div[aria-label="Header"] h1', // issue title
    'div[aria-label="Header"] h2', // issue title in project view
    '.markdown-body h1',
    '.markdown-body h2',
    '.markdown-body h3',
    '.markdown-body h4',
    '.markdown-body h5',
    '.markdown-body h6',
  ];

  function getHeadings() {
    const headings = [];
    const hs = document.querySelectorAll(selectors);
    for (let i = 0; i < hs.length; ++i) {
      const heading = hs[i];
      headings.push({
        tagName: heading.tagName,
        // issue title in project view contains a line break
        text: heading.innerText.replace(/\n/, ' '),
      });
    }

    return headings;
  }

  /**
   * @param {HTMLElement} heading
   */
  function scrollToHeading(heading) {
    console.log('scrollToHeading');
    const rect = heading.getBoundingClientRect();
    const path_elems = window.location.pathname.split('/').filter((x) => x);
    const query = new URLSearchParams(window.location.search);
    if (path_elems.length === 2 || path_elems[2] === 'tree') {
      // README
      window.scrollBy(0, rect.top - 48);
    } else if (path_elems[2] === 'issues') {
      if (heading.querySelector('.markdown-title')) {
        window.scroll(0, 0);
      } else {
        heading.style.scrollMarginTop = '56px';
        heading.scrollIntoView();
      }
    } else if (path_elems[2] === 'projects' && query.get('pane') === 'issue') {
      if (!heading.querySelector('.markdown-title')) {
        heading.style.scrollMarginTop = '56px';
      }
      heading.scrollIntoView();
    } else if (path_elems[2] === 'pull') {
      if (heading.classList.contains('gh-header-title')) {
        window.scroll(0, 0);
      } else {
        heading.style.scrollMarginTop = '60px';
        heading.scrollIntoView();
      }
    } else if (path_elems[2] === 'wiki') {
      window.scrollBy(0, rect.top);
    } else if (path_elems[2] === 'blob' && document.getElementById('repos-sticky-header')) {
      // markdown file
      window.scrollBy(0, rect.top - 94);
    }
  }

  browser.runtime.onMessage.addListener(async (message, _sender, _sendResponse) => {
    switch (message.command) {
      case 'getHeadings':
        return getHeadings();
      case 'scrollToHeading': {
        const hs = document.querySelectorAll(selectors);
        scrollToHeading(hs[message.index]);
        break;
      }
    }
  });
})();
