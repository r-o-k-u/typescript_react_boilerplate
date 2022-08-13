import { Component } from "react";
import { PrimaryButton, Stack } from "@fluentui/react";
import { Icon } from "@fluentui/react/lib/Icon";
export default class Dashboard extends Component {
  state = { showMenu: false };
  render() {
    return (
      <>
        <Stack>
          <Stack.Item>
            <Icon iconName="back" />
            <PrimaryButton
              text="Alert"
              onClick={() => alert("I am an alert")}
            />
          </Stack.Item>
          <Stack.Item></Stack.Item>
        </Stack>
      </>
    );
  }
  componentDidMount() {
    /* if (localStorage.token) {
    } */
  }
}
