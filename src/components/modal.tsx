import { Component } from "react";
import { X } from "react-feather";
type AppProps = {
  visible: Boolean;
  width: any;
  dismiss: any;
  close: any;
  children: any;
};
class Modal extends Component<AppProps> {
  state = { visible: this.props.visible };
  render() {
    return (
      <div
        className={
          this.state.visible ? "modal fade d-block show" : "modal fade"
        }
        // tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered"
          style={{ maxWidth: this.props.width ? this.props.width : 500 }}
          role="document"
        >
          <div className="modal-content">
            {this.props.dismiss !== false && (
              <X
                className="icon position-absolute modal-close-icon m-2"
                onClick={() => {
                  this.setState({ visible: false });
                  if (this.props.close) {
                    this.props.close();
                  }
                }}
              />
            )}
            <div className="modal-body">{this.props.children}</div>
          </div>
        </div>
      </div>
    );
  }
  componentWillReceiveProps(props: AppProps) {
    if (typeof props.visible !== "undefined") {
      this.setState({ visible: props.visible });
    }
  }
}

export default Modal;
