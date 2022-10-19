const fetchPost = async (url, data, token) => {
  try {
    let headers;
    if (token) {
      headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      };
    } else {
      headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
    }
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    // console.warn(error);
    return "error";
  }
};

const fetchGet = async (url, token) => {
  try {
    let headers = {};
    if (token) {
      headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      };
    } else {
      headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
    }
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    // console.warn(error);
    return "error";
  }
};

const fetchPostFormData = async (url, data, token) => {
  try {
    let headers;
    if (token) {
      headers = {
        Authorization: "Bearer " + token,
      };
    } else {
      return "error";
    }

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: data,
    });

    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    // console.warn(error);
    return "error";
  }
};

const fetchPut = async (url, data, token) => {
  try {
    let headers;
    if (token) {
      headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      };
    } else {
      headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
    }
    const response = await fetch(url, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(data),
    });
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    // console.warn(error);
    return "error";
  }
};

const fetchDrop = async (url, token) => {
  try {
    let headers = {};
    if (token) {
      headers = {
        Authorization: "Bearer " + token,
      };
    } else {
      return "error";
    }
    const response = await fetch(url, {
      method: "DELETE",
      headers: headers,
    });
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    // console.warn(error);
    return "error";
  }
};

const FetchLib = {
  fetchPost,
  fetchGet,
  fetchPostFormData,
  fetchPut,
  fetchDrop,
};

export default FetchLib;
