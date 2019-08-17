import React, { Component } from "react";
import { getFingerprint } from "../fingerprinting/config";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import Invitedetails from "../components/invitedetails";

export default class session extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fingerprint: null,
      visible: false
    };
  }

  componentDidMount() {
    getFingerprint().then(f =>
      this.setState({
        fingerprint: f
      })
    );
  }

  onClickInviteDetails = () => {
    this.setState({ visible: true });
  };

  onHideInviteDetails = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <div>
        <div className="p-grid p-justify-center p-align-center authpage">
          <Dialog
            header="Joining Details"
            visible={this.state.visible}
            onHide={this.onHideInviteDetails}
            maximizable
          >
            <Invitedetails invitekey="AB4G7" />
          </Dialog>

          <Button
            label="Show"
            icon="pi pi-external-link"
            onClick={this.onClickInviteDetails}
          />
        </div>
      </div>
    );
  }
}
