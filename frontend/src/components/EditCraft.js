import React, { Component } from 'react';
import * as service from '../api/service';
 
class EditCraft extends Component {
  state = {
    title: this.props.theCraft.title, 
    description: this.props.theCraft.description
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
        <hr />
        <h3>Edit form</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input type="text" name="title" value={this.state.title} onChange={e => this.handleChangeTitle(e)}/>
          <label>Description:</label>
          <textarea name="description" value={this.state.description} onChange={e => this.handleChangeDesc(e)} />
          
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}
 
export default EditCraft;