import io from "socket.io-client"

const socket = io("http://localhost:3000",{ path: "/socket.io/global" })

export default({app}, inject) =>{
    app.socket = socket,
    inject("socket", socket)
}