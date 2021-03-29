
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


      showAllVideos=()=>{
  
        return  this.state.videos.videos?.map(each=>{
           return (
             <div key={each._id}>
             <h3>{each.user.name}</h3>
             <ReactPlayer url={each.video_files[1].link}  controls
             />
             
    
    
             </div>
             )
           })
      
     
       }


       clearVideoSearch =()=>{
        this.setState({
          videos:[]
        })
        }
        

        play() {
            this.player.play();
          }

        render(){
            return(
                <>
        <form onSubmit={this.getVideos}>
        <input
                  onChange={this.searchForVideo}
                  name="video"
                  placeholder="inspirational video"
                  type="text"
                  value={this.state.name}
                />
        <button>Search</button>
        
        </form>
        {this.state.videos.videos?.length>0 &&
         <button onClick={this.clearVideoSearch}>Clear</button>
        }
        
         <div>{this.showAllVideos()}
         </div>
        
        
        
        
                </>
        
            )
        }


}

export default GetPhotos