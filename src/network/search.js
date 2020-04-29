import {request} from "./request";

export function getSearchDefault() {
return request({
    url:'/search/default'
})
}

export function getSearchList(keywords) {
return request({
    url:'/search',
    params:{
        keywords
    }
})
}

export function getSearchHot() {
    return request({
        url:'/search/hot'
    })

}