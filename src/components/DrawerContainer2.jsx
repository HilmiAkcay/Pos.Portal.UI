import * as React from "react";
import { useLocation, useNavigate, Outlet, Link } from "react-router-dom";
import {
  Drawer,
  DrawerContent,
  DrawerItem,
} from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import { menu } from "./MenuContent";
import {
  menuIcon,
  chevronDownIcon,
  chevronRightIcon,
} from "@progress/kendo-svg-icons";
import { SvgIcon } from "@progress/kendo-react-common";
import { Alert } from "./dashboard/Alert";
import { Input } from "@progress/kendo-react-inputs";

const CustomItem = (props) => {
  const { visible, ...others } = props;
  const className = props.parentId != null ? " subLi" : "";
  console.log(className);
  console.log(props);
  const arrowDir = props.dataExpanded ? chevronDownIcon : chevronRightIcon;
  return props.visible === false ? null : (
    <DrawerItem {...others}>
      <div className={className}>
        <SvgIcon icon={props.svgIcon} />
      </div>

      <span className={"k-item-text"}>{props.text && props.text}</span>
      {props.dataExpanded !== undefined && (
        <SvgIcon
          icon={arrowDir}
          style={{
            marginLeft: "auto",
          }}
        />
      )}
    </DrawerItem>
  );
};
const DrawerContainer2 = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerExpanded, setDrawerExpanded] = React.useState(true);
  const [items, setItems] = React.useState(menu);
  const handleClick = () => {
    setDrawerExpanded(!drawerExpanded);
  };
  const onSelect = (ev) => {
    const currentItem = ev.itemTarget.props;
    const isParent = currentItem.dataExpanded !== undefined;
    const nextExpanded = !currentItem.dataExpanded;
    const newData = items.map((item) => {
      const { selected, dataExpanded: currentExpanded, id, ...others } = item;
      const isCurrentItem = currentItem.id === id;
      return {
        selected: isCurrentItem,
        dataExpanded:
          isCurrentItem && isParent ? nextExpanded : currentExpanded,
        id,
        ...others,
      };
    });

    if (ev.itemTarget.props.route != null) navigate(ev.itemTarget.props.route);

    setItems(newData);
  };

  const data = items.map((item) => {
    const { parentId, ...others } = item;
    if (parentId !== undefined) {
      const parentEl = items.find((parent) => parent.id === parentId);
      return {
        parentId,
        ...others,
        visible: parentEl && parentEl.dataExpanded,
      };
    }
    return item;
  });

  const setSelectedItem = (pathName) => {
    let currentPath = items.find((item) => item.route === pathName);
    if (currentPath && currentPath.text) {
      return currentPath.text;
    }
  };

  const selected = setSelectedItem(location.pathname);

  const handleFilter = (event) => {
    debugger;
    console.log(menu);
    const value = event.target.value.toLowerCase();
    const filtered = menu.filter(
      (m) => m.text && m.text.toLowerCase().includes(value)
    );
    setItems(filtered);
  };

  return (
    <div>
      <div className="custom-toolbar">
        <Button svgIcon={menuIcon} fillMode="flat" onClick={handleClick} />
        <span className="overview">
          {selected === "Dashboard" ? "Overview" : selected}
        </span>

        <div className="right-widget">
          <div className="alert-container">
            <Alert />
          </div>
          <Link
            to="/home/about"
            style={{
              color: "#424242",
              fontWeight: "400",
              fontSize: "14px",
              fontFamily: "Roboto",
              marginTop: "3px",
            }}
          >
            About
          </Link>
        </div>
      </div>
      <div className="user-container">
        <img
          src={require("../assets/people/user-avatar.jpg")}
          alt="user avatar"
        />
        <h1>Jaxons Danniels</h1>
        <div className="user-email">jaxons.daniels@company.com</div>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button className="user-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">
            Sign Out
          </Button>
        </Link>
      
        
        <Input
          style={{
            border: "2px solid #ccc",
            boxShadow: "inset 0px 0px 0.5px 0px rgba(0,0,0,0.0.1)",
            margin:"5px",
            width:"95%",
          }}
          placeholder={"Search in Menu"}
          onChange={handleFilter}
        />
      
      
      </div>


      
      <Drawer
        expanded={drawerExpanded}
        mode="push"
        width={240}
        items={data}
        item={CustomItem}
        onSelect={onSelect}
      >
        <DrawerContent>
          {props.children}
          <Outlet />
        </DrawerContent>
      </Drawer>
    </div>
  );
};
export default DrawerContainer2;
