import React from 'react';
import {Link} from 'react-router-dom';
import * as service from '../api/service';

class RandomCrafts extends React.Component{
    state ={
        crafts:[]
    }

    componentDidMount(){
        service
        .showRandomCrafts()
        .then((response)=>{
         this.setState({
             crafts:response.data
         })
            
       
        })
    }


    showFilteredCrafts=()=>{
        let sorted1 = [...this.state.crafts].sort((a,b)=>b.comments?.length-a.comments?.length).filter((elem,i)=>i===0)
        let sorted2 = [...this.state.crafts].sort((a,b)=>b.comments?.length-a.comments?.length).filter((elem,i)=>i===1)
        let sorted3 = [...this.state.crafts].sort((a,b)=>b.comments?.length-a.comments?.length).filter((elem,i)=>i===2)
       console.log(sorted1, sorted2,sorted3)
            
                return(
                    <>
                    <div className="col-lg-5 col-xl-6" style={{display:'flex', flexDirection:'column', justifyContent:'space-around', margin:'auto'}}>

                     <div className="single-blog column style-four"> 
                        <div className="thumb" >
                                <img className="img-fluid" src={sorted1.map(each=>each.imageUrl)} alt={sorted1.map(each=>each.title)}/>
                        </div>

                        <div className="col-12 short_details " style={{marginTop:'15vh'}}>
                            <div className="meta-top d-flex">
                                <a >Comments: {sorted1.map(each=>each.comments.length)}</a>
                            </div>
                            <Link to={`/crafts/${sorted1.map(each=>each._id)}`} className="d-block" href="single-blog.html">
                                <h4 className="font-20" >{sorted1.map(each=>each.title.split('')[0].toUpperCase()+each.title.slice(1))}</h4>
                            </Link>
                            <p>{sorted1.map(each=>each.description)}</p>
                        </div>
                        
                    </div>    

                </div> 


                
                 <div className="col-lg-7 col-xl-6" >

                    <div className="single-blog row no-gutters style-four m_b_30 ">
                        <div className="col-12 col-sm-7 ">

                            <div className="short_details padd_left_0">
                                <div className="meta-top d-flex">
                                    <a >{sorted2.map(each=>each.comments.length)} comments</a>
                                </div>
                                <Link to={`/crafts/${sorted2.map(each=>each._id)}`} className="d-block" href="single-blog.html">
                                    <h4 className="font-20">{sorted2.map(each=>each.title.split('')[0].toUpperCase()+each.title.slice(1))}</h4>
                                </Link>
                                <p>{sorted2.map(each=>each.description)}</p>
                            </div>  
                            
                        </div>  
                        <div className="col-12 col-sm-5 randomPostsPhotos">
                            <div className="thumb">
                                <img className="img-fluid" src={sorted2.map(each=>each.imageUrl)} alt={sorted2.map(each=>each.title)}/>
                            </div>
                        </div>
                    </div> 




                    <div className="single-blog row no-gutters style-four">
                        <div className="col-12 col-sm-5">
                            <div className="thumb">
                            <img className="img-fluid" src={sorted3.map(each=>each.imageUrl)} alt={sorted3.map(each=>each.title)}/>
                            </div>
                        </div>
                        <div className="col-12 col-sm-7">
                            <div className="short_details padd_right_0">
                                <div className="meta-top d-flex">
                                    <a href="#">{sorted3.map(each=>each.comments.length)} comments</a>
                                </div>
                                <a className="d-block" href="single-blog.html">
                                    <h4 className="font-20">{sorted3.map(each=>each.title.split('')[0].toUpperCase()+each.title.slice(1))}</h4>
                                </a>
                                <p>{sorted3.map(each=>each.description)}</p>
                            </div>  
                        </div>  
                    </div>
                </div>

                </>
                )



    }

    render(){
        return(
            <>
  
            
            <section class="editors_pick area-padding">
        <div class="container">

            <div class="row">
                <div class="area-heading">
                    <h3>Our Picks for you</h3>
                    <p>Posts with highest number of comments:</p>
                </div>
            </div>


        <div class="row">
        {this.showFilteredCrafts()}
            </div>


            <div class="row">
                <div class="col-12">
                    <div class="addvertise">
                        <a href=""><img src="eden-master/img/banner/add.jpg" alt=""/></a>

                    </div>
                </div>
            </div>

        </div>

    </section>
            </>

        )
    }


    
}

export default RandomCrafts