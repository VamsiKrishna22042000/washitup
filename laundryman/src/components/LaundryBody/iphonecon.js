import '../LaundryMain/index.css'

import {Component} from 'react'

class Iphonecon extends Component{
   
    render(){
    const {eachi}=this.props
    const {iurl,fep1,lan,phonecon}=eachi

    let u=`./${iurl}.jpg`

    return(<div className={phonecon}>
        <img className={iurl} src={u} alt="iphone"/>
        <div className="phone1-matter">
                <div className="pph2">
                    <p className="fep1">{fep1}</p>
                    <p className="lan">{lan}</p>
                </div>
                <div>
                    <div className="fename">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 1L9.6985 6.20599C9.44454 7.22185 9.31756 7.72978 9.05308 8.14309C8.81915 8.50868 8.50868 8.81915 8.14309 9.05308C7.72978 9.31756 7.22185 9.44454 6.20599 9.6985L1 11L6.20599 12.3015C7.22185 12.5555 7.72978 12.6824 8.14309 12.9469C8.50868 13.1808 8.81915 13.4913 9.05309 13.8569C9.31756 14.2702 9.44454 14.7782 9.6985 15.794L11 21L12.3015 15.794C12.5555 14.7782 12.6824 14.2702 12.9469 13.8569C13.1808 13.4913 13.4913 13.1808 13.8569 12.9469C14.2702 12.6824 14.7782 12.5555 15.794 12.3015L21 11L15.794 9.6985C14.7782 9.44454 14.2702 9.31756 13.8569 9.05308C13.4913 8.81915 13.1808 8.50868 12.9469 8.14309C12.6824 7.72978 12.5555 7.22185 12.3015 6.20599L11 1Z" stroke="#6759FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                        <p className="fep2">Feature Name</p>
                    </div>
                    <p className="fep3">Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do <br />Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua.</p>

                    <div className="fename">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2.49996V12M12 12L20.5 7.27767M12 12L3.5 7.27767M12 12V21.5M20.5 16.7222L12.777 12.4316C12.4934 12.2741 12.3516 12.1953 12.2015 12.1644C12.0685 12.1371 11.9315 12.1371 11.7986 12.1644C11.6484 12.1953 11.5066 12.2741 11.223 12.4316L3.5 16.7222M21 16.0585V7.94141C21 7.59876 21 7.42744 20.9495 7.27464C20.9049 7.13947 20.8318 7.01539 20.7354 6.9107C20.6263 6.79236 20.4766 6.70916 20.177 6.54276L12.777 2.43164C12.4934 2.27409 12.3516 2.19531 12.2015 2.16442C12.0685 2.13709 11.9315 2.13709 11.7986 2.16442C11.6484 2.19531 11.5066 2.27409 11.223 2.43165L3.82297 6.54276C3.52345 6.70916 3.37369 6.79236 3.26463 6.9107C3.16816 7.01539 3.09515 7.13947 3.05048 7.27465C3 7.42745 3 7.59877 3 7.94141V16.0585C3 16.4012 3 16.5725 3.05048 16.7253C3.09515 16.8605 3.16816 16.9845 3.26463 17.0892C3.37369 17.2076 3.52345 17.2908 3.82297 17.4572L11.223 21.5683C11.5066 21.7258 11.6484 21.8046 11.7986 21.8355C11.9315 21.8628 12.0685 21.8628 12.2015 21.8355C12.3516 21.8046 12.4934 21.7258 12.777 21.5683L20.177 17.4572C20.4766 17.2908 20.6263 17.2076 20.7354 17.0892C20.8318 16.9845 20.9049 16.8605 20.9495 16.7253C21 16.5725 21 16.4012 21 16.0585Z" stroke="#6759FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                        <p className="fep2">Feature Name</p>
                    </div>
                    <p className="fep3">Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do <br />Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua.</p>

                    <div className="fename">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.5 16H8M8 16V3.5M8 16L3.5 20.5M3.5 8H16M16 8V20.5M16 8L20.5 3.5M21 15.3373V3.8C21 3.51997 21 3.37996 20.9455 3.273C20.8976 3.17892 20.8211 3.10243 20.727 3.0545C20.62 3 20.48 3 20.2 3H8.66274C8.41815 3 8.29586 3 8.18077 3.02763C8.07873 3.05213 7.98119 3.09253 7.89172 3.14736C7.7908 3.2092 7.70432 3.29568 7.53137 3.46863L3.46863 7.53137C3.29568 7.70432 3.2092 7.7908 3.14736 7.89172C3.09253 7.98119 3.05213 8.07873 3.02763 8.18077C3 8.29586 3 8.41815 3 8.66274V20.2C3 20.48 3 20.62 3.0545 20.727C3.10243 20.8211 3.17892 20.8976 3.273 20.9455C3.37996 21 3.51997 21 3.8 21H15.3373C15.5818 21 15.7041 21 15.8192 20.9724C15.9213 20.9479 16.0188 20.9075 16.1083 20.8526C16.2092 20.7908 16.2957 20.7043 16.4686 20.5314L20.5314 16.4686C20.7043 16.2957 20.7908 16.2092 20.8526 16.1083C20.9075 16.0188 20.9479 15.9213 20.9724 15.8192C21 15.7041 21 15.5818 21 15.3373Z" stroke="#6759FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>

                        <p className="fep2">Feature Name</p>
                    </div>
                    <p className="fep3">Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do <br/>Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua.</p>
                </div>
            </div>
    </div>)}
}
export default Iphonecon