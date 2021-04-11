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
    userCrafts:[],
    craftId: this.props.match.params.id
  
  };
  
  componentDidMount() {
        this.getSingleCraft();
        this.getAllCrafts();
       
        
  }
  

getSingleCraft = ()=>{
  service
    .showCraftDetails(this.state.craftId)
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


turnDate = (string)=>{
  let monthNumberToLabelMap = [
    'January','February','March','April','May','June','July', 'August', 'September', 'October', 'November', 'December'
  ]
  let month=monthNumberToLabelMap.filter((each,i)=>i==Number(string.split('T')[0].split('-')[1])-1)
  let day=Number(string.split('T')[0].split('-')[2])
  let year=Number(string.split('T')[0].split('-')[0])
  return `${month} ${day}, ${year}`
  }


    showUserCraftsTitles = ()=>{
      return [...this.state.userCrafts].filter(each=>each.userId==this.state.craft.userId)
      .map(each=>{
    
        return (
          <li key={each._id}>
          <Link to={`/crafts/${each._id}`}>{each.title}</Link>
        </li>
          )
        })
      }
      
      showUserCraftsSide = ()=>{
        return [...this.state.userCrafts]
        .reverse()
        .filter(each=>each.userId==this.state.craft.userId)
        .filter((each,i)=>i<4)
      
      .map(each=>{
        return (
                    <div key={each._id} className="media post_item">
                            <img src={each.imageUrl} alt="post" width='100vw'/>
                            <div className="media-body">
                                <a href="single-blog.html">
                                    <h3><Link to={`/crafts/${each._id}`}>{each.title}</Link></h3>
                                </a>
                                <p>{this.turnDate(each.createdAt)}</p>

                    
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


    
    
    render() {

      return (
        <div>
     

<section className="banner_area">
      <div className="banner_inner d-flex align-items-center">
        <div className="container">
          <div
            className="banner_content d-md-flex justify-content-center align-items-center"
          >
            <div className="mb-3 mb-md-0">
              <h2>Craft Details</h2>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="blog_area single-post-area area-padding">
    <div className="container">
        <div className="row">
            <div className="col-lg-8 posts-list">
                <div className="single-post">
                    <div className="feature-img">
                        <img className="img-fluid" src={this.state.craft.imageUrl} alt={this.state.craft.title}/>
                    </div>

                    <div className="blog_details">
                        <h2>{this.state.craft.title}</h2> 
                        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                        <ul className="blog-info-link mt-4 mb-4">
                            <li><i className="far fa-clock"></i> {this.turnDate(String(this.state.craft.createdAt))}</li>
                       
                            <li><i className="far fa-comments"></i>{this.state.craft.comments?.length}</li>
                        </ul>
                        <div style={{width:'15vw', display:'flex', justifyContent:'space-between'}}>

                        {this.props.user._id===this.state.craft.userId && 
                        <>
                             <button className="main_btn" style={{borderRadius:'5px', height:'5vh', width:'7vw', marginBottom:'10px'}} onClick={this.deleteCraft}>Delete</button>
                             <button className="main_btn" style={{borderRadius:'5px', height:'5vh', marginBottom:'10px', width:'7vw'}} onClick={()=>this.setState({ edit: !this.state.edit })}>Edit</button>
                        </>
                         }

                        
                        </div>

                        </div>
                  
                        <p className="excert">
                        <h4>Description:</h4>
                            {this.state.craft.description}
                        </p>
                         {this.state.edit && <div>{<EditCraft theCraft={this.state.craft} getTheCraft={this.getSingleCraft} {...this.props}/>}</div>}
                        <div className="quote-wrapper" >
                            <ol className="quotes" style={{display:'flex', flexDirection:'column', alignItems:'flex-center'}}>
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
                <div className="navigation-top">
                    <div className="d-sm-flex justify-content-between text-center">
                      
                        <div className="col-sm-2 my-sm-0">
                            <p className="comment-count"><i className="far fa-comment"></i>{this.state.craft.comments?.length}</p>
                        </div>
                        <ul className="social-icons">
                            <li><a href="https://www.pinterest.com/"><i className="fab fa-pinterest"></i></a></li>
                            <li><a href="https://www.etsy.com/"><i className="fab fa-etsy"></i></a></li>
                            <li><a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a></li>
                            <li><a href="https://www.facebook.com/"><i className="fab fa-facebook"></i></a></li>
                        </ul>
                    </div>
                </div>


        

                <div className="comments-area">
                    <h4>{this.state.craft.comments?.length} comments</h4>

                    <div className="comment-list">
                    
                    {this.state.craft.comments?.length===0 && <div>No Comments for this post.</div> ||

 <div  className="single-comment justify-content-between d-flex" style={{flexDirection:'column'}}>{this.state.craft.comments?.map((comment, i)=>{
  return (
   
                          <div key={i} className="user justify-content-between d-flex" style={{padding:'10px', alignItems:'center'}}>
                               
                                  
                              <div className="desc" >
                                {comment.description}
                                    
                                <div className="d-flex justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <h5>
                                                <a href="#">Commented on</a>
                                           
                                            </h5> 
                                            <p className="date">{this.turnDate(comment.createdAt)}</p>
                                        </div>
   
                                </div>
                                

                              </div>
    {this.props.user._id===this.state.craft.userId &&
    <button className="main_btn" style={{borderRadius:'5px', height:'5vh'}} onClick={()=>this.deleteComment(comment._id)}>Delete</button>
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



      </div>
    );
  }
}

export default CraftDetails;
