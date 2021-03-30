import React, { Component } from 'react';
import * as service from '../api/service';
import { Link } from 'react-router-dom';

class AddCraft extends Component {
state = {
    title:'',
    description:'',
    imageUrl:'',
    message:''
   
}

handleSubmit = (e) => {
  e.preventDefault();
  //console.log(this.props.user.email)


    service
      .saveNewThing(this.state)
      .then(res => {
        console.log('added: ', res);

        if(res.errors){
          this.setState({
            message:`All fields are required. ` 
          })      
          return
        }
     
    
       this.props.history.push(`/crafts/${res._id}`)
      })
      .catch(err => {
        console.log('Error while adding the thing: ', err);
      
      });


}

handleFileUpload = e => {
    const uploadData = new FormData();
    uploadData.append('imageUrl', e.target.files[0]);
    service
      .handleUpload(uploadData)
      .then(response => {
        // console.log('response is: ', response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ imageUrl: response.secure_url });
      })
      .catch(err => {
        console.log('Error while uploading the file: ', err);
      });
}
handleChange = (e)=>{
    const {name, value} = e.target
    this.setState({
        [name]:value
    })
}





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
              <h2>Post Craft</h2>
            </div>
            
          </div>
        </div>
      </div>
    </section>


          <div class="row" style={{display:'flex', flexDirection:'row', justifyContent:'center', marginTop:'10vh'}}>

          <form class="form-contact contact_form" onSubmit={e => this.handleSubmit(e)}>
                      <div class="media-body" style={{marginBottom:'7vh'}}>
                              {!this.props.user.email && <h4>To post crafts, you must <Link to='/auth'>log in</Link>.</h4>}
                        </div>



          <div class="row" >
            <div class="col-sm-6">
              <div class="form-group">
                <input class="form-control" placeholder='Enter title' type='text' name='title' value={this.state.title} onChange={(e)=> this.handleChange(e)}/>
              </div>
            </div>
            
            <div class="col-sm-6">
              <div class="form-group">
                <input  type='file' onChange={(e)=> this.handleFileUpload(e)} placeholder="Add photo"/>
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                  <textarea class="form-control w-100" name='description' value={this.state.description} onChange={(e)=> this.handleChange(e)} cols="30" rows="9" placeholder="Enter description"></textarea>
              </div>
            </div>
            
          </div>
              
          
                    
                        <div class="media-body">
  
                                <h4>{this.state.message}</h4>
                          
                        </div>
                  

          <div class="form-group mt-3">
            <button type="submit" class="button button-contactForm">Post Craft</button>
          </div>
        </form>
        </div>
          </>


            // <form onSubmit={e => this.handleSubmit(e)}>
            // {!this.props.user.email && <div>To add craft, you must <Link to='/auth'>log in</Link>.</div>}
            // <label> TITLE:
            // <input type='text' name='title' value={this.state.title} onChange={(e)=> this.handleChange(e)}/>
            // </label>
            // <label> DESCRIPTION:
            // <textarea name='description' value={this.state.description} onChange={(e)=> this.handleChange(e)}/>
            // </label>
            // <label> IMAGE:
            // <input type='file' onChange={(e)=> this.handleFileUpload(e)}/>
            // </label>
            // <p>{this.state.message}</p>
            //     <button type='submit'>Add craft</button>
            // </form>
        )
    }
}

export default AddCraft