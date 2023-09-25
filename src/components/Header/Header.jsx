import React from 'react'
import './Header.css'
export default function Header({title, desc, height}) {

    return (
    <div>
        <div className="header" style={{height:height+"vh"}}>
        <div className=" d-flex justify-content-center align-items-center" style={{height:height+"vh"}}>
            <div className="header-content text-center text-white">
                <h1>{title}</h1>
                {desc!==""?<p className='w-50 m-auto mt-5'>{desc}</p>:<></>}
            </div>
        </div>
        </div>
    </div>
)
}
