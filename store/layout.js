export const state = () => ({
  drawerStatus: true,
})
export const getters = {
  getDrawerStatus(state) {
    return state.drawerStatus
  },
}
export const mutations = {
  setDrawerStatus(state, payload) {
    state.drawerStatus = payload
  },
}
export const actions = {}
