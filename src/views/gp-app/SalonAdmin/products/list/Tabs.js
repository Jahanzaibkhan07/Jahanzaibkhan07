import { Nav, NavItem, NavLink } from "reactstrap";
import {
  User,
  Lock,
  Info,
  Link,
  Bell,
  BarChart2,
  Briefcase,
  Bold,
  Bookmark,
  Users,
} from "react-feather";

const Tabs = ({ activeTab, toggleTab }) => {
  return (
    <Nav className="nav-left" pills vertical>
      <NavItem>
        <NavLink active={activeTab === "1"} onClick={() => toggleTab("1")}>
          <Briefcase size={18} className="mr-1" />
          <span className="font-weight-bold">Products</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === "2"} onClick={() => toggleTab("2")}>
          <Bold size={18} className="mr-1" />
          <span className="font-weight-bold">Brands</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === "3"} onClick={() => toggleTab("3")}>
          <Bookmark size={18} className="mr-1" />
          <span className="font-weight-bold">Category</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === "4"} onClick={() => toggleTab("4")}>
          <Users size={18} className="mr-1" />
          <span className="font-weight-bold">Supplier</span>
        </NavLink>
      </NavItem>
      {/* <NavItem>
        <NavLink active={activeTab === "5"} onClick={() => toggleTab("5")}>
          <Bell size={18} className="mr-1" />
          <span className="font-weight-bold">Notifications</span>
        </NavLink>
      </NavItem> */}
    </Nav>
  );
};

export default Tabs;
