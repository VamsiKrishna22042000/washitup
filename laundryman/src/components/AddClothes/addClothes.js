

import './addClothes.css'




import {BiRupee} from 'react-icons/bi'

import {AiOutlineArrowRight} from 'react-icons/ai'

import { useState } from 'react'



const selectionType= [

  {type:"Men"},
  {type:"Women"},
  {type:"Kids"},
  {type:"Household"},

]


const clothesStore  = [
  {
    id: 1,
    category:"Men",
    name:"Shirt",
    imgUrl:"Men-shirt",
    price:10,
  },
  {
    id:2,
    category:"Men",
    name:"T-Shirt",
    imgUrl:"Men-tshirt",
    price:10,

  },
  {
    id:3,
    category:"Men",
    name:"Trousers",
    imgUrl:"Men-trousers",
    price:10,
  },
  {
    id:4,
    category:"Men",
    name:"Shorts",
    imgUrl:"Men-shorts",
    price:10,
  },
  {
    id:5,
    category:"Men",
    name:"Jeans",
    imgUrl:"Men-jeans",
    price:10,
  },
  {
    id:6,
    category:"Men",
    name:"Breifs",
    imgUrl:"Men-breifs",
    price:10,
  },

  {
    id:7,
    category:"Women",
    name:"Shirt",
    imgUrl:"Women-shirt",
    price:10,
  },
  {
    id:8,
    category:"Women",
    name:"T-shirt",
    imgUrl:"Women-tshirt",
    price:10,
  },
  {
    id:9,
    category:"Women",
    name:"Shorts",
    imgUrl:"Women-shorts",
    price:10,
  },
  {
    id:10,
    category:"Women",
    name:"Leggins",
    imgUrl:"Women-leggins",
    price:10,
  },
  {
    id:11,
    category:"Women",
    name:"Jeans",
    imgUrl:"Women-jeans",
    price:10,
  },
  {
    id:12,
    category:"Women",
    name:"Jumpsuit",
    imgUrl:"Women-jumpsuit",
    price:10,
  },
  {
    id:13,
    category:"Kids",
    name:"Combo",
    imgUrl:"kids-tshirtShort",
    price:10,
  },
  {
    id:14,
    category:"Kids",
    name:"Frock",
    imgUrl:"kids-frock",
    price:10,
  },
  {
    id:15,
    category:"Kids",
    name:"Jumpsuit",
    imgUrl:"kids-jumpsuit",
    price:10,
  },
  {
    id:16,
    category:"Kids",
    name:"Boy's Dress",
    imgUrl:"baby-boy-dress",
    price:10,
  },
  {
    id:17,
    category:"Kids",
    name:"Girl's Dress",
    imgUrl:"baby-girl-dress",
    price:10,
  },
  {
    id:18,
    category:"Kids",
    name:"Hoodie",
    imgUrl:"baby-hoodie",
    price:10,
  },
  {
    id:19,
    category:"Household",
    name:"Arpon",
    imgUrl:"household-apron",
    price:10,
  },
  {
    id:20,
    category:"Household",
    name:"Towel",
    imgUrl:"household-towel",
    price:10,
  },
  {
    id:21,
    category:"Household",
    name:"Blankets",
    imgUrl:"household-blankets",
    price:10,
  },
  {
    id:22,
    category:"Household",
    name:"Pillow covers",
    imgUrl:"household-pillowcovers",
    price:10,
  },
  {
    id:23,
    category:"Household",
    name:"Carpet",
    imgUrl:"household-carpet",
    price:10,
  },
  {
    id:24,
    category:"Household",
    name:"Bed cover",
    imgUrl:"household-bedcover",
    price:10,
  },

]


const AddClothes = (props) =>{

 
  
    const washthem = () =>{
         
         if(total > 0){
                const errorMessage = document.getElementById("add-clothes-err");
                errorMessage.classList.add("add-clothes-error-msg-disable")
                const {wash} = props
                wash()
         }else{
             const errorMessage = document.getElementById("add-clothes-err");
             errorMessage.classList.remove("add-clothes-error-msg-disable")
         }
    }

    const [count,setCount]=useState({1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0,13:0,14:0,15:0,16:0,17:0,18:0,19:0,20:0,21:0,22:0,23:0,24:0,}) /* the state name are given as per the icon-names in shorcut of their starting letters which were imported from the react-icons*/

    const [category,setCategory]=useState("Men")

    const [total,setTotal]=useState(0)

    const selectCategory = (event) =>{
        setCategory(event.target.id)
    } 
    
    const filterStore = clothesStore.filter(each=>(each.category===category))
    

    const updateCount = (event) =>{
            
           
            
            const receivedCount = count[parseInt(event.target.id)]

        /** In case of updating the state shortcut name are reversed and which were given as id to the buttons*/
            if(receivedCount === 15){
                const itemId = parseInt(event.target.id)
                setCount(prevCount=>({...count,[itemId]:prevCount[itemId] = 15}))
                 

            }else{
              const itemId = parseInt(event.target.id)
              const price =  parseInt(event.target.getAttribute("price"))
              setCount(prevCount=>({...count,[itemId]:prevCount[itemId] + 1}))
              setTotal(prevTotal=>(prevTotal + price))
            }
    }

    const decrementCount = (event) =>{
        /** In case of decrement the state shortcut name are remains same and which were given as id to the buttons*/
        const receivedCount = count[parseInt+(event.target.id)]
        if(receivedCount === 0){
                const itemId = parseInt(event.target.id)
                setCount(prevCount=>({...count,[itemId]:prevCount[itemId]= 0}))
            }else{
              const itemId = parseInt(event.target.id)
              const price =  parseInt(event.target.getAttribute("price"))
              setCount(prevCount=>({...count,[itemId]:prevCount[itemId] - 1}))
              setTotal(prevTotal=>(prevTotal - price))
            }
    }
    
   
    return(
    
    <div className="add-Clothes">
        <p className='counter-total-value'>Total</p>
        <div className='counter-buttons-container'>
          {selectionType.map(each=>(<button onClick={selectCategory} id={each.type} className={(category === each.type)?"button-pick":'pick-button'} type="button">{each.type}</button>))}
        </div>
        <div className='clothes-add'>
            <BiRupee className='set-counter-total-price-icon'/>
            <p id="total-price" className='counter-total-price'>{total}</p>
            {filterStore.map(each=>
            (
              <div className ='set-counter'>
                <img src={`${each.imgUrl}.png`} className='set-counter-icon' alt={each.id}/>
                  <button price={each.price} id={each.id} onClick={decrementCount} className='set-counter-button' type="button">-</button>
                    <p className='set-counter-para'>{count[each.id]}</p>
                    <p className='set-counter-name'>{each.name}</p>
                    <BiRupee className='set-counter-price-icon'/>
                    <p className='set-counter-price'>{count[each.id]*10}</p>
                  <button price={each.price}  id={each.id} onClick={updateCount} className='set-counter-button' type="button">+</button>
            </div>

            ))}
            <p id="add-clothes-err" className='add-clothes-error-msg add-clothes-error-msg-disable'>*Add atleast one item to wash</p>
            <button onClick={washthem} className='wash-button'>Wash Clothes <AiOutlineArrowRight className="wash-clothes-icon"/></button>
        </div>
    </div>
    )
}
export default AddClothes