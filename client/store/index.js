export const state = () => ({
  // ImgURL: "https://homie.miladkhajavi.ir",
  ImgURL: "http://localhost:3000",
  items: [],
  search: [],
  paginate: {
    countPage: 1,
    count: 1,
    perPage: 4
  },
  
});

export const mutations = {
  SET_ITEMS(state, payload) {
    state.items = payload
  },
  SET_LENGTH(state, payload) {
    state.countPage = payload.countPage
    state.count = payload.count
  },
  SET_SEARCH(state, payload) {
    state.search = payload
  },
  
};

export const actions = {
  async searchMainPage({
    commit
  }, payload) {
    const params = {
      params: {
        ...payload,
        page: payload.page
      }
    };
    return await this.$axios.get("estate/estates", params).then(response => {
        // console.log(response.data.item.items);
      if (response.status === 200) {
        commit("SET_LENGTH", {
          count: response.data.item.count,
          countPage: response.data.item.countPage
        })
        commit("SET_ITEMS", response.data.item.items)
      }else{
        commit("SET_ITEMS",[])
        }
    }).catch(error=>{
        if (!error.response.data.success) {
        commit("SET_ITEMS",[])    
        }
    })
  }
};
