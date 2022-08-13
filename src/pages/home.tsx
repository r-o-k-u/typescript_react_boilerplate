import { Component } from "react";
import { Route } from "react-router-dom";
import { ThemeProvider, Toggle } from "@fluentui/react";
import { darkTheme, lightTheme } from "../utils/theme";
import Dashboard from "../pages/dashBoard";
export default class Home extends Component {
  state = { showMenu: false, useDarkMode: false };
  render() {
    return (
      <>
        <ThemeProvider
          applyTo="body"
          theme={this.state.useDarkMode ? darkTheme : lightTheme}
        >
          <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                <Toggle
                  label="Change themes"
                  onText="Dark Mode"
                  offText="Light Mode"
                  onChange={() =>
                    this.setState({ useDarkMode: !this.state.useDarkMode })
                  }
                />
              </div>
            </div>
          </div>

          <div>
            <Route path="/dashboard" exact component={Dashboard} />
          </div>
        </ThemeProvider>
      </>
    );
  }
  componentDidMount() {}
}
