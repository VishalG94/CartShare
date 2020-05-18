import React, { Component } from 'react'
import '../../App.css'
import './SearchBar.css'
import axios from 'axios'
import { loginuser } from '../../actions'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
// import { ReactModal } from 'react-modal';
import StoreBanner from '../StoreBanner/StoreBanner'
import ROOT_URL from '../../constants.js'

//ReactModal.defaultStyles.overlay.backgroundColor = 'cornsilk';

// Define a Login Component
class SearchBar extends Component {
  // call the constructor method
  constructor(props) {
    super(props)

    this.state = {
      text: "",
      result: ""
    }

    this.textChangeHandler = this.textChangeHandler.bind(this)
    this.submitSearch = this.submitSearch.bind(this);
  }

  textChangeHandler = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  submitSearch = (e) => {
    e.preventDefault();
    const data = { text:this.state.text}
    axios.defaults.withCredentials = true;
    console.log(data);
    axios.post(`${ROOT_URL}/searchproduct`, data)
      .then(response => {
        // alert(JSON.stringify(response.data[0]))
        // sessionStorage.removeItem('Result')
        // sessionStorage.removeItem('UserResult')
        // if (response.data[0].text) {
        //   sessionStorage.setItem("Result", JSON.stringify(response.data))
        // } else {
        //   sessionStorage.setItem("UserResult", JSON.stringify(response.data))
        // }
        this.setState({
          result: response.data
        })
        sessionStorage.setItem('searchproducts', JSON.stringify(response.data))
        // window.location.reload();
        console.log(response.data)
        // window.location.reload()
      }).catch((error) => {
        console.log("Gandu kuch hua jol yaha!")
      });
  }

// render() {
    

    // let bannerDetails = this.state.result;
    // let bannerNew = []


    // var getNewproductsArray = (bannerDetails,countperrow) => {
    //   let count = bannerDetails.length
    //   let bannerNew = []
    //   // let countperrow=2;
    //   while (count > 0) {
    //     let bannerrow = [];
    //     if (count - countperrow >= 0) {
    //       for (let i = 0; i < countperrow; i++) {
    //         bannerrow.push(bannerDetails[count - 1])
    //         count--;
    //       }

    //     } else {
    //       console.log(count);
    //       for (let j = count; j > 0; j--) {
    //         console.log(j);
    //         bannerrow.push(bannerDetails[j - 1])
    //         count--;
    //       }
    //     }
    //     bannerNew.push(bannerrow)
    //   }
    //   return bannerNew;
    // }
    // bannerNew = getNewproductsArray(bannerDetails,3);
    // let bannerFinal = bannerNew.map((data) => {
    //   return <StoreBanner bannerDetails={data}></StoreBanner>
    // })

//     return (

//       <div>
//         <div class='form-group'>
//           <div tabIndex='0' class='wrap'>
//             <div class='search'>
//               <input
//                 id='searchbar'
//                 type='text'
//                 class='searchTerm'
//                 placeholder='What are you looking for?'
//                 onChange={this.textChangeHandler}
//               />
//               <button id='searchbarbutton' type='submit' class='searchButton' onClick={this.submitSearch} >
//                 <i class='fa fa-search' />
//               </button>

//               &nbsp;&nbsp;&nbsp;&nbsp;

//             </div>
//             {bannerFinal}
//           </div>
//           {Searchbutton}
//         </div>

//       </div>

//     )
//   }
// }

clearsearchlist = (e) => {
  e.preventDefault();
  sessionStorage.removeItem('searchproducts');
  window.location.reload();
}

render() {

  let bannerDetails = this.state.result;
  let bannerNew = []


  var getNewproductsArray = (bannerDetails,countperrow) => {
    let count = bannerDetails.length
    let bannerNew = []
    // let countperrow=2;
    while (count > 0) {
      let bannerrow = [];
      if (count - countperrow >= 0) {
        for (let i = 0; i < countperrow; i++) {
          bannerrow.push(bannerDetails[count - 1])
          count--;
        }

      } else {
        console.log(count);
        for (let j = count; j > 0; j--) {
          console.log(j);
          bannerrow.push(bannerDetails[j - 1])
          count--;
        }
      }
      bannerNew.push(bannerrow)
    }
    return bannerNew;
  }
  bannerNew = getNewproductsArray(bannerDetails,3);
  let bannerFinal = bannerNew.map((data) => {
    return <StoreBanner bannerDetails={data}></StoreBanner>
  })

  let Searchbutton = null;
  if (sessionStorage.getItem('searchproducts') != null) {
    Searchbutton = <button id='searchbarbutton' style={{ outline: 'none' }} type='submit' class='searchButton' onClick={this.clearsearchlist} >
      <i class="fas fa-times-circle"></i>
    </button>
  } else {
    Searchbutton = <button id='searchbarbutton' style={{ outline: 'none' }} type='submit' class='searchButton' onClick={this.submitSearch} >
      <i class='fa fa-search' />
    </button>
  }
  return (
    <div>
      <div class='form-group'>
        <div tabIndex='0' class='wrap'>
          <div class='search'>
            <input
              id='searchbar'
              type='text'
              class='searchTerm'
              placeholder='Search for a product'
              onChange={this.textChangeHandler}
            />
            {Searchbutton}
            {/* <button id='searchbarbutton' type='submit' class='searchButton' onClick={this.submitSearch} >
              <i class='fa fa-search' />
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button class='btn btn-link' style={{ color: 'gray' }} onClick={this.clearsearchlist} >
              <i class="fas fa-times-circle"></i>
            </button> */}
          </div>
        </div>
        {bannerFinal}
      </div>
    </div>
  )
}
}



const validate = formValues => {
  const error = {}
  if (!formValues.email) {
    error.email = 'Enter a valid email'
  }
  if (!formValues.password) {
    error.password = 'Enter a valid Password'
  }
  return error
}
const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(
  mapStateToProps,
  { loginuser }
)(
  reduxForm({
    form: 'streamLogin',
    validate: validate
  })(SearchBar)
)
