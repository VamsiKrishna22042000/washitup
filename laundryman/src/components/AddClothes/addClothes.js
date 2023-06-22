

import './addClothes.css'


import {RiShirtLine} from 'react-icons/ri'
import {GiTrousers} from 'react-icons/gi'
import {GiLargeDress} from 'react-icons/gi'
import {GiUnderwearShorts} from 'react-icons/gi'
import {GiArmoredPants} from 'react-icons/gi'
import {GiShorts} from 'react-icons/gi'

import {BiRupee} from 'react-icons/bi'

import {AiOutlineArrowRight} from 'react-icons/ai'

import { useState } from 'react'


const AddClothes = (props) =>{
  
    const washthem = () =>{
         const totalPrice = document.getElementById("total-price").textContent
         
         if(parseInt(totalPrice)>0){
                const errorMessage = document.getElementById("add-clothes-err");
                errorMessage.classList.add("add-clothes-error-msg-disable")
                const {wash} = props
                wash()
         }else{
             const errorMessage = document.getElementById("add-clothes-err");
             errorMessage.classList.remove("add-clothes-error-msg-disable")
         }
    }

    const [count,setCount]=useState({rsl:0,gt:0,gld:0,gus:0,gap:0,gs:0}) /* the state name are given as per the icon-names in shorcut of their starting letters which were imported from the react-icons*/
    const {rsl,gt,gld,gus,gap,gs}=count
    

    

    const updateCount = (event) =>{
        /** In case of updating the state shortcut name are reversed and which were given as id to the buttons*/
          if(event.target.id==="lsr"){
            if(count.rsl === 15){
                setCount(prevCount=>({...count,rsl:prevCount.rsl = 15}))
            }else{
            setCount(prevCount=>({...count,rsl:prevCount.rsl + 1}))
            }
          }
          if(event.target.id==="tg"){
            if(count.gt === 15){
                setCount(prevCount=>({...count,gt:prevCount.gt = 15}))
            }else{
            setCount(prevCount=>({...count,gt:prevCount.gt + 1}))
            }
          }if(event.target.id==="dlg"){
            if(count.gld === 15){
                setCount(prevCount=>({...count,gld:prevCount.gld = 15}))
            }else{
            setCount(prevCount=>({...count,gld:prevCount.gld + 1}))
            }
          }
          if(event.target.id==="sug"){
            if(count.gus === 15){
                setCount(prevCount=>({...count,gus:prevCount.gus = 15}))
            }else{
            setCount(prevCount=>({...count,gus:prevCount.gus + 1}))
            }
          }
          if(event.target.id==="pag"){
            if(count.gap === 15){
                setCount(prevCount=>({...count,gap:prevCount.gap = 15}))
            }else{
            setCount(prevCount=>({...count,gap:prevCount.gap + 1}))
            }
          }
          if(event.target.id==="sg"){
            if(count.gs === 15){
                setCount(prevCount=>({...count,gs:prevCount.gs = 15}))
            }else{
            setCount(prevCount=>({...count,gs:prevCount.gs + 1}))
            }
          }
    }

    const decrementCount = (event) =>{
        /** In case of decrement the state shortcut name are remains same and which were given as id to the buttons*/
        
        if(event.target.id==="rsl"){
            if(count.rsl === 0){
                setCount(prevCount=>({...count,rsl:prevCount.rsl = 0}))
            }else{
            setCount(prevCount=>({...count,rsl:prevCount.rsl - 1}))
            }
          }
        if(event.target.id==="gt"){
            if(count.gt === 0){
                setCount(prevCount=>({...count,gt:prevCount.gt = 0}))
            }else{
            setCount(prevCount=>({...count,gt:prevCount.gt - 1}))
            }
          }
        if(event.target.id==="gld"){
            if(count.gld === 0){
                setCount(prevCount=>({...count,gld:prevCount.gld = 0}))
            }else{
            setCount(prevCount=>({...count,gld:prevCount.gld - 1}))
            }
          }
        if(event.target.id==="gus"){
            if(count.gus === 0){
                setCount(prevCount=>({...count,gus:prevCount.gus = 0}))
            }else{
            setCount(prevCount=>({...count,gus:prevCount.gus - 1}))
            }
          }
        if(event.target.id==="gap"){
            if(count.gap === 0){
                setCount(prevCount=>({...count,gap:prevCount.gap = 0}))
            }else{
            setCount(prevCount=>({...count,gap:prevCount.gap - 1}))
            }
          }
        if(event.target.id==="gs"){
            if(count.gs === 0){
                setCount(prevCount=>({...count,gs:prevCount.gs = 0}))
            }else{
            setCount(prevCount=>({...count,gs:prevCount.gs - 1}))
            }
          }
    }
    




    return(
    <div className="add-Clothes">
        <p className='counter-total-value'>Total</p>
        <BiRupee className='set-counter-total-price-icon'/>
        <p id="total-price" className='counter-total-price'>{`${(rsl*10)+(gt*10)+(gld*10)+(gus*10)+(gap*10)+(gs*10)}`}</p>
        <div className ='set-counter'>
           <RiShirtLine className='set-counter-icon'/>
           <button id="rsl" onClick={decrementCount} className='set-counter-button' type="button">-</button>
           <p className='set-counter-para'>{rsl}</p>
           <p className='set-counter-name'>Shirts</p>
           <BiRupee className='set-counter-price-icon'/>
           <p className='set-counter-price'>{`${rsl*10}`}</p>
           <button id="lsr" onClick={updateCount} className='set-counter-button' type="button">+</button>
        </div>
        <div className ='set-counter'>
           <GiTrousers className='set-counter-icon'/>
           <button id="gt" onClick={decrementCount} className='set-counter-button' type="button">-</button>
           <p className='set-counter-name'>Trousers</p>
           <p className='set-counter-para'>{gt}</p>
           <BiRupee className='set-counter-price-icon'/>
           <p className='set-counter-price'>{`${gt*10}`}</p>
           <button id="tg" onClick={updateCount} className='set-counter-button' type="button">+</button>
        </div>
        <div className ='set-counter'>
           <GiLargeDress className='set-counter-icon'/>
           <button onClick={decrementCount} id="gld" className='set-counter-button' type="button">-</button>
           <p className='set-counter-name'>Dress</p>
           <p className='set-counter-para'>{gld}</p>
           <BiRupee className='set-counter-price-icon'/>
           <p className='set-counter-price'>{`${gld*10}`}</p>
           <button onClick={updateCount} id="dlg" className='set-counter-button' type="button">+</button>
        </div>
        <div className ='set-counter'>
           <GiUnderwearShorts className='set-counter-icon'/>
           <button onClick={decrementCount} id="gus" className='set-counter-button' type="button">-</button>
           <p className='set-counter-para'>{gus}</p>
           <p className='set-counter-name'>Briefs</p>
           <p className='set-counter-price'>{`${gus*10}`}</p>
           <BiRupee className='set-counter-price-icon'/>
           <button onClick={updateCount} id="sug" className='set-counter-button' type="button">+</button>
        </div>
        <div className ='set-counter'>
           <GiArmoredPants className='set-counter-icon'/>
           <button onClick={decrementCount} id="gap" className='set-counter-button' type="button">-</button>
           <p className='set-counter-para'>{gap}</p>
           <p className='set-counter-name'>Jeans</p>
           <BiRupee className='set-counter-price-icon'/>
           <p className='set-counter-price'>{`${gap*10}`}</p>
           <button onClick={updateCount} id="pag" className='set-counter-button' type="button">+</button>
        </div>
        <div className ='set-counter'>
           <GiShorts className='set-counter-icon'/>
           <button onClick={decrementCount} id="gs" className='set-counter-button' type="button">-</button>
           <p className='set-counter-para'>{gs}</p>
           <BiRupee className='set-counter-price-icon'/>
           <p className='set-counter-price'>{`${gs*10}`}</p>
           <p className='set-counter-name'>Shorts</p>
           <button onClick={updateCount} id="sg" className='set-counter-button' type="button">+</button>
        </div>
        <p id="add-clothes-err" className='add-clothes-error-msg add-clothes-error-msg-disable'>*Add atleast one item to wash</p>
        <button onClick={washthem} className='wash-button'>Wash Clothes <AiOutlineArrowRight className="wash-clothes-icon"/></button>
    </div>)
}
export default AddClothes