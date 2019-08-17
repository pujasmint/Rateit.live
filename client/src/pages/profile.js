import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import { Messages } from "primereact/messages";
import SessionService from "../api/sessionService";
import { withRouter } from "react-router-dom";
import { Button } from "primereact/button";

class profile extends Component {
  constructor(props) {
    super(props);
    this.sessionService = new SessionService();
    this.state = {
      name: null
    };
  }
  updateSessionName = e => {
    this.setState({ name: e.target.value });
  };

  createSession = () => {
    if (!this.state.name) {
      this.messages.show({
        severity: "error",
        summary: "Enter valid session name"
      });
    } else {
      this.sessionService
        .create(this.state)
        .then(res => {
          debugger;
          this.props.history.push(`/session/${res._id}`);
        })
        .catch(err => {
          console.log("Error while creating session ", err);
        });
    }
  };
  render() {
    const userId = this.props.match.params.userId;
    const loggedInUserId = this.props.loggedInUser
      ? this.props.loggedInUser._id
      : null;
    return (
      <div className="p-grid p-justify-center p-align-center authpage">
        {userId === loggedInUserId ? (
          <div className="p-col-10 p-md-6">
            <Messages
              className="p-col-10 p-md-6"
              ref={el => (this.messages = el)}
              life="5000"
            />
            <div className="p-inputgroup">
              <Button label="Create" onClick={this.createSession} />
              <InputText
                placeholder="Enter session name"
                onChange={this.updateSessionName}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default withRouter(profile);
