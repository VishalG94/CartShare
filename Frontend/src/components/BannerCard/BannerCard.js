import React from "react";
import "./BannerCard-styles.css";
import image from "../../images/Avatar.png"
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container
} from 'reactstrap';
// import Button from 'react-bootstrap/Button'
import axios from 'axios'
import ROOT_URL from '../../constants.js'
let deleteProduct = e => {
  e.preventDefault()
  // alert("Inside Delete")
  // prevent page from refresh
  let data =  JSON.parse(e.target.id)
  alert(JSON.stringify(data.id));
  axios.defaults.withCredentials = true
  axios.delete(`${ROOT_URL}/deleteproductbyid/${data.id.storeId}/${data.id.sku}`,  {params: ''}).then(response => {
    console.log('Axios post:', response.data);
    window.location.reload(true)
  }).catch(error => {
    console.log(error);
  });
  
  
}
const BannerCard = ( bannerDetails ) => {
  return (
    <div class="col-sm-3" >
      <div class="card" style={{width:"13rem",backgroundColor:"#F8F8F8"}}>
        <img class="card-img-top" style={{width:"12rem", height:'9rem'}} src={image} alt="Card image cap"/>
        <hr/>
        <div class="card-body">
        <h5 class="card-title">&nbsp;&nbsp;&nbsp;&nbsp;{bannerDetails.name}<span class="card-text" style={{fontSize:"15px", float:"right"}}>${bannerDetails.price}&nbsp;&nbsp;&nbsp;&nbsp;</span></h5>
          <p class="card-text" style={{fontSize:"15px", margin:"20px"}}>
          <button type="submit" class="btn btn-link" id={JSON.stringify(bannerDetails)} onClick={deleteProduct} style={{float:"right" }} >
              <i id={JSON.stringify(bannerDetails)} style={{ color: 'red' }} class="far fa-trash-alt"></i>
                 </button>
              {bannerDetails.description}
              <br></br>
              {/* <a href="#" class="btn btn-link" style={{color:"red"}}> &nbsp;Delete</a> */}
              
          </p>
        </div>
      </div>
    </div>
      
  );
};

export default BannerCard;