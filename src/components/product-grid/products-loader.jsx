import * as React from "react";
import * as ReactDOM from "react-dom";
import { toODataString } from "@progress/kendo-data-query";
import { useLocation, useNavigate, Outlet, Link } from "react-router-dom";
import axios from "axios";
export const ProductsLoader = (props) => {
  const baseUrl = "http://localhost:5027/odata/Application?$count=true&";
  const init = {
    method: "GET",
    accept: "application/json",

    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Include JWT token in the Authorization header
    },
  };

  const navigate = useNavigate();
  const lastSuccess = React.useRef("");
  const pending = React.useRef("");
  const requestDataIfNeeded = () => {
    if (
      pending.current ||
      toODataString(props.dataState) === lastSuccess.current
    ) {
      return;
    }
    pending.current = toODataString(props.dataState);
    fetch(baseUrl + pending.current, init)
      .then((response) => {
        if (response.status === 401) {
          navigate("/");
        } else {
          console.log(response);
          if (response.ok) {
            return response.json();
          }
          throw new Error("Something went wrong");
        }
      })
      .then((json) => {
        if (json) {
          lastSuccess.current = pending.current;
          pending.current = "";
          if (toODataString(props.dataState) === lastSuccess.current) {
            props.onDataReceived.call(undefined, {
              data: json.value,
              total: json["@odata.count"],
            });
          } else {
            requestDataIfNeeded();
          }
        }
      });
  };
  requestDataIfNeeded();
  return pending.current ? <LoadingPanel /> : null;
};
const LoadingPanel = () => {
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
