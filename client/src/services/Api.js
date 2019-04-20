import axios from 'axios'

export default() => {
    return axios.create({
        baseURL: `http://192.168.1.190:3000`,
        withCredentials: false,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}
