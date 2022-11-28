// Elements
const navLinks = document.querySelectorAll("#header nav a");
const navLinksCount = navLinks.length;
const header = document.querySelector("header");
const caseStudy = document.getElementById("case-study");
const caseStudyText = document.querySelector(".prose");
const toc = document.getElementById("toc");
const tocLinks = document.querySelectorAll("#toc a");
const tocLinksCount = tocLinks.length;

const handlePageLoad = () => {
  cycleTrellisFeatures();
};


const cycleTrellisFeatures = () => {
  const features = document.querySelector(".h-full h2").children;
  let currentIndex = 0;
  features[currentIndex].style.color = "#071E3D";

  setInterval(() => {
    features[currentIndex].style.color = "#fff";
    currentIndex += 1;

    if (currentIndex > 2) currentIndex = 0;

    features[currentIndex].style.color = "#071E3D";

  }, 2000);
}

// Events
document.addEventListener("DOMContentLoaded", handlePageLoad);