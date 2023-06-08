import axios from "axios";

interface GetIpResponse {
  ip: string;
}

export const getIpData = async () => {
  const res = await axios.get<GetIpResponse>(
    "https://api.ipify.org/?format=json"
  );
  return res.data;
};
