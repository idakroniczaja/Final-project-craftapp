import React, { Component } from 'react';
import * as service from '../api/service';
 
class EditCraft extends Component {
  state = {
    title: this.props.theCraft.title, 
    description: this.props.theCraft.description,
  }
  
  handleFormSubmit = (event) => {   
    event.preventDefault();
service.editCraft(this.props.theCraft._id, this.state)
    .then(res => {
        this.props.getTheCraft();
    })
    .catch( error => console.log(error) )
  }
 
  handleChangeTitle = (event) => {  
    this.setState({
      title:event.target.value
    })
  }
 
  handleChangeDesc = (event) => {  
    this.setState({
      description:event.target.value
    })
  }



 
  render(){
    return (
      <div>

<div class="col-12">
          <h2 className="contact-title">Edit your post:</h2>
        </div>
        <div >
          <form className="form-contact contact_form" onSubmit={this.handleFormSubmit}>
            <div className="row">

              <div className="col-12">
                <div className="form-group">
                  <input className="form-control" type="text" name="title" value={this.state.title} onChange={e => this.handleChangeTitle(e)}/>
                </div>
              </div>

              <div className="col-12">
                <div className="form-group">
                    <textarea className="form-control w-100" cols="30" rows="9" name="description" value={this.state.description} onChange={e => this.handleChangeDesc(e)}></textarea>
                </div>
              </div>
            
            </div>
            <button  className="main_btn" style={{borderRadius:'5px', height:'5vh', width:'9vw', marginBottom:'10px'}} >Submit</button>
          
          </form>


        </div>


      </div>
    )
  }
}
 
export default EditCraft;