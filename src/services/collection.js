import { getRequest } from "../lib/axios";
import { BaseUrl } from "../utils/env.constants";

export const getSelectedCollections = () => {
  return getRequest(`${BaseUrl}/api/collections/selected`);
};
