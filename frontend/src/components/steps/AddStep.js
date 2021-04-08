import React, { Component } from 'react';
import * as service from "../../api/service";
 
class AddStep extends Component {
    state = { 
        title: "", 
        description: "", 
        isShowing: false 
    }


    handleFormSubmit = (e) => {

        e.preventDefault();

    const title = this.state.title;
    const description = this.state.description;
    const craftID = this.props.theCraft._id;

    service
    .addStep(title, description, craftID)
    .then( () => {
        console.log('craft id ', craftID);
        this.props.getTheCraft();
        this.setState({
        title: '',
        description:''
        });
       
    })
    .catch( error => console.log(error) )
  }
 


handleChange = (e)=>{
    const {name, value} = e.target;

    this.setState({
        [name]:value
    })
}


toggleForm =()=>{
    if(!this.state.isShowing){
        this.setState({isShowing: true})
    }else {
        this.setState({isShowing: false})
    }
}

showAddStepForm = () => {
    if(this.state.isShowing){
        return(

<div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <div className="col-12">
            <h2 className="contact-title">Steps to create this craft</h2>
          </div>
          <div className="col-lg-8">
            <form className="form-contact contact_form" onSubmit={this.handleFormSubmit}>
                
                <div >
                  <div className="form-group">
                    <input style={{backgroundColor:'white'}} className="form-control" placeholder="Enter title" type="text" name="title" value={this.state.title} onChange={ e => this.handleChange(e)}/>
                  </div>
                </div>

              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                      <textarea style={{backgroundColor:'white'}} className="form-control w-100"  cols="30" rows="9" placeholder="Enter descritpion" name="description" value={this.state.description} onChange={ e => this.handleChange(e)}></textarea>
                  </div>
                </div>
                
              

              </div>
              
              <div className="form-group">
                <button type="submit" className="button button-contactForm">Add step</button>
              </div>
            </form>
          </div>
          </div>
          )
    }
  }
 





render(){
    return (
        <div>
        <hr />
        <button className="main_btn" style={{borderRadius:'5px', height:'5vh', marginBottom:'10px'}} onClick={() => this.toggleForm()}> Add step </button>
        { this.showAddStepForm() }
  </div>

    )
}


}
export default AddStep;
