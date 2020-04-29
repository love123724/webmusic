import {request} from "./request";
export function getTopList(idx) {
return request({
    url:'/top/list',
    params:{
        idx
    }
})
}

export function getTopListDetail() {
return request({
    url:'/toplist/detail',
})
}