import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
    const [ otp, setOtp ] = useState('')
    const navigate = useNavigate()

    const submitHander = async (e) => {
        e.preventDefault()

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: {
                rideId: props.ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            props.setConfirmRidePopupPanel(false)
            props.setRidePopupPanel(false)
            navigate('/captain-riding', { state: { ride: props.ride } })
        }


    }
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setRidePopupPanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-4'>Confirm This Ride to Start</h3>
            <div className='flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3 '>
                    <img className='h-12 rounded-full object-cover w-12' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="" />
                    <h2 className='text-lg font-medium capitalize'>{props.ride?.user.fullname.firstname}</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>
            <div className='flex gap-3 justify-between flex-col items-center'>
                <div className='w-full mt-4 space-y-2'>
                    <div className='flex items-start gap-4 p-3 border rounded-lg'>
                        <i className="ri-map-pin-user-fill text-xl"></i>
                        <div className='flex-1'>
                            <h4 className='text-sm font-semibold text-gray-700'>Pickup</h4>
                            <p className='text-base text-gray-900'>{props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-start gap-4 p-3 border rounded-lg'>
                        <i className="text-xl ri-map-pin-2-fill"></i>
                        <div className='flex-1'>
                            <h4 className='text-sm font-semibold text-gray-700'>Destination</h4>
                            <p className='text-base text-gray-900'>{props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center justify-between p-3 border rounded-lg'>
                        <div className='flex items-center gap-3'>
                            <i className="ri-currency-line text-xl"></i>
                            <div>
                                <h4 className='text-sm font-semibold text-gray-700'>Fare</h4>
                                <p className='text-base text-gray-900'>${props.ride?.fare}</p>
                            </div>
                        </div>
                        <p className='text-sm text-gray-600'>Cash</p>
                    </div>
                </div>

                <div className='mt-6 w-full'>
                    <form onSubmit={submitHander}>
                        <input value={otp} onChange={(e) => setOtp(e.target.value)} type="text" className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3' placeholder='Enter OTP' />

                        <button className='w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Confirm</button>
                        <button onClick={() => {
                            props.setConfirmRidePopupPanel(false)
                            props.setRidePopupPanel(false)

                        }} className='w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg'>Cancel</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopUp
