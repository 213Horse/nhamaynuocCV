import { axiosClientVer2 } from "../config/axiosInterceptor";
import handleError from "../config/error";

export const CATEGORY_ACTIONS = {
  ADD: 1,
  MODIFY: 2,
  DELETE: 3,
};

export const CATEGORY_TYPE = {
  OBJECT: 1,
  INSTALLER: 2,
  CANCEL: 3,
  REASON: 4,
  COUNTRUY: 5,
  MANUFACTURER: 6,
  WATCH: 7,
  PAYMENTMETHOD: 8,
};
export const getCategory = async (type = CATEGORY_TYPE.OBJECT, queryString) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axiosClientVer2.get(
        `/danh-muc/get-all-by-type?type=${type}&${queryString}`
      );
      return resolve(res);
    } catch (error) {
      handleError(error);
      reject(error);
    }
  });
};

export const postCategory = async (
  action = CATEGORY_ACTIONS.OBJECT,
  type = CATEGORY_TYPE.ADD,
  payload
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axiosClientVer2.post(
        `/danh-muc/actions?${payload?.danhMuc?.nhaMayId}`,
        {
          action: action,
          id: payload?.id || null,
          danhMuc: {
            keyId: payload?.danhMuc?.keyId || null,
            type: type,
            value: payload?.danhMuc?.value || "",
            description: payload?.description || payload?.danhMuc?.value || "",
            kyHieu: payload?.danhMuc?.kyHieu,
          },
        }
      );
      return resolve(res);
    } catch (error) {
      handleError(error);
      reject(error);
    }
  });
};
