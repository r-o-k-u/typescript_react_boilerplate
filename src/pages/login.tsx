import { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
const server = "http://localhost:3000/api/";
export default class Login extends Component<RouteComponentProps> {
  state = {
    custom: true,
    loading: false,
    email: "",
    password: "",
    resetVisible: false,
    resetStatus: 0,
    loginStatus: 0,
    showPassword: false,
  };

  login = () => {
    this.setState({
      loginStatus: 1,
    });
    setTimeout(() => {
      this.setState({
        loginStatus: 2,
      });
      this.props.history.push("/dashboard");
    }, 3000);
    fetch(server + "/authentication", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: `{"strategy": "local",  "email": "${this.state.email}", "password": "${this.state.password}"}`,
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.code) {
          alert(response.message);
          this.setState({ loginStatus: 0 });
          return false;
        } else if (response.accessToken) {
          localStorage.token = response.accessToken;
          /* window.user = response;
          localStorage.user = JSON.stringify(window.user); */
          localStorage.otp_verified = 0;
          //if (localStorage.previousPath) location = localStorage.previousPath;
          //window.location = location;
          this.setState({ loginStatus: 2 });
        }
      })
      .catch(() => {
        this.setState({ loading: false });
        alert("Something went wrong. Please try again.");
        this.setState({ loginStatus: 0 });
      });
  };

  render() {
    return <></>;
  }

  componentDidMount() {}
}
