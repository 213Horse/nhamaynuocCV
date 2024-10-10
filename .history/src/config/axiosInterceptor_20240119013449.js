import axios from "axios";

let authToken = sessionStorage.getItem("token");
let isRefreshing = false;
let refreshPromise = null;

export const axiosClientVer2 = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: authToken ? `Bearer ${authToken}` : undefined,
  },
});

async function refreshToken() {
  try {
    const response = await axiosClientVer2.post("auth/refresh-token", {
      authToken,
    });
    authToken = response.data.token;
    sessionStorage.setItem("token", authToken);
    isRefreshing = false;
    refreshPromise = null;
    return authToken;
  } catch (error) {
    console.error("Refresh token failed", error);
    // Xử lý lỗi làm sao bạn muốn ở đây
    throw error; // Trả về lỗi để cho biết refreshToken đã thất bại
  }
}

axiosClientVer2.interceptors.request.use(
  (config) => {
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClientVer2.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("🚀 ~ Response in Error (in axiosClientVer2):", error);
    const refreshToken_current = sessionStorage.getItem("refreshToken");
    const originalRequest = error.config;
    if (refreshToken_current) {
      if (error.response.status === 401 && !originalRequest._retry) {
        console.log("Start get RefreshToken!");
        if (!isRefreshing) {
          isRefreshing = true;
          originalRequest._retry = true;
          try {
            const newToken = await refreshToken();
            console.log("newToken", newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axiosClientVer2(originalRequest);
          } catch (refreshError) {
            // Xử lý lỗi khi refreshToken thất bại ở đây
            return Promise.reject(refreshError);
          }
        } else {
          // Nếu refreshToken đã được gọi và đang chờ kết quả, thì chờ nó hoàn thành và thử lại yêu cầu gốc sau khi có token mới
          if (!refreshPromise) {
            refreshPromise = refreshToken();
          }
          return refreshPromise.then((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axiosClientVer2(originalRequest);
          });
        }
      }
      return Promise.reject(error);
    } else {
      return error.response;
    }
  }
);

export const handleDangNhap = (newToken) => {
  authToken = newToken;
  axiosClientVer2.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
  sessionStorage.setItem('token', authToken);
}

export const handleDangXuat = () => {
  localStorage.clear();
  sessionStorage.clear();
  authToken = null;
  axiosClientVer2.defaults.headers.common["Authorization"] = undefined;
};
