export const state = () => ({
 item:[]
})


export const mutations = {
  SET_PROFILE_USER(state, payload) {
    state.item = payload
  }
}

export const actions = {
  async getProfileUser({
    commit
  }, payload) {
    return await this.$axios.get("user/profile")
  },

  async editProfile({commit},payload){
      return this.$axios.put("user/edit", payload)
  },

  async uploadProfileAvatar({commit},payload){
    return this.$axios.post("user/avatar",payload)
  },

  async contactUs ({commit},payload){
    return this.$axios.post("user/contactus",payload)
  }
}
