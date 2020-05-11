import React from "react";
import "./BannerCard-styles.css";
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container
} from 'reactstrap';
// import Button from 'react-bootstrap/Button'
import axios from 'axios'
import ROOT_URL from '../../constants.js'
import image from '../../images/store.png'

let deleteStore = e => {
  e.preventDefault()
  // alert("Inside Delete")
  // prevent page from refresh
  let data =  JSON.parse(e.target.id)
  alert(JSON.stringify(data.id));
  axios.defaults.withCredentials = true
  axios.delete(`${ROOT_URL}/deletestore/${data.id}`,  {params: ''}).then(response => {
    console.log('Axios post:', response.data);
    window.location.reload(true)
  }).catch(error => {
    console.log(error);
  });
  
  
}

const SearchCard = ( bannerDetails ) => {
  return (
    <a style ={{color:"black"}} href={`/search/` + bannerDetails.id}>
    <div class="col-sm-3" >
      <div class="card" style={{width:"13rem",backgroundColor:"#F8F8F8"}}>
        <img class="card-img-top" style={{width:"13rem", height:'9rem'}} src={image} alt="Card image cap"/>
        <br></br>
        <br/>
        <div class="card-body">
          <div style={{textAlign:"center"}}>
        <h5 class="card-title">{bannerDetails.name}</h5>
        </div>
          {/* <p class="card-text" style={{fontSize:"15px", margin:"20px"}}> */}
          
              {/* <a href="#" class="btn btn-link" style={{color:"red"}}> &nbsp;Delete</a> */}
              
          {/* </p> */}
        </div>
      </div>
    </div>
    </a>
      
  );
};

export default SearchCard;