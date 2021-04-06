
import React, { Component } from "react";
import ReactPlayer from 'react-player';



import * as quoterequest from '../../api/pexelsApi'


class GetPhotos extends Component { 
    state = {
        videos:[],
        videoName:'',
        playing:'false'
    }

    

    searchForVideo =(e)=>{
        const {value} = e.target
        this.setState({
          videoName:value
        })
        
      }


      getVideos = (e) =>{
        e.preventDefault()
        
        quoterequest
        .getVideo(this.state.videoName)
        .then((response)=>{
          console.log(response.data.videos)
          this.setState({
            videos:response.data
          })
        })
          e.target.reset()
      
      }


      showAFirstVideo=()=>{
        return this.state.videos.videos?.filter((elem,i)=>i===0)
        .map((each,i)=>{
         
            return (
            
             <div key={each._id} className="col-lg-20">
                    <div className="single-blog video-style">
                        <div className="thumb">
                        <img className="img-fluid" src={each.image} alt=""/>
                            <div className="play_btn">
                                <a className="play-video" href={each.video_files[3].link} dataAnimate="zoomIn"
                                dataDuration="1.5s" dataDelay="0.1s"><span className="ti-control-play"></span></a>
                        
                            </div>
                        </div>
                        <div className="short_details">
                            <div className="meta-top d-flex">
                                <p >{this.state.videoName}</p>
                                
                            </div>
                            <p className="d-block" >
                                <h4>Uploaded by: {each.user.name}</h4>
                            </p>
                            
                        </div>
                    </div> 

                </div> 
  
            )
          }
    
          )



      
        
      }

      showOtherVideos=()=>{
        return this.state.videos.videos?.filter((elem,i)=>i>0 && i<4)
          .map((each,i)=>{
            return (
              <div className="col-lg-5" style={{display:'flex', justifyContent:'center', alignItems:'center'}} >

<div className="single-blog video-style small m_b_30" style={{display:'flex', flexDirection:'row'}}>

    <div  >
        <img src={each.image} alt=''/>
        <div className="play_btn">
            <a className="play-video" href={each.video_files[1].link} data-animate="zoomIn"
            data-duration="1.5s" data-delay="0.1s"><span className="ti-control-play"></span></a>
        </div>
    </div>
    <div  style={{justifyContent:"space-around", alignItems:'center', padding:'7px 30px', backgroundColor:'white'}}>
        <div className="d-flex" >
            <p>{this.state.videoName}</p>
        </div>
        <p className="d-block">
            <h4>{each.user.name}</h4>
        </p>
       
    </div>
</div> 


</div> 

            )


          })
        }

          
     
     
       


       clearVideoSearch =()=>{
        this.setState({
          videos:[]
        })
        }
        

    

        render(){
            return(
                <>
   <section className="banner_area">
      <div className="banner_inner d-flex align-items-center">
        <div className="container">
          <div
            className="banner_content d-md-flex justify-content-center align-items-center"
          >
            <div className="mb-3 mb-md-0">
              <h2>Videos</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
        
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'15vh'}}>
                        <form  onSubmit={this.getVideos}>
                        <div className="input-group " >
                            <input className="form-control"  onChange={this.searchForVideo} name="video" placeholder="inspirational videos" type="text" value={this.state.name}/>
                     <button className="main_btn" style={{borderRadius:'5px', height:'5vh', width:'9vw', marginBottom:'10px'}}>Search</button>
                        </div>
                            
                  
                    </form>

            </div>
                    {this.state.videos.videos?.length > 0 && (
          <button className="main_btn" style={{borderRadius:'5px', height:'5vh', width:'9vw', marginBottom:'10px'}} onClick={this.clearVideoSearch}>Clear</button>
        )}
        
        
         <div className="video-area background_one area-padding">
        <div className="container">

            <div className="row">
                <div className="area-heading">
                    <h3>Inspirational videos</h3>
                    <p>Tell us, what are you interested in?</p>
                </div>
            </div>

            <div style={{display:'flex', width:'100vw'}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
            {this.showAFirstVideo()}
            </div>

            <div style={{display:'flex', flexDirection:'column', alignContent:'center', justifyContent:'center'}}>
            {this.showOtherVideos()}
            </div>
      
            </div>
        </div>
    </div>
        
        
                </>
        
            )
        }


}

export default GetPhotos