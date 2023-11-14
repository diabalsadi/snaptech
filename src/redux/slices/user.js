// Redux
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// Service
import {
  loginWithGoogleService,
  logoutService,
  logInWithFacebookService,
  createUserService,
  logInWithEmailService
} from '@/services/AuthService'

export const loginWithGoogle = createAsyncThunk(
  'loginWithGoogle',
  async () => await loginWithGoogleService()
)

export const logInWithFacebook = createAsyncThunk(
  'logInWithFacebook',
  async () => await logInWithFacebookService()
)

export const logOut = createAsyncThunk(
  'logOut',
  async () => await logoutService()
)

export const createUser = createAsyncThunk(
  'createUser',
  async ({ email, password }) => await createUserService(email, password)
)

export const logInWithEmail = createAsyncThunk(
  'logInWithEmail',
  async ({ email, password }) => await logInWithEmailService(email, password)
)

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    loading: false,
    error: false
  },
  reducers: {
    checkUserInfo: state => {
      state.user = JSON.parse(localStorage.getItem('user'))
    },
    makeItAdmin: state => {
      state.user.admin = true
      localStorage.setItem('user', JSON.stringify(state.user))
    }
  },
  extraReducers: builder => {
    // loginWithGoogle
    builder.addCase(loginWithGoogle.pending, state => {
      state.loading = true
    })
    builder.addCase(loginWithGoogle.fulfilled, (state, action) => {
      state.user = action.payload.user
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      state.loading = false
    })
    builder.addCase(loginWithGoogle.rejected, (state, action) => {
      console.error('Error', action.payload)
      state.error = true
    })

    // logInWithFacebook
    builder.addCase(logInWithFacebook.pending, state => {
      state.loading = true
    })
    builder.addCase(logInWithFacebook.fulfilled, (state, action) => {
      state.user = action.payload.user
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      state.loading = false
    })
    builder.addCase(logInWithFacebook.rejected, (state, action) => {
      console.error('Error', action.payload)
      state.error = true
    })

    // createUser
    builder.addCase(createUser.pending, state => {
      state.loading = true
    })
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.user = action.payload.user
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      state.loading = false
    })
    builder.addCase(createUser.rejected, (state, action) => {
      console.error('Error', action.payload)
      state.error = true
    })

    // logInWithEmail
    builder.addCase(logInWithEmail.pending, state => {
      state.loading = true
    })
    builder.addCase(logInWithEmail.fulfilled, (state, action) => {
      state.user = action.payload.user
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      state.loading = false
    })
    builder.addCase(logInWithEmail.rejected, (state, action) => {
      console.error('Error', action.payload)
      state.error = true
    })

    // logOut
    builder.addCase(logOut.pending, state => {
      state.loading = true
    })
    builder.addCase(logOut.fulfilled, (state, action) => {
      state.user = {}
      localStorage.setItem('user', JSON.stringify({}))
      state.loading = false
    })
    builder.addCase(logOut.rejected, (state, action) => {
      console.error('Error', action.payload)
      state.error = true
    })
  }
})

export const { checkUserInfo, getUserSession, makeItAdmin } = UserSlice.actions

export default UserSlice
