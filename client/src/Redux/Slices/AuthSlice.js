import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from '../../Helper/axiosInstance';

// Initial state setup
const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') !== "undefined" ? JSON.parse(localStorage.getItem('data')) : {},
    globalSettingsData: localStorage.getItem('globalSettingsData') !== "undefined" ? JSON.parse(localStorage.getItem('globalSettingsData')) : {},
    aboutSettingsData: localStorage.getItem('aboutSettingsData') !== "undefined" ? JSON.parse(localStorage.getItem('aboutSettingsData')) : {},
    contactSettingsData: localStorage.getItem('contactSettingsData') !== "undefined" ? JSON.parse(localStorage.getItem('contactSettingsData')) : {},
    testimonialData: localStorage.getItem('testimonialData') !== "undefined" ? JSON.parse(localStorage.getItem('testimonialData')) : {},

};

// Thunks for different actions
export const createAccount = createAsyncThunk('/user/register', async (data) => {
    try {
        let res = axiosInstance.post('user/register', data);
        toast.promise(res, {
            loading: 'Creating Account',
            success: (data) => data?.data.message,
            error: "Failed to create account"
        });
        res = await res;
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        throw e;
    }
});

export const loginAccount = createAsyncThunk('/user/login', async (data) => {
    try {
        let res = axiosInstance.post('/user/login', data);
        toast.promise(res, {
            loading: 'Wait! Logging in',
            success: (data) => data?.data.message,
            error: "Failed to login"
        });
        res = await res;
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        throw e;
    }
});

export const logout = createAsyncThunk('/user/logout', async () => {
    try {
        let res = axiosInstance.get('/user/logout');
        toast.promise(res, {
            loading: 'Wait! Logging out',
            success: (data) => data?.data.message,
            error: "Failed to logout"
        });
        res = await res;
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        throw e;
    }
});

export const userProfile = createAsyncThunk('/user/details', async () => {
    try {
        const res = axiosInstance.get("/user/me");
        return (await res).data;
    } catch (e) {
        toast.error(e?.message);
        throw e;
    }
});

export const editProfile = createAsyncThunk('user/update-profile', async (data) => {
    try {
        let res = axiosInstance.put(`user/update-profile/${data[0]}`, data[1]);
        toast.promise(res, {
            loading: "Updating Profile!",
            success: (data) => data?.data.message,
            error: "Failed to update!"
        });
        res = await res;
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        throw e;
    }
});

export const changePassword = createAsyncThunk('user/update-password', async (data) => {
    try {
        let res = axiosInstance.post('user/change-password', data);
        res = await res;
        toast.success(res?.data.message);
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        throw e;
    }
});

export const forgotPassword = createAsyncThunk('user/forgot-password', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.post('user/forgot-password', data);
        toast.promise(res, {
            loading: "Sending password reset link to registered mail!",
            success: (data) => data?.data.message,
            error: "Failed to send reset link"
        });
        res = await res;
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        throw e;
    }
});

export const resetPasswords = createAsyncThunk('user/reset-password', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.post(`user/reset-password/${data[0]}`, data[1]);
        toast.promise(res, {
            loading: "Resetting Password!",
            success: (data) => data?.data.message,
            error: "Failed to reset password"
        });
        res = await res;
        return res.data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
        throw e;
    }
});

export const getGlobalSettingsData = createAsyncThunk('admin/global-settings', async () => {
    try {
        let res = axiosInstance.get(`/admin/global-settings`)
        toast.promise(res, {
            // pending: "Getting data!",
            success: (data) => {
                return data?.data.message
            },
            error: "Failed to reset password"
        })
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const getAboutSettingsData = createAsyncThunk('admin/about-settings', async () => {
    try {
        let res = axiosInstance.get(`/admin/about`)
        toast.promise(res, {
            // pending: "Getting data!",
            success: (data) => {
                return data?.data.message
            },
            error: "Failed to reset password"
        })
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const getContactSettingsData = createAsyncThunk('admin/contact-settings', async () => {
    try {
        let res = axiosInstance.get(`/admin/contact`)
        toast.promise(res, {
            // pending: "Getting data!",
            success: (data) => {
                return data?.data.message
            },
            error: "Failed to submit!"
        })
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const getTestimonialData = createAsyncThunk('admin/testimonial-settings', async () => {
    try {
        let res = axiosInstance.get(`/admin/testimonial`)
        toast.promise(res, {
            // pending: "Getting data!",
            success: (data) => {
                return data?.data.message
            },
            // error: "Failed to s!"
        })
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginAccount.fulfilled, (state, action) => {
                localStorage.setItem('data', JSON.stringify(action.payload.user));
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('role', action.payload.user.role);
                state.isLoggedIn = true;
                state.data = action.payload.user;
                state.role = action.payload.user.role;
            })
            .addCase(createAccount.fulfilled, (state, action) => {
                localStorage.setItem('data', JSON.stringify(action.payload.user));
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('role', action.payload.user.role);
                state.isLoggedIn = true;
                state.data = action.payload.user;
                state.role = action.payload.user.role;
            })
            .addCase(logout.fulfilled, (state) => {
                localStorage.clear();
                state.data = {};
                state.isLoggedIn = false;
                state.role = "";
            })
            .addCase(userProfile.fulfilled, (state, action) => {
                localStorage.setItem('data', JSON.stringify(action.payload.user));
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('role', action.payload.user.role);
                state.isLoggedIn = true;
                state.data = action.payload.user;
                state.role = action.payload.user.role;
            }).addCase(getGlobalSettingsData.fulfilled, (state, action) => {
                localStorage.setItem('globalSettingsData', JSON.stringify(action?.payload?.globalSettingsData))
                state.globalSettingsData = action?.payload?.globalSettingsData
            }).addCase(getAboutSettingsData.fulfilled, (state, action) => {
                localStorage.setItem('aboutSettingsData', JSON.stringify(action?.payload?.aboutData))
                state.aboutSettingsData = action?.payload?.aboutData
            }).addCase(getContactSettingsData.fulfilled, (state, action) => {
                localStorage.setItem('contactSettingsData', JSON.stringify(action?.payload?.contactDetails))
                state.contactSettingsData = action?.payload?.contactDetails
            }).addCase(getTestimonialData.fulfilled, (state, action) => {
                localStorage.setItem('testimonialData', JSON.stringify(action?.payload?.testimonialData))
                state.testimonialData = action?.payload?.testimonialData
            })

    }
});

export default authSlice.reducer;
