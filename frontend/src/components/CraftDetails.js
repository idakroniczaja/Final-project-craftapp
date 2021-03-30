import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as service from "../api/service";
import EditCraft from "./EditCraft";
import AddStep from "./steps/AddStep";
import AddComment from './comments/AddComment';


class CraftDetails extends Component {
  state = {
    craft:{},
    edit: false,
    userCrafts:[]
  };
  
  componentDidMount() {
        this.getSingleCraft();
        this.getAllCrafts();
       
        
  }
  

getSingleCraft = ()=>{
  service
    .showCraftDetails(this.props.match.params.id)
    .then((res) => {
      const theCraft = res.data;
      // console.log(theCraft)
      this.setState({
        craft: theCraft});
      })
      .catch((err) => {
        console.log(err);
      });
}

getAllCrafts = () =>{
 service
      .showAllCrafts()
      .then(res=>{
        this.setState({
         userCrafts:res
        })
      })
}


    showUserCraftsTitles = ()=>{
      return [...this.state.userCrafts].filter(each=>each.userId==this.state.craft.userId)
      .map(each=>{
        return (
          <li key={each._id}><Link to={`/crafts/${each._id}`}>{each.title}</Link></li>
          )
        })
      }
      
      showUserCraftsSide = ()=>{
        return [...this.state.userCrafts].filter(each=>each.userId==this.state.craft.userId)
        .filter((each,i)=>i<4)
      
      .map(each=>{
        return (
                    <div key={each._id} class="media post_item">
                            <img src={each.imageUrl} alt="post" width='100vw'/>
                            <div class="media-body">
                                <a href="single-blog.html">
                                    <h3><Link to={`/crafts/${each._id}`}>{each.title}</Link></h3>
                                </a>
                                <p>{each.createdAt}</p>
                            </div>
                    </div>
  )
})
    }
 



    deleteCraft = () => {
      service
      .deleteCraft(this.props.match.params.id)
      .then(() => {
        this.props.history.push("/crafts");
      })
      .catch((err) => console.log(err));
    };

    deleteComment =(id)=>{
      service
      .deleteComment(id)
      .then(()=>{
        this.getSingleCraft()

        })
    }

