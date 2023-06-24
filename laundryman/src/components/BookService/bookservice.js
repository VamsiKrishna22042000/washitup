

import '../LaundryMain/index.css'

import './bookservice.css'

import { useState } from 'react'

import {BiCurrentLocation} from 'react-icons/bi'

import {MdMoreTime} from 'react-icons/md'


const timeArray = [
  {
    id:1,
    time:"1 hr"
  },
  {
    id:2,
    time:"2 hr"
  },
  {
    id:3,
    time:"3 hr"
  },
  {
    id:4,
    time:"4 hr"
  },
  {
    id:5,
    time:"5 hr"
  }
]

    const BookService = (props) => {

        const {book,time,getTime}=props
        const [latitude,setLatitude] = useState("")
        const [longitude,setLongitude] = useState("")
        const [userAddress,setAddress]= useState("")
        const [num,setNumber] = useState("*Please Enter Your Number")
        const [clo,setClothes] = useState("*Please select Time")
        

        const bookNow = () =>{
            let name = document.getElementById("name").value
            let phone = document.getElementById("phone").value
            let clothes = document.getElementById("clothes").value
            let address = document.getElementById("addres").value

            if( name ==="" || phone ===""||time===0|| address ===""){
                let errorName = document.getElementById("error-name")
                let errorPhone = document.getElementById("error-phone")
                let errorClothes = document.getElementById("error-clothes")
                let errorAddress = document.getElementById("error-address")
                if(name===""){
                    errorName.classList.remove("error-disable")
                }else if(phone==="" || (isNaN(phone)===true)){
                    if(phone===""){
                        errorName.classList.add("error-disable")
                        errorPhone.classList.remove("error-disable")
                    }else if(isNaN(phone)===true){
                        setNumber("*Should be numeric & no spaces between")
                        errorName.classList.add("error-disable")
                        errorPhone.classList.remove("error-disable")
                    }
                }else if(time===0){
                        errorPhone.classList.add("error-disable")
                        errorClothes.classList.remove("error-disable")
                }else if(address===""){
                    errorAddress.classList.remove("error-disable")
                    errorClothes.classList.add("error-disable")
                }
            }
            if(name !=="" && phone !==""&& time!==0 && address !==""){
            if((isNaN(phone)===true)){

              let errorName = document.getElementById("error-name")
              let errorPhone = document.getElementById("error-phone")
                if(isNaN(phone)===true){
                    setNumber("*Should be numeric & no spaces between")
                    errorName.classList.add("error-disable")
                    errorPhone.classList.remove("error-disable")
                }
            }else{
                let errorName = document.getElementById("error-name")
                let errorPhone = document.getElementById("error-phone")
                let errorClothes = document.getElementById("error-clothes")
                let errorAddress = document.getElementById("error-address")

                errorName.classList.add("error-disable")
                errorPhone.classList.add("error-disable")
                errorClothes.classList.add("error-disable")
                errorAddress.classList.add("error-disable")



                document.getElementById("name").value=""
                document.getElementById("phone").value=""
                document.getElementById("clothes").value=""
                document.getElementById("addres").value=""


                book()
              }
            }
            }    
        

        const reverseGeoCoding= async()=>{
            if(latitude!==""&& longitude!==""){
                console.log(latitude)
                console.log(longitude)
                const apikey = "AIzaSyAm_75hdAbd0ukSKs2c-QG1IOkJcqgHEVQ"
                const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true/false&key=${apikey}`
                
                const response = await fetch (url,)
                const jsonData = await response.json()
                if(response.ok===true){
                  setAddress(jsonData.error_message)
                  console.log(jsonData)
                }else{
                  alert(jsonData.error_message)
                }
              }
        }

        const selectedTime = (event) =>{
             getTime(parseInt(event.target.id))
        }
        
          
                    function getLocation(){
                      if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(showPosition,showError);
                      } else {
                        alert("Geolocation is not supported by this browser.");
                      }
                    }
      
                    function showPosition(position) {
                      setLatitude(position.coords.latitude)
                      setLongitude(position.coords.longitude)
                    }
      
                    function showError(error) {
                      switch(error.code) {
                        case error.PERMISSION_DENIED:
                          alert("User denied the request for Geolocation.")
                          break;
                        case error.POSITION_UNAVAILABLE:
                          alert("Location information is unavailable.")
                          break;
                        case error.TIMEOUT:
                          alert("The request to get user location timed out.")
                          break;
                        case error.UNKNOWN_ERROR:
                          alert("An unknown error occurred.")
                          break;
                      }
                    }
      
                    const updateAddress = (event) =>{
                      setAddress(event.target.value)
                    }

        reverseGeoCoding();


        return(<div className='login'>
        <div className="input1">
            <svg htmlFor="name" className="na" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.9999 7.33335C9.2175 7.33335 8.58324 7.96762 8.58324 8.75002C8.58324 9.53242 9.2175 10.1667 9.9999 10.1667C10.7823 10.1667 11.4166 9.53242 11.4166 8.75002C11.4166 7.96762 10.7823 7.33335 9.9999 7.33335ZM7.08324 8.75002C7.08324 7.13919 8.38907 5.83335 9.9999 5.83335C11.6107 5.83335 12.9166 7.13919 12.9166 8.75002C12.9166 10.3609 11.6107 11.6667 9.9999 11.6667C8.38907 11.6667 7.08324 10.3609 7.08324 8.75002Z" fill="#6759FF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.99998 1.75C7.72202 1.75 5.65849 2.67423 4.16635 4.16637C2.67422 5.6585 1.74998 7.72203 1.74998 10C1.74998 12.278 2.67422 14.3415 4.16635 15.8336C5.65849 17.3258 7.72202 18.25 9.99998 18.25C12.278 18.25 14.3415 17.3258 15.8336 15.8336C17.3258 14.3415 18.25 12.278 18.25 10C18.25 7.72203 17.3258 5.6585 15.8336 4.16637C14.3415 2.67423 12.278 1.75 9.99998 1.75ZM13.652 15.6779C12.6459 14.8874 11.3784 14.4167 9.99998 14.4167C8.62153 14.4167 7.35403 14.8874 6.34797 15.6779C7.40082 16.3566 8.65409 16.75 9.99998 16.75C11.3459 16.75 12.5991 16.3566 13.652 15.6779ZM5.22701 5.22703C6.44935 4.0047 8.13582 3.25 9.99998 3.25C11.8642 3.25 13.5506 4.0047 14.773 5.22703C15.9953 6.44936 16.75 8.13583 16.75 10C16.75 11.8322 16.021 13.4927 14.8355 14.7096C13.5375 13.5927 11.8471 12.9167 9.99998 12.9167C8.15282 12.9167 6.46241 13.5927 5.16447 14.7096C3.97899 13.4927 3.24998 11.8322 3.24998 10C3.24998 8.13583 4.00468 6.44936 5.22701 5.22703ZM7.08324 8.75002C7.08324 7.13919 8.38907 5.83335 9.9999 5.83335C11.6107 5.83335 12.9166 7.13919 12.9166 8.75002C12.9166 10.3609 11.6107 11.6667 9.9999 11.6667C8.38907 11.6667 7.08324 10.3609 7.08324 8.75002ZM9.9999 7.33335C9.2175 7.33335 8.58324 7.96762 8.58324 8.75002C8.58324 9.53242 9.2175 10.1667 9.9999 10.1667C10.7823 10.1667 11.4166 9.53242 11.4166 8.75002C11.4166 7.96762 10.7823 7.33335 9.9999 7.33335Z" fill="#6759FF" />
            </svg>

            <input id="name" className="name" type="text" placeholder="Name"/>
            <p id="error-name" className="error-name error-disable">*Please Enter YourName</p>
            <svg htmlFor="phone" className="ph" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.49506 2.12319C-0.425425 5.33638 1.13449 10.3086 5.42326 14.6172C9.62077 18.834 14.8171 20.4106 17.8922 17.5495C19.5745 15.9841 19.3259 13.2121 17.2476 11.3596L17.0578 11.1983C15.1296 9.63698 12.331 9.63202 10.6216 11.1712L10.534 11.2534L10.4843 11.2116C10.2975 11.0524 10.0544 10.8307 9.76087 10.5389L9.46379 10.2369L9.1575 9.91067C9.06564 9.81008 8.9839 9.71776 8.91187 9.634L8.78835 9.48766L8.71883 9.56287C10.406 7.86789 10.422 4.84909 8.72464 2.82112C6.83975 0.569034 3.9807 0.488648 2.49506 2.12319ZM7.34619 3.97499C8.52521 5.38369 8.39342 7.34164 7.44486 8.29457L7.29694 8.43409C6.6676 9.00023 6.05323 9.33401 8.32822 11.6475C10.7828 14.1437 11.0889 13.268 11.7283 12.5986C12.7327 11.5896 14.6995 11.4965 16.0515 12.7016C17.5467 14.0344 17.3847 15.5661 16.6677 16.2333C14.449 18.2977 10.2001 16.8678 6.69723 13.3489C3.1944 9.82988 1.63985 5.73682 3.82526 3.33238C4.33259 2.77419 5.92364 2.27531 7.34619 3.97499Z" fill="#6759FF" />
            </svg>
            <input id="phone" className="name" type="text" placeholder="Phone Number"/>
            <p id="error-phone" className="error-phone error-disable">{num}</p>
        </div>
        <div class="input2">          
            <MdMoreTime htmlFor="clothes" className='co'/> 
            <div id="clothes" className='name2'>
                <p className='bookservice-pickup'>Pickup in</p>
                {timeArray.map(each=><button onClick={selectedTime} id={each.id}  className={each.id === time ? "selected-time":"bookservice-time"} key={each.id}>{each.time}</button>)}
            </div>
            <p id="error-clothes" className="error-clothes error-disable">{clo}</p>
        </div>
        <div className="input3">
            <textarea id="addres" className="address" placeholder="Address" value={userAddress} onChange={updateAddress}></textarea>
            <p id="error-address" className="error-address error-disable">*Please Enter Address or Click on GeoLocator to update Address</p>
            <BiCurrentLocation className='geoLocator' onClick={getLocation} />
            <div className='add'>
              <svg htmlFor="addres" className="ad" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.3333 17.5H1.66666V15.8333H2.5V3.33333C2.5 3.11232 2.58779 2.90036 2.74408 2.74408C2.90036 2.5878 3.11232 2.5 3.33333 2.5H15C15.221 2.5 15.433 2.5878 15.5893 2.74408C15.7455 2.90036 15.8333 3.11232 15.8333 3.33333V7.5H17.5V15.8333H18.3333V17.5ZM14.1667 15.8333H15.8333V9.16667H10.8333V15.8333H12.5V10.8333H14.1667V15.8333ZM14.1667 7.5V4.16667H4.16666V15.8333H9.16666V7.5H14.1667ZM5.83333 9.16667H7.5V10.8333H5.83333V9.16667ZM5.83333 12.5H7.5V14.1667H5.83333V12.5ZM5.83333 5.83333H7.5V7.5H5.83333V5.83333Z" fill="#6759FF" />
              </svg>
            </div>
            
        </div>
        <div className="input4">
            <button id="bookService" onClick={bookNow} className="butt but1 btn btn-primary"> Book Service <svg className="fa" width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.39011 0.549296C8.11973 0.815871 8.09437 1.2371 8.31601 1.53265L8.38259 1.60993L12.9583 6.25004L1.25 6.25004C0.835787 6.25004 0.5 6.58583 0.5 7.00004C0.5 7.38239 0.786114 7.69792 1.15592 7.7442L1.25 7.75004H12.9583L8.38259 12.3902C8.11601 12.6605 8.09663 13.0821 8.32245 13.3745L8.39011 13.4508C8.66049 13.7174 9.08204 13.7367 9.37442 13.5109L9.45074 13.4433L15.2841 7.5266C15.548 7.25892 15.57 6.84245 15.3501 6.54997L15.2841 6.47348L9.45074 0.556818C9.15994 0.261855 8.68507 0.258488 8.39011 0.549296Z" fill="white"/>
            </svg></button>
        </div>
    </div>)
}

export default BookService