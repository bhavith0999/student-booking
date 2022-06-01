import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:80'
})
const UserService = {

    login(data) {
        return api.post("/auth/login", data);
    },
    createBooking(data) {
        return api.post("/booking/create-booking", data);
    },
    getBookings() {
        return api.get("/booking/upcoming-bookings");
    },
    getCourses() {
        return api.get("/course");
    },
    getLocations() {
        return api.get("/location");
    },
    getTrainersByTopic(topic, wheelchairAccessible) {
        return api.get(`/trainer/getTrainerByTopic/${topic}/${wheelchairAccessible}`);
    },

}

export default UserService;