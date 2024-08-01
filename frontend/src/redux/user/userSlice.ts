import { createSlice } from "@reduxjs/toolkit";

type UserType = {
    success: boolean,
    _id: string,
    uname: string,
    email: string,
    verified: boolean,
    quotechips: number,
    avatar: string,
    createdAt: string,
    updatedAt: string
}

export const userInitialState : { currentUser: UserType | null } = {
    currentUser: null
}

const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        login: (state, action) => {
            state.currentUser = action.payload
        },

        logout: (state) => {
            state.currentUser = null
        },

        verifyUser: (state, action) => {
            state.currentUser!.verified = action.payload
        }
    }
})

export default userSlice.reducer
export const { login, logout, verifyUser } = userSlice.actions