import { updateRequest } from "../../../lib/axios";
import { BaseUrl } from "../../../utils/env.constants";

export const createVote = (data) => {
  return updateRequest(`${BaseUrl}/api/songs/vote`, data);
};
