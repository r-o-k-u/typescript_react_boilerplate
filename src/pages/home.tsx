import { Component } from "react";
import { Route } from "react-router-dom";
import Menu from "../components/menu";
import Dashboard from "../pages/dashBoard";
import PendingRequests from "../pages/PendingRequests";
export default class Home extends Component {
  state = { showMenu: false };
  render() {
    return (
      <>
        <div id="wrapper" className="pt-5 mt-md-0 pt-md-0 mt-2">
          <Menu></Menu>
          <div id="content-wrapper" className="d-flex flex-column bg-light">
            <div className="preloader-container w-100">
              <Route path="/dashboard" exact component={Dashboard} />
              <Route path="/pending" exact component={PendingRequests} />
            </div>
            <div className="d-flex flex-fill flex-column"></div>
            <img
              src={process.env.PUBLIC_URL + "/logo.png"}
              className="stamp"
              alt=""
            />
          </div>
        </div>
      </>
    );
  }
  componentDidMount() {}
}
