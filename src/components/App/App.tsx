import { Component } from "react";
import {
  Route,
  Switch,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";

import Login from "../../pages/login";
import Home from "../../pages/home";
class App extends Component<RouteComponentProps> {
  state = {
    loaded: false,
    status: 0,
    error: false,
    blur: true,
    authenticated: false,
  };
  getStatus = () => {
    if (!this.state.error)
      return (
        <div className="">
          <div className="">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      );

    if (this.state.status !== 0 && this.state.status !== 0) {
      if (this.state.status === 403) {
        return (
          <div className="">
            <img src={process.env.PUBLIC_URL + "/403.png"} alt="" />
          </div>
        );
      } else {
        return (
          <div className="">
            <img src={process.env.PUBLIC_URL + "/500.png"} alt="" />
          </div>
        );
      }
    }
  };
  render() {
    return (
      <>
        <div>
          <Switch>
            <Route path="/login" component={Login} />
            {this.state.authenticated && <Route path="/" component={Home} />}
            {this.getStatus()}
          </Switch>
        </div>
      </>
    );
  }
  checkStatus = () => {
    this.setState({ loaded: true, authenticated: true });
  };
  componentDidMount = () => {
    this.checkStatus();
  };
}

export default withRouter(App);
