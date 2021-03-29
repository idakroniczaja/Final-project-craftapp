import React, { Component } from 'react';
import * as service from "../../api/service";


 class AddComment extends Component {

    state = { 
        description: "", 
        message: '',
    }

    
    handleSubmit=(e)=>{
        e.preventDefault();
      
        
        const description = this.state.description;
        const craftID = this.props.theCraft;
      

        service
        .addComment(description, craftID)
        .then( () => {
            this.props.getTheCraft();
            this.setState({
            description:''
            });
           
        })
        .catch( error => {
            console.log(error)
            this.setState({
                message:'You need to be logged in.'
                });

        } )
    }


    
    handleChange=(e)=>{
        const {name, value} = e.target;
this.setState({
    [name]:value
})
    }




    render() {
     
  
        return (
            <>

           <div class="comment-form" >
                    <h4>Leave a Comment</h4>
                    <form class="form-contact comment_form" onSubmit={this.handleSubmit}>
                        <div class="row">
                            <div class="col-12">
                                <div class="form-group">
                                    <textarea class="form-control w-100" cols="30" rows="9" placeholder="Write Comment" name="description" value={this.state.description} onChange={this.handleChange}></textarea>
                                </div>
                            </div>
                           
                            
                        
                        </div>
                        <div class="form-group">
                            <button  class="button button-contactForm">Send</button>
                        </div>
                    </form>
                </div>



            {/* <form onSubmit={this.handleSubmit}>
            <input name="description" value={this.state.description} onChange={this.handleChange}></input>
            <button>Add comment</button>
        
            </form>
           
           <>{this.state.message}</> */}

          
            </>
        )
    }
}
export default AddComment