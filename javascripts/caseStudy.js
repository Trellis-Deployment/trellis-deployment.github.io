// Elements
const toc = document.getElementById("toc");
const tocLinks = document.querySelectorAll("#toc a");
const tocLinksCount = tocLinks.length;
const videos = document.getElementsByTagName("video");
const header = document.querySelector("header");


// Handlers
const handleScroll = () => {
  handleTocSelection();
  handleVideosAutoPlay();
};

const handleResize = () => {
  handleTocSelection();
};

const handlePageLoad = () => {
  handleTocSelection();
};

const clearSelectedToc = () => {
  const selectedTocItems = document.querySelectorAll("#toc .selected");
  const subItems = document.querySelectorAll(`li.subitem.show`);
  const subSubItems = document.querySelectorAll('li.subSubItems.show');

  subItems.forEach((subItem) => {
    subItem.classList.remove("show");
  });

  selectedTocItems.forEach((selectedTocItem) => {
    selectedTocItem.classList.remove("selected");
  });

  subSubItems.forEach((subSubItem) => {
    subSubItem.classList.remove("show");
  });
};

const selectTocItem = (link) => {
  const tocItem = link.closest("li");
  const dataSection = tocItem.dataset.section;
  const subItems = document.querySelectorAll(
    `li.subitem[data-section="${dataSection}"]`
  );

  subItems.forEach((subItem) => {
    subItem.classList.add("show");
  });

  tocItem.classList.add("selected");
};

const handleTocSelection = () => {
  for (let i = tocLinksCount - 1; i >= 0; i--) {
    const link = tocLinks[i];
    if (!link.hash) continue;
    const target = document.querySelector(link.hash);

    if (!!target && target.offsetTop <= window.scrollY) {
      clearSelectedToc();
      selectTocItem(link, target);

      break;
    }
  }
};

const handleVideosAutoPlay = () => {
  for (let i = 0; i < videos.length; i++) {
    const video = videos[i];

    if (video.offsetTop - header.offsetHeight - window.innerHeight <= window.scrollY &&
        video.offsetTop + video.offsetHeight - header.offsetHeight >= window.scrollY) {
      video.play();
      video.loop = true;
    } else {
      video.pause();
      video.loop = false;
    }
  }
}

// Helpers
const throttle = (callback, wait) => {
  let prevent = false;

  return function () {
    if (!prevent) {
      callback();
      prevent = true;
      setTimeout(function () {
        prevent = false;
      }, wait);
    }
  };
};

// Events
document.addEventListener("DOMContentLoaded", handlePageLoad);
document.addEventListener("scroll", throttle(handleScroll, 16));
window.addEventListener("resize", throttle(handleResize, 16));