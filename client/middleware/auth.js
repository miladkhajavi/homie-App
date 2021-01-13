export default function ({
  store,
  redirect
}) {
  if (!localStorage.getItem("HOMEITOKEN_KEY")) {
    return redirect('/auth/login')
  }

  store.commit("auth/SET_TOKEN", localStorage.getItem("HOMEITOKEN_KEY"));
  store.commit("auth/SET_INFO", JSON.parse(localStorage.getItem("INFO")));
}
