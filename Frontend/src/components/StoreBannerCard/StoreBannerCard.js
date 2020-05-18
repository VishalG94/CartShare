import React from "react";
import "./BannerCard-styles.css";
import image from "../../images/stores.png"
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container
} from 'reactstrap';
// import Button from 'react-bootstrap/Button'
import axios from 'axios'
import ROOT_URL from '../../constants.js'
import { Link } from 'react-router-dom'

let deleteStore = e => {
  e.preventDefault()
  // alert("Inside Delete")
  // prevent page from refresh
  let data = JSON.parse(e.target.id)
  alert(JSON.stringify(data.id));
  axios.defaults.withCredentials = true
  axios.delete(`${ROOT_URL}/deletestore/${data.id}`, { params: '' }).then(response => {
    console.log('Axios post:', response.data);
    window.location.reload(true)
  }).catch(error => {
    console.log(error);
  });


}


const StoreBannerCard = (bannerDetails) => {

  var deletebutton = null;
  // var editbutton = null;

  if (localStorage.getItem('role') != '"User"') {
    deletebutton = (<button type="submit" class="btn btn-link" id={JSON.stringify(bannerDetails)} onClick={deleteStore} style={{ float: "right" }} >
      <i id={JSON.stringify(bannerDetails)} style={{ color: 'red' }} class="far fa-trash-alt"></i>
    </button>
    )
    
  }


  // if(sessionStorage.getItem('')!=null){
  //   <Link to = {`/products/` + bannerDetails.id}></Link>
  // }

  var adminlink = null;
  if (sessionStorage.getItem('storedetails') != null) {
    adminlink = (
      <Link to={`/products/` + bannerDetails.id} style={{ color: "black" }}>
        <div class="col-sm-3" >
          <div class="card" style={{ width: "13rem", backgroundColor: "#F8F8F8" }}>
            <img class="card-img-top" style={{ width: "13rem", height: '12rem' }} src={image} alt="Card image cap" />
            <br></br>
            <br />
            <div class="card-body">
              <h5 class="card-title">&nbsp;&nbsp;&nbsp;&nbsp;{bannerDetails.name}<span class="card-text" style={{ fontSize: "15px", float: "right" }}>{deletebutton}
                <br></br></span></h5>
              {/* <p class="card-text" style={{fontSize:"15px", margin:"20px"}}> */}

              {/* <a href="#" class="btn btn-link" style={{color:"red"}}> &nbsp;Delete</a> */}

              {/* </p> */}
            </div>
          </div>
        </div>
      </Link>
    )

  } else {
    adminlink = (<Link to={`/searchproducts/` + bannerDetails.id} style={{ color: "black" }}>
      <div class="col-sm-3" >
        <div class="card" style={{ width: "13rem", backgroundColor: "#F8F8F8" }}>
          <img class="card-img-top" style={{ width: "13rem", height: '12rem' }} src={image} alt="Card image cap" />
          <br></br>
          <br />
          <div class="card-body">
            <h5 class="card-title">&nbsp;&nbsp;&nbsp;&nbsp;{bannerDetails.name}<span class="card-text" style={{ fontSize: "15px", float: "right" }}>{deletebutton}
              <br></br></span></h5>
            {/* <p class="card-text" style={{fontSize:"15px", margin:"20px"}}> */}

            {/* <a href="#" class="btn btn-link" style={{color:"red"}}> &nbsp;Delete</a> */}

            {/* </p> */}
          </div>
        </div>
      </div>
    </Link>
    )
  }



  return (
    // <Link to = {`/searchproducts/` + bannerDetails.id}>
    // <div class="col-sm-3" >
    //   <div class="card" style={{width:"13rem",backgroundColor:"#F8F8F8"}}>
    //     <img class="card-img-top" style={{width:"12rem", height:'9rem'}} src={image} alt="Card image cap"/>
    //     <hr/>
    //     <div class="card-body">
    //     <h5 class="card-title">&nbsp;&nbsp;&nbsp;&nbsp;{bannerDetails.name}<span class="card-text" style={{fontSize:"15px", float:"right"}}>{deletebutton}
    //           <br></br></span></h5>
    //       {/* <p class="card-text" style={{fontSize:"15px", margin:"20px"}}> */}

    //           {/* <a href="#" class="btn btn-link" style={{color:"red"}}> &nbsp;Delete</a> */}

    //       {/* </p> */}
    //     </div>
    //   </div>
    // </div>
    // </Link>

    <div>{adminlink}</div>
  );
};

export default StoreBannerCard;