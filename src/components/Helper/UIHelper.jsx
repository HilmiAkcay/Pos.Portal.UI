import * as ReactDOM from "react-dom";

export const LoadingPanel = () => {
    const loadingPanel = (
      <div className="k-loading-mask">
        <span className="k-loading-text">Loading Please Wait...</span>
        <div className="k-loading-image" />
        <div className="k-loading-color" />
      </div>
    );
    const gridContent = document && document.querySelector(".k-grid-content");
    return gridContent
      ? ReactDOM.createPortal(loadingPanel, gridContent)
      : loadingPanel;
  };