function IconUp() {
  return <img src="arrowup-black.svg" alt="arrow-icon"></img>;
}

function IconDown(props) {
  if (props.check) {
    return <img src="arrowdown-black.svg" alt="arrow-icon"></img>;
  } else {
    return <img src="arrowdown-grey.svg" alt="arrow-icon"></img>;
  }
}

function sendHeightToParent(height) {
  window.parent.postMessage(
    {
      type: "height",
      height: height,
    },
    "*",
  );
}

function getVideoId() {
  console.log("Vikram debug get videoID")
  window.parent.postMessage(
    {
      type: "video-id",
    },
    "*",
  );
}

function getStorage(k) {
  window.parent.postMessage(
    {
      type: "get-from-storage",
      key: k,
    },
    "*",
  );
}

function syncStorage(k, v) {
  window.parent.postMessage(
    {
      type: "storage",
      key: k,
      value: v,
    },
    "*",
  );
}

export {
  IconDown,
  IconUp,
  sendHeightToParent,
  getVideoId,
  syncStorage,
  getStorage,
};
