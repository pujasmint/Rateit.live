import React, { Component } from "react";
import { getFingerprint } from "../fingerprinting/config";
import RatingService from "../api/ratingservice";
import Presenter from "../components/presenter";
import RatingIcon from "../components/rateicon";
import { ProgressSpinner } from "primereact/progressspinner";
import { Panel } from "primereact/panel";
import { Messages } from "primereact/messages";

export default class rating extends Component {
  constructor(props) {
    super(props);
    this.ratingService = new RatingService();
    this.state = {
      fp: null,
      rating: null,
      session: null,
      creator: null
    };
  }

  getEmojiOnRating(ratings) {
    switch (ratings) {
      case 1:
        return "🤒";
      case 2:
        return "😣";
      case 3:
        return "😕";
      case 4:
        return "😎";
      case 5:
        return "🤑";
      default:
        return "😎";
    }
  }

  getMessageOnRating = res => {
    this.messages.clear();
    if (!res.rating) {
      this.messages.show({
        severity: "info",
        summary: "You have no rating yet",
        sticky: true,
        closable: false
      });
    } else {
      this.messages.show({
        severity: "success",
        summary:
          "Your last rating is " + this.getEmojiOnRating(res.rating.rating),
        sticky: true,
        closable: false
      });
    }
  };

  componentDidMount() {
    const invitekey = this.props.match.params.invitekey;
    getFingerprint().then(fp => {
      this.setState({
        fp
      });
      this.ratingService
        .user({
          fp,
          invitekey
        })
        .then(res => {
          this.setState({
            rating: res.rating,
            session: res.session,
            creator: res.session.creator
          });
          this.getMessageOnRating(res);
        })
        .catch(err => {
          console.log("Error while getting user data ", err);
        });
    });
  }

  onClickRating = rate => {
    this.ratingService
      .update({
        rating: rate,
        time: new Date().getTime(),
        fp: this.state.fp,
        invitekey: this.props.match.params.invitekey
      })
      .then(res => {
        this.setState({
          rating: res.rating,
          session: res.session
        });
        this.getMessageOnRating(res);
      })
      .catch(err => {
        this.messages.show({
          severity: "warn",
          summary: err.response.data.message
        });
      });
  };

  render() {
    return (
      <div className="p-grid p-justify-center authpage pages">
        {this.state.creator ? (
          <>
            <div className="p-col-10 p-md-5">
              <Messages className="p-col-12" ref={el => (this.messages = el)} />
              <Panel header={`Rate ${this.state.session.name} here`}>
                <div className="p-grid p-justify-around">
                  <RatingIcon
                    rating={1}
                    onClickRating={this.onClickRating}
                    emoji="🤒"
                  />
                  <RatingIcon
                    rating={2}
                    onClickRating={this.onClickRating}
                    emoji="😣"
                  />
                  <RatingIcon
                    rating={3}
                    onClickRating={this.onClickRating}
                    emoji="😕"
                  />
                  <RatingIcon
                    rating={4}
                    onClickRating={this.onClickRating}
                    emoji="😎"
                  />
                  <RatingIcon
                    rating={5}
                    onClickRating={this.onClickRating}
                    emoji="🤑"
                  />
                </div>
              </Panel>
            </div>
            <div className="p-col-10 p-md-5">
              <Presenter user={this.state.creator} />
            </div>
          </>
        ) : (
          <ProgressSpinner />
        )}
      </div>
    );
  }
}
