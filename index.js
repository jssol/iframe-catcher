const getUrlParameter = (url, parameter) => {
  let name = parameter.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  let regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  let results = regex.exec(url);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
};

const createIframeElement = (url) => {
  let iFrame = document.createElement("iframe");
  iFrame.src = url;
  iFrame.style.width = "100%";
  iFrame.style.height = "100%";
  iFrame.style.border = "none";

  // Create hover button element
  let hoverBtn = document.createElement("div");
  const style = {
    backgroundColor: "red",
    color: "white",
    padding: "10px",
    position: "absolute",
    top: "0",
    right: "0",
    cursor: "pointer",
  };
  hoverBtn.style = { ...hoverBtn.style, ...style };
  hoverBtn.addEventListener("click", () => {
    iFrame.remove();
    hoverBtn.remove();
  });

  // Append iFrame and hover button to the body
  document.body.appendChild(iFrame);
  document.body.appendChild(hoverBtn);
};

const injectIFrame = () => {
  // Get current URL
  let currentUrl = window.location.href;
  let otherUrl = currentUrl.match(/.*url/)[0].match(/(\w+_url)/)[0];

  // Check if URL has "iframe_url" parameter
  let iframeUrl = getUrlParameter(currentUrl, "iframe_url");
  let otherIframeUrl = getUrlParameter(currentUrl, otherUrl);
  if (iframeUrl) {
    // Create iFrame element
    createIframeElement(iframeUrl);
  } else if (otherIframeUrl) {
    createIframeElement(otherIframeUrl);
  }
};

window.addEventListener("load", () => injectIFrame());