    findMyNextCraft =()=>{
      console.log(this.state.craft)
      let myCrafts = this.state.userCrafts.filter(each=>each.userId==this.state.craft.userId)
      // let element = myCrafts.filter((elem)=>elem.title.includes(this.state.craft.title))
      // console.log(element)
      console.log(myCrafts.filter((e,i)=>{
       return myCrafts.filter((elem)=>elem.title.includes(this.state.craft.title))
      }
      
      ))
    //  .filter((each, index)=>index > myCrafts.indexOf(this.state.craft))
      // .filter((elem,i)=>i===0)
      // .map(each=>{
      //   return(<>{each.title}</>)
      // })
      
      // .map(each=>each.title)
    }
    
    
    render() {

      return (
        <div>
        {this.findMyNextCraft(this.state.craft)}

<section class="banner_area">
      <div class="banner_inner d-flex align-items-center">
        <div class="container">
          <div
            class="banner_content d-md-flex justify-content-center align-items-center"
          >
            <div class="mb-3 mb-md-0">
              <h2>Craft Details</h2>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="blog_area single-post-area area-padding">
    <div class="container">
        <div class="row">
            <div class="col-lg-8 posts-list">
                <div class="single-post">
                    <div class="feature-img">
                        <img class="img-fluid" src={this.state.craft.imageUrl} alt={this.state.craft.title}/>
                    </div>

                    <div class="blog_details">
                        <h2>{this.state.craft.title}</h2> 
                        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                        <ul class="blog-info-link mt-4 mb-4">
                            <li><i class="far fa-clock"></i> {this.state.craft.createdAt}</li>
                            <li><i class="far fa-comments"></i>{this.state.craft.comments?.length}</li>
                        </ul>
                        <div style={{width:'15vw', display:'flex', justifyContent:'space-between'}}>

                        {this.props.user._id===this.state.craft.userId && 
                        <>
                             <button class="main_btn" style={{borderRadius:'5px', height:'5vh', width:'7vw', marginBottom:'10px'}} onClick={this.deleteCraft}>Delete</button>
                             <button class="main_btn" style={{borderRadius:'5px', height:'5vh', marginBottom:'10px', width:'7vw'}} onClick={()=>this.setState({ edit: !this.state.edit })}>Edit</button>
                        </>
                         }

                         {/* { this.props.user._id===this.state.craft.userId && <button class="main_btn" style={{borderRadius:'5px', height:'5vh', marginBottom:'10px', width:'7vw'}} onClick={()=>this.setState({ edit: !this.state.edit })}>Edit</button>} */}
                        </div>

                        </div>
                  
                        <p class="excert">
                        <h4>Description:</h4>
                            {this.state.craft.description}
                        </p>
                         {this.state.edit && <div>{<EditCraft theCraft={this.state.craft} getTheCraft={this.getSingleCraft} {...this.props}/>}</div>}
                        <div class="quote-wrapper" >
                            <ol class="quotes" style={{display:'flex', flexDirection:'column', alignItems:'flex-center'}}>
                            <h3>Steps:</h3>
                            {this.state.craft.steps?.length===0 && <div>No steps provided.</div> ||
                            this.state.craft.steps?.map((step, i)=>{
          return (
            <li key={i} style={{}}>
            {this.props.user._id===this.state.craft.userId && <Link to={`/crafts/${this.state.craft._id}/steps/${step._id}`} craftName={this.state.craft.title}><h3>{step.title}</h3></Link>}
            
            <p>{step.description}</p>
            </li>
          )

        })
                          
                            }
                            
                          
                            </ol>
                            { this.props.user._id===this.state.craft.userId && <div><AddStep theCraft={this.state.craft} getTheCraft={this.getSingleCraft} /> </div>}
                        </div>
                     
                         
                    </div>
                </div>
                <div class="navigation-top">
                    <div class="d-sm-flex justify-content-between text-center">
                      
                        <div class="col-sm-2 my-sm-0">
                            <p class="comment-count"><i class="far fa-comment"></i>{this.state.craft.comments?.length}</p>
                        </div>
                        <ul class="social-icons">
                            <li><a href="https://www.facebook.com/"><i class="fab fa-facebook-f"></i></a></li>
                            <li><a href="https://twitter.com/?lang=en"><i class="fab fa-twitter"></i></a></li>
                            <li><a href="https://dribbble.com/dribbble"><i class="fab fa-dribbble"></i></a></li>
                            <li><a href="https://www.behance.net/"><i class="fab fa-behance"></i></a></li>
                        </ul>
                    </div>

                    <div class="navigation-area blog-author">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-12 nav-left flex-row d-flex justify-content-start align-items-center">
                                <div class="thumb">
                                    <a href="#">
                                        <img class="img-fluid" src="/eden-master/img/blog/prev.jpg" alt=""/>
                                    </a>
                                </div>
                                <div class="arrow">
                                    <a href="#">
                                        <span class="lnr text-white lnr-arrow-left"></span>
                                    </a>
                                </div>
                                <div class="detials">
                                    <p>Prev Post</p>
                                    <a href="#">
                                        <h4>Space The Final Frontier</h4>
                                    </a>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-12 nav-right flex-row d-flex justify-content-end align-items-center">
                                <div class="detials">
                                    <p>Next Post</p>
                                    <a href="#">
                               
                                       
                                    </a>
                                </div>
                                <div class="arrow">
                                    <a href="#">
                                        <span class="lnr text-white lnr-arrow-right"></span>
                                    </a>
                                </div>
                                <div class="thumb">
                                    <a href="#">
                                        <img class="img-fluid" src="/eden-master/img/blog/next.jpg" alt=""/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


        

                <div class="comments-area">
                    <h4>{this.state.craft.comments?.length} comments</h4>

                    <div class="comment-list">
                    
                    {this.state.craft.comments?.length===0 && <div>No Comments for this post.</div> ||

 <div  class="single-comment justify-content-between d-flex" style={{flexDirection:'column'}}>{this.state.craft.comments?.map((comment, i)=>{
  return (
   
                          <div key={i} class="user justify-content-between d-flex" style={{padding:'10px', alignItems:'center'}}>
                               
                                  
                              <div class="desc" >
                                {comment.description}
                                    
                                <div class="d-flex justify-content-between">
                                        <div class="d-flex align-items-center">
                                            <h5>
                                                <a href="#">Commented on</a>
                                           
                                            </h5> 
                                            <p class="date">{comment.createdAt}</p>
                                        </div>
   
                                </div>
                                

                              </div>
    {this.props.user._id===this.state.craft.userId &&
    <button class="main_btn" style={{borderRadius:'5px', height:'5vh'}} onClick={()=>this.deleteComment(comment._id)}>Delete</button>
    }
                          </div>
     
  )

})}    </div>  
}

                </div>
                </div>


{this.props.user._id!==this.state.craft.userId && <div><AddComment theCraft={this.state.craft._id} getTheCraft={this.getSingleCraft} user={this.props.user._id}/></div>
}



            </div>


            <div class="col-lg-4">
                <div class="blog_right_sidebar">
                 

                    <aside class="single_sidebar_widget popular_post_widget">
                        <h3 class="widget_title">Last posts from this user</h3>
                        {this.showUserCraftsSide()}
                 
                    </aside>
                    <aside class="single_sidebar_widget tag_cloud_widget">
                        <h4 class="widget_title">All posts from this users</h4>
                        <ul class="list">
                        {this.showUserCraftsTitles()}
                        </ul>
                    </aside>
                    
                </div>
            </div>
        </div>
    </div>
</section>






        {/* <h1>{this.state.craft.title}</h1>
        <img src={this.state.craft.imageUrl} alt={this.state.craft.title} width="400vw" />
        <p>Description: {this.state.craft.description}</p>

{this.state.craft.steps?.length===0 && <div>No steps provided.</div> ||

        <ul>Steps:{this.state.craft.steps?.map((step, i)=>{
          return (
            <li key={i}>
            {this.props.user._id===this.state.craft.userId && <Link to={`/crafts/${this.state.craft._id}/steps/${step._id}`} craftName={this.state.craft.title}><h3>{step.title}</h3></Link>}
            
            <p>{step.description}</p>
            </li>
          )

        })}

        </ul> 

}
{this.state.craft.comments?.length===0 && <div>No Comments for this post.</div> ||

        <ul>Comments:{this.state.craft.comments?.map((comment, i)=>{
          return (
            <li key={i}>
            {comment.description}
            {this.props.user._id===this.state.craft.userId &&
            <button onClick={()=>this.deleteComment(comment._id)}>Delete</button>
            }

            </li>
          )

        })}
        </ul> 
}

       {this.props.user._id===this.state.craft.userId && <button onClick={this.deleteCraft}>Delete craft</button> }
       { this.props.user._id===this.state.craft.userId && <button onClick={()=>this.setState({ edit: !this.state.edit })}>Edit</button>}
        {this.state.edit && <div>{<EditCraft theCraft={this.state.craft} getTheCraft={this.getSingleCraft} {...this.props}/>}</div>}
        { this.props.user._id===this.state.craft.userId && <div><AddStep theCraft={this.state.craft} getTheCraft={this.getSingleCraft} /> </div>}


        

        
{this.props.user._id!==this.state.craft.userId && <div><AddComment theCraft={this.state.craft._id} getTheCraft={this.getSingleCraft} user={this.props.user._id}/></div>
}
        
        <Link to={"/crafts"}>Back to crafts</Link>

        <a href="https://www.pinterest.com/pin/create/button/" data-pin-do="buttonBookmark">


      
</a> */}


      </div>
    );
  }
}

export default CraftDetails;
