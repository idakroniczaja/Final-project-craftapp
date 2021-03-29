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
            <div>
                  <h3>Add Step</h3>
                  <form onSubmit={this.handleFormSubmit}>
                  <label>Title:</label>
                  <input type="text" name="title" value={this.state.title} onChange={ e => this.handleChange(e)}/>
                  <label>Description:</label>
                  <textarea name="description" value={this.state.description} onChange={ e => this.handleChange(e)} />
                  
                  <input type="submit" value="Submit" />
                  </form>
            </div>
          )
    }
  }
 





render(){
    return (
        <div>
        <hr />
        <button onClick={() => this.toggleForm()}> Add step </button>
        { this.showAddStepForm() }
  </div>

    )
}


}
export default AddStep;
