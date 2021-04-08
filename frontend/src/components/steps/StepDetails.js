import React, { Component } from "react";
import axios from "axios";
import * as service from "../../api/service";
import { Link } from "react-router-dom";



class StepDetails extends Component {

state ={
    step:{},
    edit:false
}


componentDidMount(){
    console.log(this)
    service
    .showStep(this.props.match.params.id, this.props.match.params.stepId)
    .then( responseFromApi =>{
        const theStep = responseFromApi.data;
        this.setState({
            step: theStep
        });
    })
    .catch((err)=>{
        console.log(err)
    })
}



deleteStep = () => {
    console.log(this.props.match.params.stepId)
    service
    .deleteStep(this.props.match.params.stepId)
    .then(()=>{
        this.props.history.push(`/crafts/${this.props.match.params.id}`);
    })
    .catch((err) => console.log(err));
}


blur = (e) => {
    axios
    .put(`http://localhost:5000/api/steps/${this.props.match.params.stepId}`,
    { [e.target.id]: e.target.innerText }
    )
    
    
    this.setState({ edit: false })
}




render(){
    return(
        <div>
    <div className="video-area background_one area-padding" style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        <div className="container" >
            <div className="row">
                <div className="area-heading">
                    <h3 id="title" style={{ background: this.state.edit ? 'white' : '' }} onBlur={this.blur} contentEditable={this.state.edit}>{this.state.step.title}</h3>
                    <p id="description" style={{ background: this.state.edit ? 'white' : '' }} onBlur={this.blur} contentEditable={this.state.edit}>{this.state.step.description}</p>
                    

                    <button className="main_btn" style={{borderRadius:'5px', height:'5vh', marginTop:'5vh', width:'7vw', marginRight:'10vw'}} onClick={() => this.setState({ edit: !this.state.edit })} >Edit</button>
                    <button className="main_btn" style={{borderRadius:'5px', height:'5vh', width:'7vw'}} onClick={this.deleteStep}>Delete</button>
                 </div>
            </div>
        </div>
        <div style={{width:'30vw'}}>
            <Link to={`/crafts/${this.props.match.params.id}`} style={{color:'gray', padding:'10px'}}><h4>Back to craft details</h4></Link>
            <Link to={"/profile"} style={{color:'gray'}}><h4>Back to your profile</h4></Link>
        </div>
    </div>


            </div>
        )
        
    }
}


export default StepDetails;
