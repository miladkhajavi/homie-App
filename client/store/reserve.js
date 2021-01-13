export const state = () => ({
  items: [],
  pageination: {
    page: 1,
    length: 1,
    perpage: 10
  }
})


export const mutations = {
  SET_ITEMS(state, payload) {
    state.items = payload
  },
  PAGEINATES(state, payload) {

    if (payload.count % 10 === 0) {
      state.pageination.length = (payload.count / 10);
    } else {
      state.pageination.length = Math.floor(payload.count / 10) + 1
    }
    state.pageination.page = payload.page
  }
}

export const actions = {
  async getAllUserRequests({
    commit
  }, payload) {
    return await this.$axios.get("reserve/request/all", {
      params: {
        page: payload.page
      }
    }).then(response => {
      if (response.data.success) {
        if (response.data.item.count > 10) {
          commit("PAGEINATES", {
            count: response.data.item.count,
            page: payload.page
          })
        }
        commit("SET_ITEMS", response.data.item.items)
      } else {
        commit("SET_ITEMS", [])
        console.log(response.data.msg, "errorrrrr");
      }

    }).catch(err => {
      console.log(err, "errorrrrreeeeeee");
    })
  },

  async remove({
    commit
  }, payload) {
    return await this.$axios.delete("/reserve/remove", {
      params: {
        id: payload
      }
    })
  }
}
