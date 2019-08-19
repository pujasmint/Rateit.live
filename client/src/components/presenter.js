import React from "react";
import { Card } from "primereact/card";
import StarRatings from "react-star-ratings";

export default function presenter(props) {
  var imgSrc = `data:image/jpeg;base64,${new Buffer(
    props.user.image.data
  ).toString("base64")}`;
  const headerP = <img alt="Card" className="p-4" src={imgSrc} />;
  return (
    <Card
      header={headerP}
      className="presenter-card p-grid p-dir-column p-justify-around p-align-center"
    >
      <h5 className="text-center">{props.user.fullname}</h5>
      <h6 className="text-center">
        <a
          className="text-center"
          href={`/profile/${props.user._id}`}
          target="_top"
        >
          View Profile
        </a>
      </h6>
      <StarRatings
        rating={props.user.rating}
        starRatedColor="#fab120"
        starDimension="20px"
        starSpacing="5px"
        numberOfStars={5}
        name="rating"
      />
      <h6 className="display-6 text-center">({props.user.totalSessions})</h6>
    </Card>
  );
}
