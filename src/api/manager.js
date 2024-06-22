import axios from '@/axios.js'

export function login(uname, pwd) {
    return axios.post("/admin/login", {
        uname, pwd
    })
}

export function getUserInfo() {
    return axios.get("/admin/getUserInfo");
}

export function logout() {
    return axios.post("/admin/logout");
}

export function editPwd(data) {
    return axios.post("/admin/editPwd", data);
}