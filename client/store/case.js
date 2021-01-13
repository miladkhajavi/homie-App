export const state = () => ({
  items: [],
  paginate:{
    countPage:1,
    count:1,
    perPage:8
  }
    
})


export const mutations = {
  SET_ITEMS(state, payload) {
    state.items = payload
  },
  
  SET_LENGTH(state,payload) {
    state.countPage = payload.countPage
    state.count = payload.count
  }
}

export const actions = {
  /**
   * @param {*} payload
   * @return {*} 
   */
  async getAllCases({
    commit
  }, payload) {
    
    return await this.$axios.get("estate/filters", {
        params:{
            type: payload.type,
      propertyType:payload.propertyType,
      bedRooms: payload.bedRooms,
      bathRooms:payload.bathRooms,
      star: payload.star,
      page: payload.page
        }
    }).then(response => {
      if(response.status === 200 || response.data.item.success){
        commit("SET_ITEMS", response.data.item.items) 
        commit("SET_LENGTH",{
          count:response.data.item.count,
          countPage:response.data.item.countPage})
      }else{
      commit("SET_ITEMS",[])
      }
      
    }).catch(err=>{
      commit("SET_ITEMS",[])
    })
  },

  async sortPrices({commit},payload){
    return await this.$axios.get("estate/sortprice",{
      params:{
        page:payload.page,
        price:payload.price
      }
    }).then(response=>{
      if(response.status === 200 || response.data.item.success){
        commit("SET_ITEMS", response.data.item.items) 
        commit("SET_LENGTH",{
          count:response.data.item.count,
          countPage:response.data.item.countPage})
      }else{
      commit("SET_ITEMS",[])
      console.log("نتیجه ای یافت نشد");
      }
    }).catch(err=>{
      commit("SET_ITEMS",[])
    })
  },
/**
 *
 * @param {*} {commit}
 * @param {*} payload
 * @return {*} 
 */
async getOneCase({commit},PAYLOAD){
    const params = {
      params:PAYLOAD
    }
    return await this.$axios.get("estate/",params)
  },
  /**
   * ? for reservation time for visit Houses
   */
  async sendReservation({commit},PAYLOAD){
    return await this.$axios.post("reserve/send",PAYLOAD)
  }
}
