import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
  putRequest,
} from "../../../services";
import { toast } from "react-toastify";
import apolloClient from "../../../config/apolloClient";
import { GetTuyenDocs } from "../../../graphql/ManagementReading/ManagementReadingQuery";
import { GetUserQuery } from "../../../graphql/users/usersQuery";
const initialState = {
  danhSachTuyenDoc: [],
  isAddedSuccess: false,
  isDeletedSuccess: false,
  canBoDoc: [],
  tuyenDocId: {},
  tuyenDocByNhaMay: [],
  isLoadingNewEmployeeSelect: false,
  listTuyenDoc:[],
  canBoThuTien: [],
  canBoByPhongBan: [],
  nhanVienSuaBieuMau:[],
  nhanVienXemBieuMau:[],
  nhanVienByNhaMay:[],
};

export const tuyenDocSlice = createSlice({
  name: "tuyendoc",
  initialState,
  reducers: {
    btnClickResetCanBo: (state, action) => {
      state.canBoDoc = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDMTuyenDoc.fulfilled, (state, action) => {
        state.danhSachTuyenDoc = [];
        state.danhSachTuyenDoc = action.payload;
      })
      .addCase(getAllTuyenDoc.fulfilled, (state, action) => {
        // state.listTuyenDoc = [];
        state.listTuyenDoc = action.payload;
      })
      .addCase(addDMTuyenDoc.fulfilled, (state, action) => {
        state.isAddedSuccess = true;
      })
      .addCase(deleteDMTuyenDoc.fulfilled, (state, action) => {
        state.isDeletedSuccess = true;
      })
      .addCase(fetchTuyenDocByID.fulfilled, (state, action) => {
        state.tuyenDocId = action.payload;
      })
      .addCase(fetchTuyenDocByNhaMay.fulfilled, (state, action) => {
        state.tuyenDocByNhaMay = action.payload;
      })
      .addCase(fetchCanBoDoc.pending, (state, action) => {
        state.isLoadingNewEmployeeSelect = true;
      })

      .addCase(fetchCanBoDoc.fulfilled, (state, action) => {
        state.canBoDoc = action.payload;
        state.isLoadingNewEmployeeSelect = false;
      })
      .addCase(fetchCanBoThu.pending, (state, action) => {
        state.isLoadingNewEmployeeSelect = true;
      })

      .addCase(fetchCanBoThu.fulfilled, (state, action) => {
        state.canBoDoc = action.payload;
        state.isLoadingNewEmployeeSelect = false;
      })
      .addCase(getUserThuTien.fulfilled, (state, action) => {
        state.canBoThuTien = action.payload;
      })
      .addCase(getUserByBieuMau.fulfilled, (state, action) => {
        state.nhanVienXemBieuMau = action.payload;
      })
      .addCase(getUserBySuaBieuMau.fulfilled, (state, action) => {
        state.nhanVienSuaBieuMau = action.payload;
      })
      .addCase(getUserByNhaMay.fulfilled, (state, action) => {
        state.nhanVienByNhaMay = action.payload;
      })
      // .addCase(listTuyenDoc.fulfilled, (state, action) => {
      //   state.listTuyenDoc = [];
      //   state.listTuyenDoc = action.payload;
      // })
    // .addMatcher(
    //   (action) => action.type.endsWith('/pending'),
    //   (state) => {
    //     state.inProgress = true;
    //   }
    // )
  },
});
export const addDMTuyenDoc = createAsyncThunk(
  "tuyendoc/AddDMTuyenDoc",
  async (values) => {
    try {
      const {
        keyId,
        nhaMayId,
        nguoiQuanLyId,
        tenTuyen,
        nguoiThuTienId,
        sdtNguoiThu,
        diaChiThu,
        thoiGianThu,
        sdtHoaDon,
        sdtSuaChua,
        kyGhiChiSoId,
        nhanVienXem,
        nhanVienSua,
        nhanVienDocChiSoId,
        ngayGhiCSTu,
        ngayGhiCSDen,
        khuVucId,
      } = values;

      const res = await postRequest(`tuyen-doc/add`, {
        keyId,
        nhaMayId,
        nguoiQuanLyId,
        tenTuyen,
        nguoiThuTienId,
        sdtNguoiThu,
        diaChiThu,
        thoiGianThu,
        sdtHoaDon,
        sdtSuaChua,
        kyGhiChiSoId,
        nhanVienXem,
        nhanVienSua,
        nhanVienDocChiSoId,
        ngayGhiCSTu,
        ngayGhiCSDen,
        khuVucId,
      });

      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        toast.success("Thêm thành công.");
      } else {
        throw new Error("lỗi");
      }

      return res.data.data;
    } catch (error) {
      toast.error("Thêm thất bại");
      console.log({ error });
    }
  }
);

