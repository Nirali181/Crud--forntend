import { DeleteUserAPI, EditSingleUserAPI, EditStatusAPI, GetAllUsersAPI, exportToCSVAPI, getSingleUserAPI, registerAPI } from "../../API/APICall";
import { toast } from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const AddUserAction = createAsyncThunk("adduser", async (data) => {
  const config = { "Content-Type": "multipart/form-data" };
  try {
    const response = await registerAPI(data, config);
    console.log("API Response:", response); // Log the response for inspection
    if (response?.status === 201) {
      toast.success("User registered successfully!");
      return response.data; // Make sure to return response.data
    }
  } catch (error) {
    toast.error("Error:", error);
    throw error; // Re-throw the error to be caught by .rejected
  }
});

// Get All Users
export const GetAllUsersAction = createAsyncThunk("getallusers", async ({search,selectedOption,sortValue}) => {
  const config = { "Content-Type": "application/json" };
  console.log("search",search)
  try {
    const response = await GetAllUsersAPI(config,search,selectedOption,sortValue);
    if (response?.status === 200) {
      return response.data;
    }
  } catch (error) {
    toast.error("Error:", error);
    throw error; // Re-throw the error to be caught by .rejected
  }
});

// get single user
export const GetSingleUserAction = createAsyncThunk("getsingleuser", async (id) => {
  const config = { "Content-Type": "application/json" };
  try {
    const response = await getSingleUserAPI(id,config);
    if (response?.status === 200) {
      return response.data;
    }
  } catch (error) {
    toast.error("Error:", error);
    throw error; // Re-throw the error to be caught by .rejected
  }
});

// edit single user
export const EditSingleUserAction = createAsyncThunk("editsingleuser", async ({id,data}) => {
  const config = { "Content-Type": "multipart/form-data" };

  try {
    const response = await EditSingleUserAPI(id,data,config);
    if (response?.status === 200) {
      toast.success("User updated successfully!");
      return response.data;
    }
  } catch (error) {
    toast.error("Error:", error);
    throw error; // Re-throw the error to be caught by .rejected
  }
});

// delete user
export const DeleteUserAction = createAsyncThunk("deleteuser", async (id) => {
  const config = { "Content-Type": "application/json" };
  try {
    const response = await DeleteUserAPI(id,config);
    if (response?.status === 200) {
      toast.success("User deleted successfully!");
      return response.data;
    }
  } catch (error) {
    toast.error("Error:", error);
  }
});

// change status
export const ChangeStatusAction = createAsyncThunk("changestatus", async ({id,data}) => {
  const config = { "Content-Type": "application/json" };
  console.log("editid",id)
  console.log("dddddddddd",data)
  try {
    const response = await EditStatusAPI(id,data,config);
    if (response?.status === 200) {
      toast.success("User status updated successfully!");
      return response.data;
    }
  } catch (error) {
    toast.error("Error:", error);
  }
});

// export to csv
export const ExportToCSVAction = createAsyncThunk("exporttocsv", async () => {
  const config = { "Content-Type": "application/json" };
  try {
    const response = await exportToCSVAPI(config);
    if (response?.status === 200) {
      return response.data;
    }
  } catch (error) {
    toast.error("Error:", error);
    throw error; // Re-throw the error to be caught by .rejected
  }
});
export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    loading: false,
    addUserData: [],
    getAllUsersData: [],
    getSingleUser:[],
    editSingleUser:[],
    changeStatus:[],
    searchData:[],
    exportToData:[],
    stateUpdate:false
  },
  reducers:{
    searchValue:(state,action)=>{
      state.searchData = action.payload
    }
  },
  extraReducers: {
    [AddUserAction.pending]: (state) => {
      state.loading = true;
    },
    [AddUserAction.fulfilled]: (state, action) => {
      state.loading = false;
      state.addUserData = action.payload;
    },
    [AddUserAction.rejected]: (state) => {
      state.loading = false;
    },
    
    [GetAllUsersAction.pending]: (state) => {
      state.loading = true;
    },
    [GetAllUsersAction.fulfilled]: (state, action) => {
      state.loading = false;
      state.getAllUsersData = action.payload;
    },
    [GetAllUsersAction.rejected]: (state) => {
      state.loading = false;
    },

    // get single user
    [GetSingleUserAction.pending]: (state) => {
      state.loading = true;
    },
    [GetSingleUserAction.fulfilled]: (state, action) => {
      state.loading = false;
      state.getSingleUser = action.payload;
    },
    [GetSingleUserAction.rejected]: (state) => {
      state.loading = false;
    },

    // edit single user
    [EditSingleUserAction.pending]: (state) => {
      state.loading = true;
    },
    [EditSingleUserAction.fulfilled]: (state, action) => {
      state.loading = false;
      state.editSingleUser = action.payload;
    },
    [EditSingleUserAction.rejected]: (state) => {
      state.loading = false;
    },

    // delete user
    [DeleteUserAction.pending]: (state) => {
      state.loading = true;
    },
    [DeleteUserAction.fulfilled]: (state) => {
      state.loading = false;
    },
    [DeleteUserAction.rejected]: (state) => {
      state.loading = false;
    },

    // status change
    [ChangeStatusAction.pending]: (state) => {
      state.loading = true;
    },
    [ChangeStatusAction.fulfilled]: (state, action) => {
      state.loading = false;
      state.changeStatus = action.payload;
      state.stateUpdate = true
    },
    [ChangeStatusAction.rejected]: (state) => {
      state.loading = false;
    },

    // export to csv
    [ExportToCSVAction.pending]: (state) => {
      state.loading = true;
    },
    [ExportToCSVAction.fulfilled]: (state, action) => {
      state.loading = false;
      state.exportToData = action.payload;
    },
    [ExportToCSVAction.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const {searchValue} = userSlice.actions
export default userSlice.reducer;
