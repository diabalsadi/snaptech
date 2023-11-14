import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: []
  },
  reducers: {
    setProduct: state => {
      state.products = JSON.parse(localStorage.getItem('products')) || []
    },
    removeAll: state => {
      state.products = []
      localStorage.setItem('products', JSON.stringify(state.products))
    },
    addToProduct: (state, action) => {
      action.payload
      //   state.products = state.products.push(id)
      state.products.push(action.payload)
      localStorage.setItem('products', JSON.stringify(state.products))
    },
    removeFromProduct: (state, action) => {
      const { id } = action.payload
      state.products = state.products.filter(item => item.id !== id)
      localStorage.setItem('products', JSON.stringify(state.products))
    }
  }
})

export const {
  addToProduct,
  removeAll,
  removeFromProduct,
  setProduct,
} = cartSlice.actions

export default cartSlice