export const deleteDMTuyenDoc = createAsyncThunk(
  "tuyendoc/deleteDMTuyenDoc",
  async (KeyId) => {
    try {
      const res = await deleteRequest(`tuyen-doc/delete/${KeyId}`);

      toast.success("Xóa thành công");
    } catch (error) {
      console.log({ error });
    }
  }
);
export const getAllTuyenDoc = createAsyncThunk(
  "tuyendoc/getAllTuyenDoc",
  async (arrNhaMay) => {
    try {
      if (arrNhaMay) {
        const query = `${arrNhaMay}`;
        const res = await getRequest(`tuyen-doc/get-all-by-nha-may?` + query);
        console.log("check", res.data.data);
        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);
export const getAllDMTuyenDoc = createAsyncThunk(
  "tuyendoc/getAllDMTuyenDoc",
  async (nhaMayArr) => {
    try {
      if (nhaMayArr) {
        const { data: listTuyenDocs, error } = await apolloClient.query({
          query: GetTuyenDocs,
          variables: {
            first: 100,
            nhaMayId: nhaMayArr,
          },
        });

        const { data: listUsers } = await apolloClient.query({
          query: GetUserQuery,
          variables: {
            first: 100,
          },
        });

        const tuyenDocData = formatTuyenDocData(
          listTuyenDocs?.GetTuyenDocs?.nodes,
          listUsers?.GetUsers?.nodes
        );

        return tuyenDocData;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

const formatTuyenDocData = (ListTuyenDocs = [], listUsers = []) => {
  const newListUser = listUsers.filter(
    (user) => user?.phongBan?.name === "Cán bộ đọc"
  );
  return newListUser?.map((userItem) => ({
    ...userItem,
    data:
      ListTuyenDocs.filter(
        (tuyenDocItem) => tuyenDocItem?.nguoiQuanLyId === userItem?.id
      ) || [],
  }));
};

export const updateTuyenDoc = createAsyncThunk(
  "tuyendoc/updateTuyenDoc",
  async (values) => {
    try {
      const {
        prevKeyId,
        keyId,
        nhaMayId,
        nguoiQuanLyId,
        tenTuyen,
        nguoiThuTienId,
        sdtNguoiThu,
        diaChiThu,
        thoiGianThu,
        sdtHoaDon,
        sdtSuaChua,
        kyGhiChiSoId,
        nhanVienXem,
        nhanVienSua,
        nhanVienDocChiSoId,
        ngayGhiCSTu,
        ngayGhiCSDen,
        khuVucId,
      } = values;

      const res = await putRequest(`tuyen-doc/update`, {
        keyId: prevKeyId,
        data: {
          keyId,
          nhaMayId,
          nguoiQuanLyId,
          tenTuyen,
          nguoiThuTienId,
          sdtNguoiThu,
          diaChiThu,
          thoiGianThu,
          sdtHoaDon,
          sdtSuaChua,
          kyGhiChiSoId,
          nhanVienXem,
          nhanVienSua,
          nhanVienDocChiSoId,
          ngayGhiCSTu,
          ngayGhiCSDen,
          khuVucId,
        },
      });
      const data = await res.data;
      if (data.statusCode > 250) {
        toast.error("Cập nhật thất bại");
      } else {
        toast.success("Cập nhật thành công");
      }
    } catch {}
  }
);

export const fetchTuyenDocByID = createAsyncThunk(
  "tuyendoc/getTuyenDocByID",
  async (id) => {
    try {
      const res = await getRequest(`tuyen-doc/get-by-id?tuyenDocId=${id}`);
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);
export const fetchTuyenDocByNhaMay = createAsyncThunk(
  "tuyendoc/fetchTuyenDocByNhaMay",
  async (nhaMayId) => {
    try {
      const res = await getRequest(
        `tuyen-doc/get-by-nha-may?nhaMayId=${nhaMayId}`
      );
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const fetchCanBoDoc = createAsyncThunk(
  "tuyendoc/getCanBoDoc",
  async (nhaMayIds) => {
    try {
      if (nhaMayIds) {
        const res = await getRequest(`auth/user/get-can-bo-doc?${nhaMayIds}`);
        console.log(res.data.data);
        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

export const fetchCanBoThu = createAsyncThunk(
  "tuyendoc/getCanBoThu",
  async (nhaMayIds) => {
    try {
      if (nhaMayIds) {
        const res = await getRequest(
          `auth/user/get-nguoi-thu-tien?${nhaMayIds}`
        );
        console.log(res.data.data);
        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

export const tranferCanBoDoc = createAsyncThunk(
  "tuyendoc/updateCanBoDoc",
  async (formData) => {
    try {
      if (formData) {
        const res = await patchRequest(
          `tuyen-doc/update-nguoi-quan-ly-cho-danh-muc-tuyen-doc`,
          formData
        );
        console.log(res.data.data);
        toast.success("Chuyển cán bộ quản lý thành công!");
        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
      toast.error("Chuyển cán bộ quản lý không thành công!");
    }
  }
);

export const tranferCanBoThu = createAsyncThunk(
  "tuyendoc/updateCanBoThu",
  async (formData) => {
    try {
      if (formData) {
        const res = await patchRequest(
          `tuyen-doc/update-nguoi-thu-tien-cho-danh-muc-tuyen-doc`,
          formData
        );
        toast.success("Chuyển cán bộ thu thành công!");
        return res.data.data;
      }
    } catch (error) {
      console.log({ error });
      toast.error("Chuyển cán bộ thu không thành công!");
    }
  }
);
export const getUserByBieuMau = createAsyncThunk(
  "tuyendoc/getUserByPhongBan",
  async (values) => {
    try {
      const { nhaMayId} = values
      const res = await getRequest(
        `auth/user/get-users-by-nha-may-and-phong-ban?${nhaMayId}`
      );
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const getUserBySuaBieuMau = createAsyncThunk(
  "tuyendoc/getUserBySuaBieuMau",
  async (values) => {
    try {
      const {nhaMayId} = values
      const res = await getRequest(
        `auth/user/get-users-by-nha-may-and-phong-ban?${nhaMayId}`
      );
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const getUserByNhaMay = createAsyncThunk(
  "tuyendoc/getUserByNhaMay",
  async (nhaMayId) => {
    try {
      
      const res = await getRequest(
        `auth/get-users-info?${nhaMayId}`
      );
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export const getUserThuTien = createAsyncThunk(
  "tuyendoc/getUserThuTien",
  async (filterData) => {
    try {
      const res = await getRequest(
        `auth/user/get-nguoi-thu-tien?${filterData}`
      );
      return res.data.data;
    } catch (error) {
      console.log({ error });
    }
  }
);

export default tuyenDocSlice;
