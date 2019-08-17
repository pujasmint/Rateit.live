import axios from "axios";


export default class AuthService {
    constructor(){
        let service = axios.create({
            baseURL: "http://localhost:3000/session",
            withCredentials: true
        });
        this.service = service;
    }

    errorHandler = err => {
        throw err;
    }

    create(body) {
        return this.service
        .post("/create", body)
        .then(res => res.data)
        .catch(this.errorHandler);
    }

    update(body) {
        return this.service.post("/update", body)
        .then(res => res.data)
        .catch(this.errorHandler);
    }
}
