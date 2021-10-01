export const state = ()=>({
    token: null,
    Info:null
})


export const mutations = {
    SET_TOKEN(state,payload){
        state.token = payload
    },
    SET_AUTH(state,payload){
        // console.log(payload,"paylpad");
        delete payload.user.createdAt;
        delete payload.user.updatedAt;
        console.log(payload,"payload");
        localStorage.setItem("HOMEITOKEN_KEY", payload.token);
        localStorage.setItem("INFO",JSON.stringify(payload.user))
        this.$axios.setToken(payload.token);
        state.token = payload.token
        state.Info = payload.user
    },
    SET_INFO(state, payload) {
        state.Info = payload;
    },
    SIGN_OUT(state) {
        window.localStorage.clear("HOMEITOKEN_KEY");
        window.localStorage.clear("INFO")
        state.token = null
        state.Info = null
        this.$router.push('/auth/login');
    }   
}

export const actions = {
    async register ({commit} , payload){
        return await this.$axios.post("user/register" ,payload)
    },

    async login ({commit}, payload){
        return await this.$axios.post("user/login",payload)
    }
}