import {request} from './request'

export function getSinger(limit,offset) {
return request({
    url:'/top/artists',
    params:{
        limit,
        offset
    }
})
}

export function getSingerAblum(id,limit) {
return request({
    url:'/artist/album',
    params:{
        id,
        limit
    }
})
}
export function getSingerSingle(id) {
return request({
    url:'/artists',
    params:{
        id
    }
})
}