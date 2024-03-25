import { useContextVariable } from "../reducer/ContextProvide";
import CONSTANTS from "./Constants";
function IconUp() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="9"
        height="5"
        viewBox="0 0 9 5"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.78033 4.79079C8.48743 5.06974 8.01256 5.06974 7.71967 4.79079L4.49999 1.72442L1.28031 4.79079C0.987433 5.06974 0.512532 5.06974 0.219657 4.79079C-0.0732183 4.51184 -0.0732183 4.05957 0.219657 3.78064L3.96966 0.209197C4.26254 -0.0697327 4.73744 -0.0697327 5.03032 0.209197L8.78033 3.78064C9.07322 4.05957 9.07322 4.51184 8.78033 4.79079Z"
          fill="#212121"
        />
      </svg>
    );
}

function IconDown() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="9"
        height="5"
        viewBox="0 0 9 5"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.219668 0.209208C0.512566 -0.069736 0.987437 -0.069736 1.28033 0.209208L4.50001 3.27558L7.71969 0.209208C8.01257 -0.069736 8.48747 -0.069736 8.78034 0.209208C9.07322 0.488159 9.07322 0.940432 8.78034 1.21936L5.03034 4.7908C4.73746 5.06973 4.26256 5.06973 3.96968 4.7908L0.219668 1.21936C-0.0732226 0.940432 -0.0732226 0.488159 0.219668 0.209208Z"
          fill="#212121"
        />
      </svg>
    );
}

function sendHeightToParent(height) {
    window.parent.postMessage({
      type: 'height',
      height: height,
    }, "*");
 }


function getVideoId() {
    window.parent.postMessage({
      type: 'video-id',
    }, "*");
}

function getStorage(k) {
  window.parent.postMessage({
    type: 'get-from-storage',
    key:k
  }, "*");
}

function syncStorage(k,v) {
  window.parent.postMessage({
    type: 'storage',
    key:k,
    value:v
  }, "*");
}



export {IconDown,IconUp,sendHeightToParent,getVideoId,syncStorage,getStorage}