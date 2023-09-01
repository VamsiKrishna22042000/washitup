import '../LaundryMain/index.css'

import {Component} from 'react'

class FeatureBox extends Component{
    render(){
        const {each} = this.props
        const {id,con1,imageUrl}=each
       
        let con =`feature-name ${con1}`

     
        
        let icon = `./${imageUrl}.png`

        return(
            <>
            <div id={id} className={con}>
                <img className="ic" src={icon} alt="icon"/>
                <p className="p1">Feature Name</p>
                <p className="tagline1">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                <p className="tagline2">Know More <svg className="fa" width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.39011 0.549296C8.11973 0.815871 8.09437 1.2371 8.31601 1.53265L8.38259 1.60993L12.9583 6.25004L1.25 6.25004C0.835787 6.25004 0.5 6.58583 0.5 7.00004C0.5 7.38239 0.786114 7.69792 1.15592 7.7442L1.25 7.75004H12.9583L8.38259 12.3902C8.11601 12.6605 8.09663 13.0821 8.32245 13.3745L8.39011 13.4508C8.66049 13.7174 9.08204 13.7367 9.37442 13.5109L9.45074 13.4433L15.2841 7.5266C15.548 7.25892 15.57 6.84245 15.3501 6.54997L15.2841 6.47348L9.45074 0.556818C9.15994 0.261855 8.68507 0.258488 8.39011 0.549296Z" fill="white"/>
                    </svg>
                </p>
            </div>
          </>
        )
    }
}export default FeatureBox


