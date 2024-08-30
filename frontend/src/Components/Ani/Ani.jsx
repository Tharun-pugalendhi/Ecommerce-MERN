import React from 'react'
import './Ani.css'
import hero_image from '../Assets/Animation.gif'

export const Ani = () => {
  return (
    <div className="ani">
        <div className="ani-container">
        <p>
        <img src={hero_image} alt="" />
        </p>
        </div>
    </div>
  )
}
export default Ani;