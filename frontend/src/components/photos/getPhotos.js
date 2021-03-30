import React, { Component } from "react";

import * as quoterequest from "../../api/pexelsApi";

class GetPhotos extends Component {
  state = {
    photos: [],
    photoName: "",
  };

  searchForPhoto = (e) => {
    const { value } = e.target;
    this.setState({
      photoName: value,
    });
  };

  getPhotos = (e) => {
    e.preventDefault();

    quoterequest.getPhoto(this.state.photoName).then((response) => {
      console.log(response.data.photos);
      this.setState({
        photos: response.data,
      });
    });
    e.target.reset();
  };

  showAllPhotos = () => {
    return this.state.photos.photos?.map((each) => {
      return (
    
        <div key={each._id} className='gridBox'>
        <a href={each.photographer_url}>

          <img src={each.src.original}/>
        </a>
          <h3>Photographer: {each.photographer}</h3>


          </div>
      );
    });
  };

  clearPhotoSearch = () => {
    this.setState({
      photos: [],
    });
  };

  render() {
    return (
      <>
 <section class="banner_area">
      <div class="banner_inner d-flex align-items-center">
        <div class="container">
          <div
            class="banner_content d-md-flex justify-content-center align-items-center"
          >
            <div class="mb-3 mb-md-0">
              <h2>Photography</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
 <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'15vh'}}>
                        <form  onSubmit={this.getPhotos}>
                        <div className="input-group " >
                            <input className="form-control"  onChange={this.searchForPhoto} name="photo" placeholder="inspirational photos" type="text" value={this.state.name}/>
                     <button class="main_btn" style={{borderRadius:'5px', height:'5vh', width:'9vw', marginBottom:'10px'}}>Search</button>
                        </div>
                            
                  
                    </form>

            </div>
                    {this.state.photos.photos?.length > 0 && (
          <button class="main_btn" style={{borderRadius:'5px', height:'5vh', width:'9vw', marginBottom:'10px'}} onClick={this.clearPhotoSearch}>Clear</button>
        )}



        <div className='gridContainer'>
        {this.showAllPhotos()}

          
        </div>
      </>
    );
  }
}

export default GetPhotos;
