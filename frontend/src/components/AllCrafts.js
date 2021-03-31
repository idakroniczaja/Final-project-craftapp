import React from "react";
import { Link } from "react-router-dom";
import * as service from "../api/service";

class AllCrafts extends React.Component {
  state = {
    crafts: [],
  };

  componentDidMount() {
    service.showAllCrafts().then((res) => {
      this.setState({
        crafts: res,
      });
    });
  }

  showAll = () => {
    

    return this.state.crafts.map((each) => {
      return (
        // <li key={each._id}>
        //   <Link to={`/crafts/${each._id}`}>{each.title}</Link>
        //   <img src={each.imageUrl} alt={each.title} width="200vw" />
        //   <p>{each.comments.length}</p>
        // </li>


    //     <div class="col-md-6 col-xl-4 single-blog" style={{padding:'20px'}}>
    //     <div class="single-category">
    //         <div class="thumb">
    //             <img class="img-fluid" src={each.imageUrl} alt=""/>
    //         </div>
    //         <div class="short_details" style={{boxShadow:'5px 10px #FF8888 ', height:'20vh'}}>
    //             <div class="meta-top d-flex">
    //           {each.title}
    //                 <p> {each.createdAt}</p>
    //             </div>
    //             <a class="d-block" href="single-blog.html">
    //             <Link to={`/crafts/${each._id}`}><h4>{each.title.split('')[0].toUpperCase()+each.title.slice(1)}</h4></Link>
    //             </a>
    //             <div class="meta-bottom d-flex">
    //                 <p><i class="ti-comment"></i>{each.comments.length}</p>
                
    //             </div>
    //         </div>
    //     </div> 
    // </div>

    <div key={each._id} className='gridBox single-blog'>


<Link to={`/crafts/${each._id}`}><img className='img-fluid' src={each.imageUrl} style={{borderRadius:'5px'}}/></Link>
    
    <h3 style={{marginTop:'4vh', color:'gray'}}>{each.title.split('')[0].toUpperCase()+each.title.slice(1)}</h3>

      <p class="ti-comment">   {each.comments.length}</p>
      </div>

      );
    });
  };

  search = (e) => {
    let filteredList = [...this.state.crafts].filter((craft) =>
      craft.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    this.setState({
      crafts: filteredList,
    });
  };

  render() {
    return (
      <>
        <section className="banner_area" >
          <div className="banner_inner d-flex align-items-center" >
            <div className="container">
              <div className="banner_content d-md-flex justify-content-center">
                <div className="mb-3 mb-md-0" >
                  <h2>All posted crafts</h2>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="category-page ">
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'15vh'}}>
                        <form  onSubmit={this.showFiltered}>
                        <div className="input-group " >
                            <input className="form-control"  onChange={this.search} name="title" placeholder="search" type="text"/>
                            <div className="input-group-append">
                                <button className="btn click-btn" onClick={(e) => e.target.reset}>
                                    <i className="fas fa-sync-alt"></i>
                                    
                                </button>
                            </div>
                        </div>
                    </form>
            </div>

        </section>
         
            <div className="gridContainer" >
                {this.showAll()}
              
            </div>

   

       
          

        {/* <form onSubmit={this.showFiltered}>
          <input
            onChange={this.search}
            name="title"
            placeholder="search"
            type="text"
          />

          <button onClick={(e) => e.target.reset}>Clear search</button>
        </form> */}
      </>
    );
  }
}

export default AllCrafts;
