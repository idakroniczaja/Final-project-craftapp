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
                <h1 id="title" style={{ background: this.state.edit ? '#bbb' : '' }} onBlur={this.blur} contentEditable={this.state.edit}>{this.state.step.title}</h1>
                <p id="description" style={{ background: this.state.edit ? '#bbb' : '' }} onBlur={this.blur} contentEditable={this.state.edit}>{this.state.step.description}</p>
                <button onClick={() => this.setState({ edit: !this.state.edit })} >✏️ Edit </button>
                <button onClick={this.deleteStep}>Delete</button>
                <Link to={`/crafts/${this.props.match.params.id}`}>Back to </Link>
                <br></br>
                <Link to={"/profile"}>Back to list of your crafts</Link>
            </div>
        )
        
    }
}


export default StepDetails;
