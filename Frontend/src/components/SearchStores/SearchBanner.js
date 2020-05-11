import React from "react";
import StoreBannerCard from "../SearchCard/SearchCard";
import "./Banner-styles.css";
import SearchCard from "../SearchCard/SearchCard";

const SearchBanner = ({ bannerDetails,countperrow }) => {
  let bannerLst;
  let bannerrow;
  let count = bannerDetails.length;
  console.log(bannerDetails);
  // alert(count);
  bannerrow=<div className="Banner">
  {bannerDetails.map((details) => (
    <SearchCard {...details} />
  ))}
  </div>
      bannerLst = 
      <div className="row">
      {bannerrow}
      </div>
      
      
  return (
    
    <div >
     
     {bannerLst}

</div>
    
  );
};

export default SearchBanner;