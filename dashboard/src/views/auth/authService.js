import api from "../../utils/api";

// import TokenService from "./token.service";

class AuthService {
  async login(email, password) {
    const response = await api.post("/auth/login", {
      email,
      password,
    });
    console.log("auth/login: ", response.data);
    return response.data;
  }

  async register(username, email, password) {
    const response = await api.post("/user/register", {
      username,
      email,
      password,
    });
    return response.data;
  }
  async logout() {
    const response = await api.get("logout/");
    return response.data;
  }
  async getProfile(id) {
    console.log(id, ":id insied ethe service");
    const response = await api.get(`/user/profile/${id}`);
    return response.data;
  }
  async updateProfile(id, data) {
    const response = await api.patch(`/user/profile/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  //   getCurrentUser() {
  //     return TokenService.getUser();
  //   }
  // async getNewRefreshToken() {
  //   const newAccessToken = useRefreshToken();
  // }
  //   async checkPermmision(permmission, value) {
  //     const res = await api.get(`/auth/checkPermmission/${permmission}/${value}`);

  //     return res.data?.data;
  //   }
}

export default new AuthService();
