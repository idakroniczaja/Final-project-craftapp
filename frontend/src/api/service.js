import axios from 'axios';

const createHeaders = ()=> {
  return{
    headers:{
      Authorisation: `Barer ${localStorage.getItem('token')}`
    }
  }

}
 
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_SERVER_URL : `http://localhost:5000/api`
  
});
 
const errorHandler = err => {

  throw err;
};

 
  
export function handleUpload(theFile){
    // console.log('file in service: ', theFile)
    return service
      .post('/upload', theFile)
      .then(res => res.data)
      .catch(errorHandler);
  }
 
  export function saveNewThing(newThing) {
    // console.log('new thing is: ', newThing)
    return service
      .post('/crafts/create', newThing, createHeaders())
      .then(res => res.data)
      .catch(errorHandler);
  }

  export function showAllCrafts(){
    return service
    .get('/crafts', createHeaders())
    .then(res=>res.data)
    .catch(errorHandler)
  }

  export function showRandomCrafts(){
    return service
    .get('/crafts', createHeaders())
  
  }

  export function getMyCrafts(){
    return service
    .get('/myCrafts', createHeaders())
  }

  export function showCraftDetails(params){
      return service
      .get(`/crafts/${params}`, createHeaders())
  }

  export function editCraft (params, state){
      return service
      .put(`/crafts/${params}`, state, createHeaders())

  }

  export function deleteCraft (params){
      return service
    .delete(`/crafts/${params}`, createHeaders())
  }
  



  export function addStep (title, description, craftID){
    return service
  .post(`/steps`, {title, description, craftID}, createHeaders())
}

  export function showStep (craftId, stepId){
    return service
  .get(`/crafts/${craftId}/steps/${stepId}`, createHeaders())
}

  export function deleteStep (params){
    return service
  .delete(`/steps/${params}`, createHeaders())
}

export function addComment (description, craftID){
  return service
.post(`/comments`, {description, craftID}, createHeaders())
}

export function deleteComment (params){
  return service
.delete(`/comments/${params}`, createHeaders())
}



export function logIn (profile){
console.log(profile)
//localStorage.setItem('token', profile.tokenId)
return service
.post('/logMeIn', profile.profileObj, createHeaders())
.then((res)=>{
 console.log(res)
  localStorage.setItem('token', res.data.token)
  return res.data.user
})
}

export function getUser (){
  return service
.get(`/user`, createHeaders())
.then((profile)=>{
  console.log(profile.data)
  return profile.data
})

}