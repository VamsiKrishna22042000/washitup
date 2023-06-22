


import "./clothesCounter.css"

const ClothesCounter = (props) =>{
        const {each}=props
        const {icon}=each
        return(
        <div className ='set-counter'>
           <button className='set-counter-button' type="button">+</button>
           <p className='set-counter-para'>0</p>
           <button className='set-counter-button' type="button">-</button>
        </div>)
}

export default ClothesCounter