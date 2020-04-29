import {request} from "./request";

export function getBanners(type) {
    return request({
        url:"/banner",
        params:{
            type
        }
    })
}

    export function getRecommendList(limit) {
            return request({
                url:'/personalized',
                params:{
                    limit
                }
            })
}

export function getPlistDetail(id) {
return request({
    url:'/playlist/detail',
    params:{
        id
    }
})
}

export function getSongDetail(ids) {
return request({
    url:'/song/detail',
    params:{
        ids
    }
})
}
export class RecommendListDetail{
    constructor(name,coverImgUrl,trackIds,tracks) {//nav-bar的title,背景图url以及下面所有歌曲信息
        this.name=name;
        this.bgcUrl=coverImgUrl;
        this.trackIds=trackIds;
        this.tracks=tracks;
    }
}