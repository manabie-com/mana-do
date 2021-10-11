import { Account, ListResponse } from "../models";
import axiosClient from "../utils/axios";
const accountAPI = {
  // Server respon client 1 array data, the objects in this data array include the Account properties
  getAll(): Promise<ListResponse<Account>> {
    const url = "/account";
    return axiosClient.get(url);
  },
  // server respon object user signup
  createAccount(data: Account): Promise<Account> {
    const url = "/account";
    return axiosClient.post(url, data);
  },
};
export default accountAPI;
