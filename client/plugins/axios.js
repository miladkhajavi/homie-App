export default function ({
  $axios,
  redirect,
  store
}) {
  $axios.setToken(localStorage.getItem("HOMEITOKEN_KEY"));
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    // console.log(error.response);
    const errorserver = [500, 501];
    if (errorserver.includes(code)) {
      console.log(" دسترسی به سرور امکان پذیر نیست");
    }
    if (code === 401) {
      store.commit('auth/SIGN_OUT');
    }
  })
}
