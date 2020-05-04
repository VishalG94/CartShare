var getNewStoreArray = bannerDetails =>{
    let count =bannerDetails.length
    let bannerNew=[]
    while(count>0){
        // console.log(count);
      let bannerrow=[];
      if(count-4>=0){
        for(let i=0;i<4;i++){
          bannerrow.push(bannerDetails[count-1])
          count--;
        }
        
      }else{
          console.log(count);
        for(let j=count;j>0;j--){
            console.log(j);
          bannerrow.push(bannerDetails[j-1])
          count--;
        }
      }
      bannerNew.push(bannerrow)
    //   console.log(bannerrow)
      // alert(bannerrow)
    }
    return bannerNew;
  }

  bannerNew = getNewStoreArray([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);
  console.log(bannerNew);