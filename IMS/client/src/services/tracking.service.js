import http from "../http-common"; // Ensure you have this set up to point to your API

class TrackingService {
  update(requestId, status) {
    return http.post("/tracking", { requestId, status });
  }

  get(requestId) {
    return http.get(`/tracking/${requestId}`);
  }
}

export default new TrackingService();
