import React, { Component } from 'react'

 class ShowAll extends Component {
state = {
    clicked: 'false',

}

toTrue = ()=>{
    this.setState({
        clicked: 'true'
    })
}
toFalse = ()=>{
    this.setState({
        clicked: 'false'
    })
}




    
    render() {
        return (
            <>
         
            

           
            {this.state.clicked==='true' && 
            <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
           
                <button  style={{width:'10vw'}} onClick={this.toFalse} class="page-link" ><i >Hide all</i></button>
                
                <div className='gridContainer'> {this.props.showNext()}</div>
            </div> ||

               <button  style={{width:'10vw'}} onClick={this.toTrue} class="page-link" >
                                      <i >Show all</i>
                </button>

            }

            </>
        )
    }
}
export default ShowAll