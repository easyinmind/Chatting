

export function getPath({photo}){
  console.log(photo)
  if(!photo){
    return '/userInfo'
  }else {
    return '/chatlist'
  }
}

export function getChatId(userId,targetId){
  return [userId,targetId].sort().join('_')
}