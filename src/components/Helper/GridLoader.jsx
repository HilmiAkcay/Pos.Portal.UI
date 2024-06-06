import * as React from "react";
import { toODataString } from "@progress/kendo-data-query";
import { useNavigate } from "react-router-dom";
import { LoadingPanel } from "../Helper/UIHelper";
import { GetPagedAddress, Init } from "../Helper/FetchHelper";
export const GridLoader = (props) => {
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

    console.log("token 2"+sessionStorage.getItem("token"));
    
    fetch(GetPagedAddress(props.Controller, pending.current), Init())
      .then((response) => {
        if (response.status === 401) {
          navigate("/");
          console.log("Fetch Error:"+ response);
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
