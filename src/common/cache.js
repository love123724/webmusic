import storage from 'good-storage'

const SEARCH_KEY='__SEARCH__'
const SEARCH_MAX_LENGTH=9

function insertArray(arr,val,compare,maxLength) {
   let index=arr.findIndex(compare)//compare是用户传入的一个查找函数函数
    if(index===0){//不存在这个元素
        return
    }
    if(index>0){//如果找到了,就把这个已经存在的历史删除并且新的放到数组的开头
        arr.splice(index,1)
    }
    arr.unshift(val)
    if(maxLength&&arr.length>maxLength){//如果数组的长度大于15则删除最后一个元素
        arr.pop()
    }
}

function deleteArray(arr,compare) {
   const index=arr.findIndex(compare)
    if(index>-1){
        arr.splice(index,1)
    }
}
export function saveHistory(query) {
   let searches=storage.get(SEARCH_KEY,[])
    insertArray(searches,query,(item)=>{
        return item===query
    },SEARCH_MAX_LENGTH)
    storage.set(SEARCH_KEY,searches)
    return searches
}
export function loadSearch() {
    console.log('ll')
    return storage.get(SEARCH_KEY,[])
}

export function deleteSearchAll() {
    storage.remove(SEARCH_KEY)
    return []
}

export function deleteSearchOne(query) {
    let searches=storage.get(SEARCH_KEY,[])
    deleteArray(searches,(item)=>{
        return item===query
    })
    storage.set(SEARCH_KEY,searches)
    return searches
}
