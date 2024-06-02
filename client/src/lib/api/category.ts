"use server";

import axios from "axios";

export async function getCategories() {
  try {
    const categories = await axios.get(`${process.env.API_URL}/categories`);

    return categories.data;
  } catch (error) {
    console.error(error);
  }
}
