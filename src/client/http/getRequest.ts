import axios, { AxiosError, AxiosRequestConfig } from "axios";

const getRequest = async (url: string, options: AxiosRequestConfig) => {
  try {
    const response = await axios.get(url, options);

    return { data: response.data.data, error: null };
  } catch (err) {
    if (err instanceof AxiosError) {
      return { data: null, error: err.response?.data };
    }
  }
};

export default getRequest;
