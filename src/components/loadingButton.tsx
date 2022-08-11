import React, { Component } from "react";
import { CheckCircle } from "react-feather";
type AppProps = {
  className: string;
  onClick: any;
  text: string;
  children: any;
  status: any;
};
class LoadingButton extends Component<AppProps> {
  state = { status: this.props.status };
  render() {
    return (
      <button
        disabled={this.state.status === 1 || this.state.status === 2}
        className={
          "btn btn-user btn-block default-bg d-flex flex-row align-items-center login-button font-weight-bold " +
          (this.state.status === 2 ? "btn-success " : "btn-primary ") +
          this.props.className
        }
        onClick={this.props.onClick}
      >
        {this.state.status === 1 && <div className="lds-dual-ring mr-3"></div>}
        {this.state.status === 0 &&
          (this.props.text ? (
            <span className="mx-4">{this.props.text}</span>
          ) : (
            this.props.children
          ))}
        {this.state.status === 1 && (
          <>
            <span>Loading ...</span> <div className="pl-3"></div>
          </>
        )}

        {this.state.status === 2 && (
          <>
            <CheckCircle></CheckCircle>
            <span className="mr-4 ml-3">Success</span>{" "}
            <div className="pl-3"></div>
          </>
        )}
      </button>
    );
  }
  componentWillReceiveProps(props: AppProps) {
    let { status } = props;
    if (typeof status !== "undefined") {
      this.setState({ status });
    }
  }
}

export default LoadingButton;
