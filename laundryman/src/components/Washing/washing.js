
import './washing.css'



const Washing = (props) =>{
    const{time}=props

    return(
    <div className='washing-total-con'>
        <div className='washing-note'>
            <p>Note : Our WashIt Executive will reach you out in {time} hr Relax !</p>
        </div>
        <img className='washing-anime' src="./washing-machine.gif"  alt="Washing"/>
        <p className='washing-para'>Washing</p>
        <img className='washing-loader' src="./loading-dots.gif" alt="loading"/>
   </div>)
}

export default Washing