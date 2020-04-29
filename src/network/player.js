import {request} from "./request";
export function getSongUrl(id) {
return request({
    url:'/song/url',
    params:{
        id
    }
})
}

export function getLyric(id) {//得到歌词
return request({
    url:'/lyric',
    params:{
        id
    }
})
}

export function getSongDetail(ids){
    return request({
        url:'/song/detail',
        params:{
            ids
        }
    })
}