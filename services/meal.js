import axios from "axios";

import { API_KEY } from "../constants/environment";

export async function getAllMeal(accessToken) {
  try {
    const response = await axios.get(API_KEY + "/meal", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
}

