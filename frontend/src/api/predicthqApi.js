import axios from 'axios';

const createHeaders = ()=> {
  return{
    headers:{
        Authorization: `Bearer G2MCI0gktLaG_UulzYcxJJn3MkOeBRzf-DD-kTze`
    }
  }

}


let dd = String(new Date().getDate()).padStart(2, '0');
let mm = String(new Date().getMonth()+1).padStart(2,'0');
let yyyy = String(new Date().getFullYear())

let startDate = yyyy + '-' + mm + '-' + dd;

let twoWeeks = new Date()
twoWeeks.setDate(twoWeeks.getDate()+14)

let ddEnd = String(twoWeeks.getDate()).padStart(2, '0');
let mmEnd = String(twoWeeks.getMonth()+1).padStart(2,'0');
let yyyyEnd = String(twoWeeks.getFullYear())

let endDate = yyyyEnd + '-' + mmEnd + '-' + ddEnd;
console.log(startDate, endDate)


export function getEventByPlace (place, event) {

    console.log(place, event)

   return axios.get(`https://api.predicthq.com/v1/places/?q=${place}`,createHeaders())
    .then(
        response=>{

            let res = response.data.results.map(each=>{
              return each.id
            })
     console.log(res)
      return axios.get(`https://api.predicthq.com/v1/events/?q=${event}&place.scope=${res}&active.gte=${startDate}&active.lte=${endDate}&sort=rank&limit=100`,createHeaders())

    }
    )
 
}

