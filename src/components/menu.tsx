import { Component } from "react";
import {
  Grid,
  Menu as MenuBars,
  LogOut,
  Settings,
  ChevronDown,
  ChevronUp,
} from "react-feather";
import { Link } from "react-router-dom";
class Menu extends Component {
  state = {
    title: "Dashboard",
    showMenu: false,
    menu: [
      {
        name: "Dashboard",
        icon: <Grid size={20} />,
        link: "/dashboard",
        access: "DASHBOARD_MENU",
      },
      {
        name: "Dashboard",
        icon: <Grid size={20} />,
        link: "/pending",
        access: "PENDING_MENU",
      },
    ],
    currentRoute: window.location.pathname,
    active: 0,
  };
  render() {
    return (
      <>
        <div className="p-3 top-header d-md-none align-items-center d-flex flex-row bg-light w-100 text-dark shadow">
          <MenuBars
            className="mr-3"
            onClick={() => {
              this.setState({ showMenu: true });
            }}
          ></MenuBars>
          <div className="font-weight-bold top-bar-text">
            {this.state.title}
          </div>
        </div>
        <div
          className={"menu-overlay " + (this.state.showMenu ? "show" : "")}
          onClick={() => {
            this.setState({ showMenu: false });
          }}
        ></div>
        <div
          className={
            "sidebar-wrapper border-right shadow " +
            (this.state.showMenu ? "show" : "")
          }
          onClick={() => {
            this.setState({ showMenu: false });
          }}
        >
          <ul
            className="navbar-nav bg-light sidebar sidebar-dark accordion position-relative"
            id="accordionSidebar"
          >
            <div>
              <div className="d-flex flex-column user-login-card p-3 my-4 align-items-start">
                <div className="d-flex flex-row align-items-start justify-content-between w-100">
                  <div className="user-icon-parent">
                    <img
                      src={process.env.PUBLIC_URL + "/user.svg"}
                      className="user-icon"
                      alt=""
                    />
                  </div>
                  <div className="d-flex flex-row">
                    <div className="action-icon">
                      <Settings size={20}></Settings>
                    </div>

                    <div className="action-icon" onClick={() => {}}>
                      <LogOut size={20}></LogOut>
                    </div>
                  </div>
                </div>
                <div>
                  <small className="font-weight-bold">| user role</small>
                </div>
              </div>
            </div>
            <hr />
            <div className="sidebar-heading text-dark  text-muted">pages :</div>
            <hr />
            {this.state.menu.map((d: any, i) => {
              return (
                <li
                  className={
                    "nav-item " +
                    (this.state.active === i && d.children
                      ? "pb-4 no-hover "
                      : "") +
                    (this.state.currentRoute === d.link
                      ? "active"
                      : "text-dark")
                  }
                  key={i}
                >
                  {/*  <Access permission={d.access}> */}{" "}
                  <Link
                    to={d.link}
                    onClick={(e) => {
                      if (this.state.active === i) {
                        this.setState({ active: 0 });
                      } else {
                        this.setState({ active: i });
                      }
                      if (d.children) e.preventDefault();
                    }}
                    className={
                      "nav-link " +
                      (this.state.currentRoute === d.link
                        ? "active"
                        : "text-dark")
                    }
                  >
                    <div className="d-flex flex-row align-items-center justify-content-between">
                      <div className="d-flex flex-row align-items-center">
                        {d.icon}
                        <div className="text-dark ml-2 font-weight-bold link-text">
                          {d.name}
                        </div>
                      </div>
                      {d.children && (
                        <div>
                          {this.state.active !== i && (
                            <ChevronDown size={18}></ChevronDown>
                          )}
                          {this.state.active === i && (
                            <ChevronUp size={18}></ChevronUp>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                  {/* </Access> */}
                  {this.state.active === i && d.children && (
                    <div
                      id="collapseUtilities"
                      className="collapse show shadow-sm"
                      aria-labelledby="headingUtilities"
                      data-parent="#accordionSidebar"
                    >
                      <div className=" py-2 collapse-inner rounded mb-0">
                        {/* <h6 className='collapse-header'>listing:</h6> */}
                        {d.children.map((d1: any, i1: any) => {
                          if (d1.type === "hr")
                            return (
                              <>
                                <hr className={`${!d1.title || "mb-1"}`} />
                                {d1.title && (
                                  <div>
                                    <small className="text-muted text-uppercase font-weight-bold px-4">
                                      {d1.title}
                                    </small>
                                  </div>
                                )}
                              </>
                            );

                          return (
                            <>
                              {/* <Access permission={d1.access} key={i1}> */}
                              <Link
                                className={
                                  "collapse-item font-weight-bold my-1 text-capitalize " +
                                  (this.state.currentRoute === d1.link
                                    ? "active"
                                    : "text-dark")
                                }
                                to={d1.link}
                                key={i1}
                              >
                                {d1.name}
                              </Link>
                              {/* </Access> */}
                            </>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </>
    );
  }
}

export default Menu;
