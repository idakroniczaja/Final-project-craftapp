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
       

    <div key={each._id} className='gridBox single-blog'>


<Link to={`/crafts/${each._id}`}><img className='img-fluid' src={each.imageUrl} style={{borderRadius:'5px'}}/></Link>
    
    <h3 style={{marginTop:'4vh', color:'gray'}}>{each.title.split('')[0].toUpperCase()+each.title.slice(1)}</h3>

      <p className="ti-comment">   {each.comments.length}</p>
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

      </>
    );
  }
}

export default AllCrafts;
