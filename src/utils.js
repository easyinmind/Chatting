

export function getPath({photo}){
  console.log(photo)
  if(!photo){
    return '/userInfo'
  }else {
    return '/chatlist'
  }
}