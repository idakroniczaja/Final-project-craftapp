import React, { Component } from "react";
import {Link} from 'react-router-dom';
import * as service from "../api/service";
import * as apirequest from "../api/predicthqApi";
import * as pexelsApi from "../api/pexelsApi"
import ShowAll from "./ShowAll";




class Profile extends Component {
  state = {
    crafts: [],
    events:[],
    bestCrafts:[],
    curatedPhotos:[],
    clicked:'false'
  }

  logOut = () => {

    localStorage.removeItem("token");
    this.props.setUser({});
    this.props.history.push('/')
    return !this.props.user._id
  };

  componentDidMount() {
  
    service
    .getMyCrafts()
    .then((res) => {
      this.setState({ crafts: res.data.reverse()});
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
    
    this.setState({

      curatedPhotos: response.data.photos.sort(() => Math.random() - Math.random()).slice(0, 6)

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
                            
                                 <h4 className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{each.title}</h4>
                                 <p>{this.turnDate(each.start)}</p> 
                                 <p>Category: {each.category}</p>
                                 
                                 {each.entities.length>0 &&
                                 <p>Address: {each.entities[0].formatted_address} - {each.entities[0].name}</p>
                                 || <p>No address provided.</p>
                                 }
                             
                                <ul className="dropdown-menu">
                                    <li className="nav-item">Category: {each.description}</li>
                                     
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


showMyFirstThreeCrafts = () => {
  return this.state.crafts
  .filter((elem, i)=>i<3)
  .map((each) => {
      return (
          <>      
        <div className="blog_item_img">
                          <img className="card-img rounded-0" src={each.imageUrl} alt=""/>
                          <a href="#" className="blog_item_date">
                            <h3>{each.createdAt.split('T')[0].split('-')[2]}</h3>
                            <p>{this.turnMonth(each.createdAt)}</p>
                            </a>
                        </div>
                        
                        <div className="blog_details">
                            <a className="d-inline-block" >
                                <Link to={`/crafts/${each._id}`}><h2 key={each._id}>{each.title}</h2></Link>
                            </a>
                            <p>{each.description}</p>
                            <ul className="blog-info-link">
                              <li><a href="#"><i class="far fa-comments"></i> {each.comments.length}</a></li>
                              <li><button  onClick={()=>this.deleteCraft(each._id)} class="main_btn" style={{borderRadius:'5px'}}>Delete</button></li>
                            </ul>    
                            
                        </div>

        </>
      )
  });
};


showMyCraftsBottom = () => {
  return this.state.crafts
  .map((each) => {
      return (
        <div className="gridBox blog_details single-blog" id='profilePosts'>
    
                          <img  src={each.imageUrl} alt=""/>
                            <p style={{paddingTop:'5vh'}}>Posted on {this.turnMonth(each.createdAt)}</p>
                            <h3>{each.createdAt.split('T')[0].split('-')[2]}</h3>
                          
                        <div >
                        <a className="d-inline-block" href="single-blog.html">
                                <Link   to={`/crafts/${each._id}`}><h2 key={each._id}>{each.title}</h2></Link>
                            </a>
                            <p className='text'>{each.description}</p>
                            <ul className="blog-info-link" style={{display:'flex', justifyContent:'space-between'}}>
                              <li><i className="far fa-comments"></i> {each.comments.length}</li>
                              <li><button  onClick={()=>this.deleteCraft(each._id)} class="main_btn" style={{borderRadius:'5px'}}>Delete</button></li>
                            </ul>    
                            
                          </div>
            </div>
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
      <div className="media post_item">
                              <img src={each.imageUrl} width='100vw' alt="post"/>
                              <div className="media-body">
                                  
                                  <Link to={`/crafts/${each._id}`}><h3 key={each._id}>{each.title}</h3></Link>
                                  <p><i className="far fa-comments"></i>{each.comments.length}</p>
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
      <li key={each.id} className='gridBox'>
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
<section className="banner_area">
      <div className="banner_inner d-flex align-items-center">
        <div className="container">
          <div
            className="banner_content d-md-flex justify-content-center align-items-center"
          >
            <div className="mb-3 mb-md-0">
              <h2>Your profile</h2>
            </div>
          </div>
        </div>
      </div>
    </section>



<div className="col-12 " style={{display:'flex', justifyContent:'center', alignItems:'center', height:'10vh'}}>
                    <button class="main_btn" onClick={this.logOut}>Log out <span class="ti-angle-double-right"></span></button>
    </div>
           



    <section class="blog_area ">
 


      <div className="container">
          <div className="row">
              <div className="col-lg-8 mb-5 mb-lg-0">
                  <div className="blog_left_sidebar">


                      <article className="blog_item">
                     {this.showMyFirstThreeCrafts()}

                      </article>
                 
              

                  </div>
              </div>
              <div className="col-lg-4">
                  <div className="blog_right_sidebar">
                      <aside className="single_sidebar_widget search_widget">

                     

                          <form onSubmit={this.getEvent}>
                            <div className="form-group">
                              <div className="input-group mb-3">
                                <input onChange={this.search} type="text" className="form-control" placeholder="place" name="place"/>
                                <input onChange={this.search} type="text" className="form-control" placeholder="event" name="event"/>
                                <div className="input-group-append">
                                  <button className="btn" type="button"><i className="ti-search"></i></button>
                                </div>
                              </div>
                            </div>
                            <button className="button rounded-0 primary-bg text-white w-100" type="submit">Search</button>
                          </form>

                    


                      </aside>

                      <aside className="single_sidebar_widget post_category_widget">

                        {this.state.events.length>0 &&
                        <>
                           <button onClick={this.clearEventSearch} className="main_btn" style={{borderRadius:'5px', marginBottom:'2vw'}}>Clear search</button>
                           <h4 className="widget_title">We found {this.state.events.length} {this.event.toUpperCase()} events in {this.place.includes(' ') &&
                           this.place.split(' ').map(each=>each.charAt(0).toUpperCase()+each.slice(1)).join(' ')
                           ||
                             this.place.split('')[0].toUpperCase()+this.place.slice(1)} for this month</h4>
                        </> ||
                        <h4 className="widget_title">Next month events</h4>
}
                        
                        <ul className="list cat-list">
                            {this.showSearchResultsForEvent()}
                        </ul>
                         
                      </aside>

                      <aside className="single_sidebar_widget popular_post_widget">
                          <h3 className="widget_title">Posts with most comments:</h3>
                                {this.showBestCrafts()}

                          
                   
                      </aside>
                      <aside className="single_sidebar_widget tag_cloud_widget">
                          <h4 className="widget_title">You have {this.state.crafts.length} posts</h4>
                          <ul className="list">
                          {this.allMyPosts()}
                              
                              
                          </ul>
                      </aside>


                      <aside className="single_sidebar_widget instagram_feeds">
                        <h4 className="widget_title">Inspirational photograpy:</h4>
                       
                        <ul className="instagram_row flex-wrap ">
                        {this.showCuratedPhotos()}
                           
                            
                        </ul>
                      </aside>


                      
                  </div>
              </div>
          </div>
      <nav style={{margin:'0'}} className="blog-pagination justify-content-center d-flex">
                          <ul className="pagination">
                        <ShowAll showNext={this.showMyCraftsBottom} />
                          </ul>
                      </nav>
      </div>
  </section>

      </div>
    );
  }
}
export default Profile;
