import React, { Component } from "react";
import {Link} from 'react-router-dom';
import * as service from "../api/service";
import * as apirequest from "../api/predicthqApi";
import * as pexelsApi from "../api/pexelsApi"



class Profile extends Component {
  state = {
    crafts: [],
    events:[],
    bestCrafts:[],
    curatedPhotos:[]
  }

  logOut = () => {

    localStorage.removeItem("token");
    this.props.setUser({});
    this.props.history.push('/')
    return !this.props.user._id
  };

  componentDidMount() {
    console.log(this.crafts)
    
    service
    .getMyCrafts()
    .then((res) => {
      this.setState({ crafts: res.data });
    });

    service
    .showRandomCrafts()
    .then((response)=>{
     this.setState({
         bestCrafts:response.data
     })
    });

      pexelsApi
  .getCuratedPhotos()
  .then(response=>{
    console.log(response.data.photos.filter((elem, index)=>index<6))
    this.setState({
      curatedPhotos: response.data.photos.filter((elem, index)=>index<6)

    })
})

}

 place=''
 event=''

search = (e) =>{

if(e.target.name==='place'){
  this.place = e.target.value
}
if(e.target.name==='event'){
  this.event = e.target.value
}


  }


showSearchResultsForEvent = ()=>{

 

    return this.state.events.map(each=>{
    
        return (
    
      
           
                            <li key={each.id} class="nav-item submenu dropdown">
                          
                                 <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{each.title}</a>
                                 <p>{each.start}</p> 
                                
                             
                                <ul class="dropdown-menu">
                                    <li class="nav-item"><a class="nav-link" href="blog.html">Category: {each.category}</a></li>
                                     {each.entities.length>0 &&
                                     <li class="nav-item"><a class="nav-link" href="single-blog.html">Address: {each.entities[0].formatted_address} - {each.entities[0].name}</a></li>
                                     || <li class="nav-item"><a class="nav-link" href="single-blog.html">No address provided.</a></li>
                                     }
                                    
                                </ul>
                            
                            </li>

   
        )
    })

  
}

getEvent = (e)=>{
  e.preventDefault()
 
apirequest
.getEventByPlace(this.place, this.event)
.then(res=>{
    console.log(res.data.results)
    this.setState({
        events: res.data.results
    })
})
e.target.reset()
}


deleteCraft = (id) => {

        service
        .deleteCraft(id)
        .then(()=>{
          let newList = [...this.state.crafts].filter(each=>each._id!==id)
          this.setState({
            crafts:newList
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

          turnMonth = (string)=>{
            let monthNumberToLabelMap = [
              'January','February','March','April','May','June','July', 'August', 'September', 'October', 'November', 'December'
            ]
           
            let month=monthNumberToLabelMap.filter((each,i)=>i==Number(string.split('T')[0].split('-')[1])-1)
       
            return month
            }


showMyCrafts = () => {
  return this.state.crafts.map((each) => {
      return (
          <>      
    

        <div class="blog_item_img">
                          <img class="card-img rounded-0" src={each.imageUrl} alt=""/>
                          <a href="#" class="blog_item_date">
                            <h3>{each.createdAt.split('T')[0].split('-')[2]}</h3>
                            <p>{this.turnMonth(each.createdAt)}</p>
                            </a>
                        </div>
                        
                        <div class="blog_details">
                            <a class="d-inline-block" href="single-blog.html">
                                <Link to={`/crafts/${each._id}`}><h2 key={each._id}>{each.title}</h2></Link>
                            </a>
                            <p>{each.description}</p>
                            <ul class="blog-info-link">
                              <li><a href="#"><i class="far fa-comments"></i> {each.comments.length}</a></li>
                              <li><button  onClick={()=>this.deleteCraft(each._id)} class="main_btn" style={{borderRadius:'5px'}}>Delete</button></li>
                            </ul>    
                            
                        </div>


        </>
      )
  });
};




allMyPosts = ()=>{
  return this.state.crafts.map(each=>{
    return (
    <li key={each._id}>
    <Link to={`/crafts/${each._id}`}>{each.title}</Link>
  </li>

    )
  })
}


clearEventSearch =()=>{
  this.setState({
    events:[]
  })
  }


showBestCrafts =()=>{
  
  return this.state.bestCrafts
  .sort((a,b)=>b.comments.length-a.comments.length)
  .filter((each, index)=>index<4)
  .map(each=>{
    return (
      <div class="media post_item">
                              <img src={each.imageUrl} width='100vw' alt="post"/>
                              <div class="media-body">
                                  <a href="single-blog.html">
                                  <Link to={`/crafts/${each._id}`}><h3 key={each._id}>{each.title}</h3></Link>
                                  </a>
                                  <p>{this.turnDate(each.createdAt)}</p>
                              </div>
                          </div>
    )
  })
}



 showCuratedPhotos = ()=>{ 
    console.log(this.state.curatedPhotos)
   return this.state.curatedPhotos.map(each=>{
     return (
      <li key={each.id} >
      <p >
        <Link to='/photos'><img class="img-fluid" src={each.src.original}  alt=""/></Link>
      </p>
     </li>

     )
   })
 }


  render() {
  
    return (
      <div>
<section class="banner_area">
      <div class="banner_inner d-flex align-items-center">
        <div class="container">
          <div
            class="banner_content d-md-flex justify-content-center align-items-center"
          >
            <div class="mb-3 mb-md-0">
              <h2>Your profile</h2>
            </div>
          </div>
        </div>
      </div>
    </section>



<div class="col-12 " style={{display:'flex', justifyContent:'center', alignItems:'center', height:'10vh'}}>
                    <button class="main_btn" onClick={this.logOut}>Log out <span class="ti-angle-double-right"></span></button>
    </div>
           



    <section class="blog_area ">
 


      <div class="container">
          <div class="row">
              <div class="col-lg-8 mb-5 mb-lg-0">
                  <div class="blog_left_sidebar">


                      <article class="blog_item">
                      {localStorage.token && this.showMyCrafts()}

                      </article>
                 
                    
                      


                      <nav class="blog-pagination justify-content-center d-flex">
                          <ul class="pagination">
                              <li class="page-item">
                                  <a href="#" class="page-link" aria-label="Previous">
                                      <i class="ti-angle-left"></i>
                                  </a>
                              </li>
                              <li class="page-item">
                                  <a href="#" class="page-link">1</a>
                              </li>
                              <li class="page-item active">
                                  <a href="#" class="page-link">2</a>
                              </li>
                              <li class="page-item">
                                  <a href="#" class="page-link" aria-label="Next">
                                      <i class="ti-angle-right"></i>
                                  </a>
                              </li>
                          </ul>
                      </nav>

                  </div>
              </div>
              <div class="col-lg-4">
                  <div class="blog_right_sidebar">
                      <aside class="single_sidebar_widget search_widget">

                     

                          <form onSubmit={this.getEvent}>
                            <div class="form-group">
                              <div class="input-group mb-3">
                                <input onChange={this.search} type="text" class="form-control" placeholder="place" name="place"/>
                                <input onChange={this.search} type="text" class="form-control" placeholder="event" name="event"/>
                                <div class="input-group-append">
                                  <button class="btn" type="button"><i class="ti-search"></i></button>
                                </div>
                              </div>
                            </div>
                            <button class="button rounded-0 primary-bg text-white w-100" type="submit">Search</button>
                          </form>

                    


                      </aside>

                      <aside class="single_sidebar_widget post_category_widget">

                        {this.state.events.length>0 &&
     <button onClick={this.clearEventSearch} class="main_btn" style={{borderRadius:'5px'}}>Clear search</button>
}
                        <h4 class="widget_title">Events</h4>
                        <ul class="list cat-list">
                            {this.showSearchResultsForEvent()}
                        </ul>
                      </aside>

                      <aside class="single_sidebar_widget popular_post_widget">
                          <h3 class="widget_title">Posts with most comments:</h3>
                                {this.showBestCrafts()}

                          
                   
                      </aside>
                      <aside class="single_sidebar_widget tag_cloud_widget">
                          <h4 class="widget_title">All your posts</h4>
                          <ul class="list">
                          {this.allMyPosts()}
                              
                              
                          </ul>
                      </aside>


                      <aside class="single_sidebar_widget instagram_feeds">
                        <h4 class="widget_title">Inspirational photograpy:</h4>
                       
                        <ul class="instagram_row flex-wrap">
                        {this.showCuratedPhotos()}
                           
                            
                        </ul>
                      </aside>


                      
                  </div>
              </div>
          </div>
      </div>
  </section>




        {/* Profile
        <br />
        
        
       

        <br></br>

<form onSubmit={this.getEvent}>

        <input
          onChange={this.search}
          name="place"
          placeholder="place"
          type="text"
        />

       <input
          onChange={this.search}
          name="event"
          placeholder="event"
          type="text"
        />   

<button>Search</button>
</form>

{this.state.events.length>0 &&
     <button onClick={this.clearEventSearch}>Clear</button>
}
        <div>
     {this.showSearchResultsForEvent()}
       </div> 

 */}


      
    



       




      </div>
    );
  }
}
export default Profile;
