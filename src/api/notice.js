import axios from '@/axios.js'

export function getNoticeList(pageNum, pageSize) {
    return axios.get(`/admin/notice/list/${pageNum}/${pageSize}`)
}

export function addNotice(data) {
    return axios.post("/admin/notice/add", data)
}

export function editNotice(id, data) {
    return axios.post(`/admin/notice/edit/${id}`, data)
}

export function delNotice(id) {
    return axios.post(`/admin/notice/del/${id}`)
}