
import React, { Component } from "react";

import * as quoterequest from '../../api/pexelsApi'


class GetPhotos extends Component { 
state = {
    photos:[],
    photoName:''
}

searchForPhoto =(e)=>{
      const {value} = e.target
      this.setState({
        photoName:value
      })
      
    }
    
    getPhotos = (e) =>{
      e.preventDefault()
      
      quoterequest
      .getPhoto(this.state.photoName)
      .then((response)=>{
        console.log(response.data.photos)
        this.setState({
          photos:response.data
        })
      })
        e.target.reset()
    
    }
    
    showAllPhotos=()=>{
    
       return  this.state.photos.photos?.map(each=>{
          return (
            <div key={each._id}>
           <a href={each.photographer_url}><h3>Photographer: {each.photographer}</h3></a> 
            <img src={each.src.original} alt={this.id} width='300vw'/>
      
            </div>
            )
          })
     
    
      }
    
    clearPhotoSearch =()=>{
    this.setState({
      photos:[]
    })
    }
    
   
    
render(){
    return(
        <>
<form onSubmit={this.getPhotos}>
<input
          onChange={this.searchForPhoto}
          name="photo"
          placeholder="inspirational photos"
          type="text"
          value={this.state.name}
        />
<button>Search</button>

</form>
{this.state.photos.photos?.length>0 &&
 <button onClick={this.clearPhotoSearch}>Clear</button>
}

 <div>{this.showAllPhotos()}
 </div>




        </>

    )
}
}

export default GetPhotos