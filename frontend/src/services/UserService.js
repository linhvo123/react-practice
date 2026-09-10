import axios from "axios";

const fetchAllUsers = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/users");

    return response;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export { fetchAllUsers };