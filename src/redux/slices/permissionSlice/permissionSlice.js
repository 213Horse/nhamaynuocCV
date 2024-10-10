import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apolloClient from "../../../config/apolloClient";
import { GetRoles, GetUserRoles, GetUsers } from "../../../graphql/permission/permissionQuery";
import { getRequest, postRequest, putRequest } from "../../../services";
import { toast } from "react-toastify";


const permissionSlice = createSlice({
   name: 'permissionSlice',
   initialState: {
      permissionData: [],
      staffData: [],
      listRoleId: []
   },
   reducers: {
      
   },
   extraReducers: builder => {
      builder.addCase(fetchPermision2.fulfilled, (state, action) => {
         state.permissionData = action.payload;
      })
      builder.addCase(fetchStaff.fulfilled, (state, action) => {
         state.staffData = action.payload;
      })
      builder.addCase(fetchUserRole2.fulfilled, (state, action) => {
         state.listRoleId = action.payload;
      })
   }
})

export const fetchRemoveRole = createAsyncThunk('permissionSlice/fetchRemoveRole',
   async ({roleName, userId, roleId, nhaMayIds}, thunkAPI) => {
      try {
         const values = {nhaMayIds, roleId}
         await postRequest('auth/user/remove-role', {
            userId: userId,
            roleName: [
              roleName
            ]
         }) 

         toast.success('Gỡ quyền thành công.')
         thunkAPI.dispatch(fetchUserRole2(values));
      } catch (error) {
         console.log({error});
         toast.error('Gỡ quyền thất bại.')
      }
   }
)


export const fetchAddRole = createAsyncThunk('permissionSlice/fetchAddRole',
   async ({roleName, userId, roleId, nhaMayIds}, thunkAPI) => {
      try {
         const values = {nhaMayIds, roleId}
         await postRequest('auth/user/add-role', {
            userId: userId,
            roleName: [
              roleName
            ]
         }) 
         toast.success('Gán quyền thành công.')
         thunkAPI.dispatch(fetchUserRole2(values));
      } catch (error) {
         console.log({error});
         toast.error('Gán quyền thất bại.')
      }
   }
)

export const fetchUserRole = createAsyncThunk('permissionSlice/fetchUserRole',
   async (roleId) => {
      try {
         const { data } = await apolloClient.query({
            query: GetUserRoles,
            variables: {
               first: 100,
               roleId: roleId
            } 
         })

         return data?.GetUserRoles?.nodes || []
      } catch (error) {
         console.log({error});
         return []
      }
   }
)

export const fetchStaff = createAsyncThunk('permissionSlice/fetchStaff', 
   async () => {
      try {
         const { data } = await apolloClient.query({
            query: GetUsers,
            variables: {
               first: 100,
            } 
         })

         return data?.GetUsers?.nodes || []
      } catch (error) {
         console.log({error});
         return []
      }
   }
)

export const fetchPermision = createAsyncThunk('permissionSlice/fetchPermision', 
   async () => {
      try {
         const {data} = await apolloClient.query({ query: GetRoles});

         return data?.GetRoles?.nodes || []
      } catch (error) {
         console.log({error});
         return []
      }
   }
)

export const fetchPermision2 = createAsyncThunk('permissionSlice/fetchPermision2', 
   async () => {
      try {
      const res =  await getRequest('auth/get-all-role') 
         
         return res.data.data
        
      } catch (error) {
         console.log({error});
         toast.error('Gán quyền thất bại.')
      }
   }
)
export const fetchUserRole2 = createAsyncThunk('permissionSlice/fetchUserRole2   ', 
   async (values) => {
      try {
         const {nhaMayIds, roleId} = values
      const res =  await getRequest(`auth/get-users-info-by-role-id?${nhaMayIds}&roleId=${roleId}`) 
         
         return res.data.data
        
      } catch (error) {
         console.log({error});
         toast.error('Gán quyền thất bại.')
      }
   }
)


export const fetchAddPermision = createAsyncThunk('permissionSlice/fetchAddPermision', 
   async (roleName) => {
      try {
         await postRequest('auth/role/create', {
            roleName: roleName
         })
         toast.success('Thêm mới thành công');
      } catch (error) {
         toast.error('Thêm mới thất bại');
         console.log({error});
      }
   }
)

export const fetchUpdatePermision = createAsyncThunk('permissionSlice/fetchUpdatePermision', 
   async ({roleId, roleName}) => {
      try {
         await putRequest('auth/role/update', {
            roleId,
            roleName
         })
         toast.success('Cập nhật thành công');
      } catch (error) {
         toast.error('Cập nhật thất bại');
         console.log({error});
      }
   }
)




export default permissionSlice;