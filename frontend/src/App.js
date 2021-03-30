
import './App.css';

import React from 'react';
import {Switch, Link, Route} from 'react-router-dom';

import * as service from '../src/api/service';

import AddCraft from './components/AddCraft';
import AllCrafts from './components/AllCrafts';
import CraftDetails from './components/CraftDetails';
import EditCraft from './components/EditCraft';
import StepDetails from './components/steps/StepDetails';
import Auth from './components/auth/Auth';
import Profile from './components/Profile'
import AddComment from './components/comments/AddComment';
import RandomCrafts from './components/RandomCrafts';
import GetPhotos from './components/photos/getPhotos'
import GetVideos from './components/photos/getVideos'


class App extends React.Component {

state = {
  user: {}
}


componentDidMount(){
  service.getUser()
  .then((user)=>{
    this.setState({user})
  })
}

setUser = (user) =>{
  this.setState({user})
}

  render(){
    return (
      <div className="App">
    <section className="header-top">
        <div className="container">
            <div className="row align-items-center justify-content-between">
                <div className="col-6 col-lg-4">
                    <div className="float-left">
                    <ul class="header_social">
                            <li><a href="https://www.facebook.com/"><i class="ti-facebook"></i></a></li>
                            <li><a href="https://twitter.com/?lang=en"><i class="ti-twitter"></i></a></li>
                            <li><a href="https://www.instagram.com/"><i class="ti-instagram"></i></a></li>
                            <li><a href="https://www.skype.com/en/"><i class="ti-skype"></i></a></li>
                            <li><a href="https://vimeo.com/"><i class="ti-vimeo"></i></a></li>
                        </ul>   
                    </div>
                </div>
                <div className="col-6 col-lg-4 col-md-6 col-sm-6 logo-wrapper">
                    <a href="index.html" className="logo"/>
                        <p style={{fontSize:'7vh', fontFamily: "Bradley Hand"}}>Creative<span style={{color:'#FF8888'}}>N</span>ess</p>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6 search-trigger">
                    <div className="right-button">
                        <ul>
                  
                        {this.state.user?.email && <li>Hello, {this.state.user?.email}</li> ||
                        <li>You are not logged in.</li>
                        }
                        
              
                        </ul>
                    </div>
                </div>
            </div>
        </div>
       
    </section>

  
    <header id="header" className="header_area">
        <div className="main_menu">
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                  
                    <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
                        <ul className="nav navbar-nav menu_nav ml-auto mr-auto">
                            <li className="nav-item active"><Link className="nav-link" to="/crafts">All Crafts</Link></li> 
                            <li className="nav-item"><Link className="nav-link" to="/crafts/create">Post Craft</Link></li> <li class="nav-item submenu dropdown">
                                <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Inspo</a>
                                <ul class="dropdown-menu">
                                    <li class="nav-item"><Link to='/photos' class="nav-link" >Photos</Link></li>
                                    <li class="nav-item"><Link  to='/videos' class="nav-link" >Videos</Link></li>
                                </ul>
                            </li>


                            {this.state.user?.email &&  <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li> 
                            ||  <li className="nav-item"><Link className="nav-link" to="/auth">Log in</Link></li>}
                                



                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </header>

    


    

  

      <Switch>
        <Route exact path='/crafts' render={(props)=><AllCrafts user={this.state.user} {...props}/>}/>
        <Route exact path='/crafts' render={(props)=><RandomCrafts user={this.state.user} {...props}/>}/>
        <Route exact path='/crafts/create' render={(props)=><AddCraft user={this.state.user} {...props}/>}/>
        <Route exact path='/crafts/:id/edit' render={(props)=> <EditCraft {...props}/>}/>
        <Route exact path='/crafts/:id' render={(props)=><CraftDetails user={this.state.user} {...props}/>}/>

        <Route exact path="/crafts/:id/steps/:stepId" render={(props)=><StepDetails user={this.state.user} {...props}/>}/>
        <Route exact path="/auth" render={(props)=><Auth setUser={this.setUser} user={this.state.user} {...props}/>}/>
        <Route exact path="/profile" render={(props)=><Profile setUser={this.setUser} user={this.state.user} {...props}/>}/>
        <Route exact path="/comments" render={(props)=><AddComment {...props} />}/>
        <Route exact path="/photos" render={(props)=><GetPhotos {...props}/>}/>
        <Route exact path="/videos" render={(props)=><GetVideos {...props} />}/>
      </Switch>

{!this.state.user?.email && <RandomCrafts/>}


      </div>





    );
  }
}

export default App;
