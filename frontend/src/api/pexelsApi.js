import axios from 'axios';

const createHeaders = ()=> {
  return{
    headers:{
        Authorization: '563492ad6f91700001000001a5699c3bc4094ef087023d2bd4725427'
    }
  }

}


export function getPhoto (query) {

   return axios.get(`https://api.pexels.com/v1/search?query=${query}&per_page=10`,createHeaders())
    
 
}

export function getVideo (query) {

  return axios.get(`https://api.pexels.com/videos/search?query=${query}&per_page=10`,createHeaders())
   

}

export function getCuratedPhotos () {

  return axios.get(`https://api.pexels.com/v1/curated`,createHeaders())
   

}