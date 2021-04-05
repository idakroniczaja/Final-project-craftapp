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

           <div className="comment-form" >
                    <h4>Leave a Comment</h4>
                    <form className="form-contact comment_form" onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <textarea className="form-control w-100" cols="30" rows="9" placeholder="Write Comment" name="description" value={this.state.description} onChange={this.handleChange}></textarea>
                                </div>
                            </div>
                           
                            
                        
                        </div>
                        <div className="form-group">
                            <button  className="button button-contactForm">Send</button>
                        </div>
                    </form>
                </div>



        

          
            </>
        )
    }
}
export default AddComment