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
            <form onSubmit={e => this.handleSubmit(e)}>
            {!this.props.user.email && <div>To add craft, you must <Link to='/auth'>log in</Link>.</div>}
            <label> TITLE:
            <input type='text' name='title' value={this.state.title} onChange={(e)=> this.handleChange(e)}/>
            </label>
            <label> DESCRIPTION:
            <textarea name='description' value={this.state.description} onChange={(e)=> this.handleChange(e)}/>
            </label>
            <label> IMAGE:
            <input type='file' onChange={(e)=> this.handleFileUpload(e)}/>
            </label>
            <p>{this.state.message}</p>
                <button type='submit'>Add craft</button>
            </form>
        )
    }
}

export default AddCraft