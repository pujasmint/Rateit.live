import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import { Messages } from "primereact/messages";
import SessionService from "../api/sessionService";
import { withRouter } from "react-router-dom";
import { Button } from "primereact/button";
import Presenter from "../components/presenter";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

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
      <div className="p-grid p-justify-center authpage pages presenter">
        <div className="p-col-10">
          {userId === loggedInUserId ? (
            <div className="p-col-12">
              <Messages ref={el => (this.messages = el)} life="5000" />
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
        <div className="p-col-10 p-md-5">
          {this.props.loggedInUser ? (
            <Presenter user={this.props.loggedInUser} />
          ) : (
            ""
          )}
        </div>
        <div className="p-col-10 p-md-5">
          <DataTable value={this.state.cards}>
            <Column field="name" header="Name" />
            <Column field="audience" header="Audience" />
            <Column field="rating" header="Rating" />
          </DataTable>
        </div>
      </div>
    );
  }
}

export default withRouter(profile);
