import { Component } from "react";
import { Lock, Mail, Eye, EyeOff } from "react-feather";
import { RouteComponentProps } from "react-router-dom";
import { Link } from "react-router-dom";
import LoadingButton from "../components/loadingButton";
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
    return (
      <div className="d-flex flex-fill flex-column main-cover justify-content-center wallpaper">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
              <div className="card o-hidden border-0 shadow-lg my-5 login-card">
                <div className="card-body p-0">
                  <div className="row">
                    <div className="col-lg-6  d-none default-bg align-items-center justify-content-center flex-row d-md-flex icon-holder">
                      <img
                        src={process.env.PUBLIC_URL + "/logo.png"}
                        className="main-logo"
                        alt=""
                      />
                    </div>
                    <div className="col-lg-6">
                      <div className="p-md-5 p-4">
                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-4 font-weight-bold">
                            <div>React Dashboard</div>
                          </h1>
                        </div>

                        <div className="text-center mb-4">
                          <small className="text-muted">login</small>
                        </div>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            this.login();
                          }}
                        >
                          <div className="form-group d-flex flex-row align-items-center">
                            <Mail
                              className="login-icon align-self-center position-absolute ml-2"
                              color="gray"
                              size={18}
                            />

                            <input
                              type="email"
                              className="form-control form-control-user  icon-input"
                              placeholder="Email Address"
                              value={this.state.email}
                              required={true}
                              onChange={(e) => {
                                this.setState({ email: e.target.value });
                              }}
                            />
                          </div>
                          <div className="form-group d-flex flex-row align-items-center position-relative">
                            <Lock
                              className="login-icon align-self-center position-absolute ml-2 "
                              color="gray"
                              size={18}
                            ></Lock>
                            <input
                              type={
                                this.state.showPassword ? "text" : "password"
                              }
                              required={true}
                              className="form-control form-control-user icon-input"
                              placeholder="Password"
                              //autocomplete="off"
                              onChange={(e) => {
                                this.setState({ password: e.target.value });
                              }}
                              value={this.state.password}
                            />

                            {!this.state.showPassword && (
                              <Eye
                                size={18}
                                className="login-icon align-self-center position-absolute eye-icon"
                                onClick={() =>
                                  this.setState({
                                    showPassword: !this.state.showPassword,
                                  })
                                }
                              ></Eye>
                            )}

                            {this.state.showPassword && (
                              <EyeOff
                                size={18}
                                className="login-icon align-self-center position-absolute eye-icon"
                                onClick={() =>
                                  this.setState({
                                    showPassword: !this.state.showPassword,
                                  })
                                }
                              ></EyeOff>
                            )}
                          </div>
                          <div className="form-group d-flex flex-row align-items-center justify-content-between position-relative">
                            <Link
                              className=""
                              onClick={() =>
                                this.setState({ resetVisible: true })
                              }
                              to="/"
                            >
                              <small>Forgot password?</small>
                            </Link>
                          </div>
                          <div className="text-center">
                            <div className="d-inline-block">
                              <LoadingButton
                                text="Login"
                                className=""
                                children=""
                                onClick=""
                                status={this.state.loginStatus}
                              ></LoadingButton>
                            </div>
                          </div>
                        </form>
                        <hr />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    /* if (localStorage.token) {
    } */
  }
}
