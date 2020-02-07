(function() {
  if (window.ghTocHasRun) {
    return;
  }
  window.ghTocHasRun = true;

  const selectors = [
    // selectors for markdown file
    '.markdown-body.entry-content h1',
    '.markdown-body.entry-content h2',
    '.markdown-body.entry-content h3',
    '.markdown-body.entry-content h4',
    '.markdown-body.entry-content h5',
    '.markdown-body.entry-content h6',

    // selectors for issue or pull request
    '.comment .comment-body h1',
    '.comment .comment-body h2',
    '.comment .comment-body h3',
    '.comment .comment-body h4',
    '.comment .comment-body h5',
    '.comment .comment-body h6',

    // selectors for wiki
    'h1.gh-header-title',
    '#wiki-body h1',
    '#wiki-body h2',
    '#wiki-body h3',
    '#wiki-body h4',
    '#wiki-body h5',
    '#wiki-body h6',
  ];

  function getHeadings() {
    const headings = [];
    const hs = document.querySelectorAll(selectors);
    for (let i = 0; i < hs.length; ++i) {
      const heading = hs[i];
      headings.push({
        tagName: heading.tagName,
        text: heading.innerText,
      });
    }

    return headings;
  }

  function scrollToHeading(heading) {
    const rect = heading.getBoundingClientRect();
    const ghHeader = document.getElementsByClassName('gh-header-shadow');
    if (ghHeader.length) {
      const ghHeaderHeight = 60;
      window.scrollBy(0, rect.top - ghHeaderHeight);
    } else {
      window.scrollBy(0, rect.top);
    }
  }

  browser.runtime.onMessage.addListener(
    async (message, sender, sendResponse) => {
      switch (message.command) {
        case 'getHeadings':
          return getHeadings();
        case 'scrollToHeading':
          const hs = document.querySelectorAll(selectors);
          scrollToHeading(hs[message.index]);
          break;
      }
    }
  );
})();
