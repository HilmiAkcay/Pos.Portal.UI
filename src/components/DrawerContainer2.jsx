import * as React from "react";
import { useLocation, useNavigate, Outlet,Link } from "react-router-dom";
import {
  Drawer,
  DrawerContent,
  DrawerItem,
} from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import {
  pencilIcon,
  heartIcon,
  minusIcon,
  globeOutlineIcon,
  menuIcon,
  chevronDownIcon,
  chevronRightIcon,
  gridIcon,
  globeIcon,
  aggregateFieldsIcon,
  gearIcon,
  calculatorIcon,
} from "@progress/kendo-svg-icons";
import { SvgIcon } from "@progress/kendo-react-common";

export const items = [
  {
    text: "Dashboard",
    selected: true,
    route: "/home/dashboard",
    svgIcon: gridIcon,
  },
  {
    text: "Performance and sales",
    selected: false,
    route: "/home/performance-and-sales",
    svgIcon: globeIcon,
  },
  {
    text: "Products",
    selected: false,
    route: "/home/products",
    svgIcon: aggregateFieldsIcon,
  },
  {
    text: "Products-grid",
    selected: false,
    route: "/home/product-grid",
    svgIcon: calculatorIcon,
    id: 5,
  },
  {
    text: "test",
    selected: false,
    route: "/home/account",
    svgIcon: calculatorIcon,
    parentId: 5,
    level: 1,
  },
  { separator: true },
  {
    text: "Settings",
    selected: false,
    route: "/home/account",
    svgIcon: gearIcon,
  },
  {
    route: "/home/billing",
    disabled: true,
  },
  {
    route: "/home/notifications",
    disabled: true,
  },
  {
    route: "/home/about",
    disabled: true,
  },
];

const CustomItem = (props) => {
  const { visible, ...others } = props;
  const className = props.parentId !=null?" subLi":"";
  console.log(className)
  console.log(props)
  const arrowDir = props.dataExpanded ? chevronDownIcon : chevronRightIcon;
  return props.visible === false ? null : (
    <DrawerItem {...others}>
        <div className={className}>
      <SvgIcon icon={props.svgIcon}  />

        </div>
      
      <span className={"k-item-text"}>{props.text}</span>
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
  const [items, setItems] = React.useState([
    {
      text: "Dashboard",
      svgIcon: pencilIcon,
      id: 1,
      selected: true,
      route: "/home/dashboard",
    },
    {
      separator: true,
    },
    {
      text: "Settings",
      svgIcon: gridIcon,
      id: 2,
      dataExpanded: true,
    },
    {
      text: "Product",
      svgIcon: aggregateFieldsIcon,
      id: 4,
      parentId: 2,
      route: "/home/products",
      level: 2,
    },
    {
        text: "Product Grid",
        svgIcon: aggregateFieldsIcon,
        id: 44,
        parentId: 2,
        route: "/home/product-grid",
        level: 1,
      },
    {
      text: "Italian Food",
      svgIcon: minusIcon,
      id: 5,
      parentId: 2,
      route: "/food/italian",
      level: 1,
    },
    {
      separator: true,
    },
    {
      text: "Travel",
      svgIcon: globeOutlineIcon,
      dataExpanded: true,
      id: 3,
      route: "/travel",
    },
    {
      text: "Europe",
      svgIcon: minusIcon,
      id: 6,
      parentId: 3,
      route: "/travel/europe",
      level: 1,
    },
    {
      text: "North America",
      svgIcon: minusIcon,
      id: 7,
      parentId: 3,
      route: "/travel/america",
      level: 1,
    },
  ]);
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
    if (currentPath.text) {
      return currentPath.text;
    }
  };

  const selected = setSelectedItem(location.pathname);

  return (
    <div>
      <div className="custom-toolbar">
        <Button svgIcon={menuIcon} fillMode="flat" onClick={handleClick} />
        <span className="overview">
          {selected === "Dashboard" ? "Overview" : selected}
        </span>
      </div>
      <div className='user-container' > 
        <img src={require('../assets/people/user-avatar.jpg')} alt="user avatar"/> 
       <h1>Jaxons Danniels</h1> 
       <div className="user-email">jaxons.daniels@company.com</div> 
       <Link to="/"  style={{ textDecoration: 'none' }}>
       <Button className="user-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" 
       >Sign Out</Button> 
       </Link>
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
