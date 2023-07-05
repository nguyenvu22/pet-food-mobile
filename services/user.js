import axios from "axios";

import { API_KEY } from "../constants/environment";

export async function login(email, password) {
  try {
    const response = await axios.post(API_KEY + "/auth/login", {
      email: email,
      password: password,
      role: "customer",
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function signup(user) {
  try {
    const response = await axios.post(API_KEY + "/auth/signup", {
      fullName: user.fullName,
      dob: user.dob,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
      phoneNumber: user.phoneNumber,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getUserProfile(accessToken) {
  try {
    const response = await axios.get(API_KEY + "/account/profile", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
}
