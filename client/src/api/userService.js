// api/service.js

import axios from "axios";

export default class RatingService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:3000/user",
      withCredentials: true
    });
    this.service = service;
  }

  errorHandler = err => {
    // console.error(err);
    throw err;
  };

  details(body) {
    return this.service
      .post("/details", body)
      .then(res => res.data)
      .catch(this.errorHandler);
  }
}
