import React from 'react'

const ConfirmRide = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setConfirmRidePanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-4'>Confirm Your Ride</h3>

            <div className='flex gap-3 justify-between flex-col items-center'>
                <img className='h-20' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
                <div className='w-full mt-4 space-y-2'>
                    <div className='flex items-start gap-4 p-3 border rounded-lg'>
                        <i className="ri-map-pin-user-fill text-xl"></i>
                        <div className='flex-1'>
                            <h4 className='text-sm font-semibold text-gray-700'>Pickup</h4>
                            <p className='text-base text-gray-900'>{props.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-start gap-4 p-3 border rounded-lg'>
                        <i className="text-xl ri-map-pin-2-fill"></i>
                        <div className='flex-1'>
                            <h4 className='text-sm font-semibold text-gray-700'>Destination</h4>
                            <p className='text-base text-gray-900'>{props.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center justify-between p-3 border rounded-lg'>
                        <div className='flex items-center gap-3'>
                            <i className="ri-currency-line text-xl"></i>
                            <div>
                                <h4 className='text-sm font-semibold text-gray-700'>Fare</h4>
                                <p className='text-base text-gray-900'>${props.fare[ props.vehicleType ]}</p>
                            </div>
                        </div>
                        <p className='text-sm text-gray-600'>Cash</p>
                    </div>
                </div>
                <button onClick={() => {
                    props.setVehicleFound(true)
                    props.setConfirmRidePanel(false)
                    props.createRide()

                }} className='w-full mt-4 bg-green-600 text-white font-semibold p-3 rounded-lg'>Confirm</button>
            </div>
        </div>
    )
}

export default ConfirmRide
