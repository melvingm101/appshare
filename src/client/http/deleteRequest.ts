import axios, { AxiosError } from "axios";

const deleteRequest = async (url: string, token: string) => {
  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: token,
      },
    });

    return { data: response.data.data, error: null };
  } catch (err) {
    if (err instanceof AxiosError) {
      return { data: null, error: err.response?.data };
    }
  }
};

export default deleteRequest;
