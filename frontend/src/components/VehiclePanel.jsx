import React from 'react'
import electricCycle from '../assets/electric-cycle.svg'
import autoLogo from '../assets/auto.svg'

const VehiclePanel = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setVehiclePanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-4'>Choose a Vehicle</h3>
            <div className='space-y-3'>
            <div onClick={() => {
                props.setConfirmRidePanel(true)
                props.selectVehicle('car')
            }} className='flex items-center justify-between border rounded-xl w-full p-3 hover:border-black transition'>
                <div className='flex items-center gap-3'>
                    <img className='h-12 w-16 object-cover rounded' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="Uber Go" />
                    <div className='ml-1'>
                        <h4 className='font-semibold text-base'>Uber Go <span className='text-gray-600 font-normal'><i className="ri-user-3-fill"></i> 4</span></h4>
                        <p className='text-xs text-gray-600 leading-4'>2 mins away • Affordable, compact rides</p>
                    </div>
                </div>
                <div className='text-right min-w-[72px]'>
                    <h2 className='text-lg font-semibold'>${props.fare.car}</h2>
                </div>
            </div>
            <div onClick={() => {
                props.setConfirmRidePanel(true)
                props.selectVehicle('moto')
            }} className='flex items-center justify-between border rounded-xl w-full p-3 hover:border-black transition'>
                <div className='flex items-center gap-3'>
                    <img className='h-12 w-16 object-contain' src={electricCycle} alt="Uber Electric Cycle" />
                    <div className='ml-1'>
                        <h4 className='font-semibold text-base'>Uber Electric Cycle <span className='text-gray-600 font-normal'><i className="ri-user-3-fill"></i> 1</span></h4>
                        <p className='text-xs text-gray-600 leading-4'>3 mins away • Affordable e-cycle (Neuron-like)</p>
                    </div>
                </div>
                <div className='text-right min-w-[72px]'>
                    <h2 className='text-lg font-semibold'>${props.fare.moto}</h2>
                </div>
            </div>
            <div onClick={() => {
                props.setConfirmRidePanel(true)
                props.selectVehicle('auto')
            }} className='flex items-center justify-between border rounded-xl w-full p-3 hover:border-black transition'>
                <div className='flex items-center gap-3'>
                    <img className='h-12 w-16 object-contain' src={autoLogo} alt="Uber Auto" />
                    <div className='ml-1'>
                        <h4 className='font-semibold text-base'>Uber Auto <span className='text-gray-600 font-normal'><i className="ri-user-3-fill"></i> 3</span></h4>
                        <p className='text-xs text-gray-600 leading-4'>3 mins away • Affordable auto rides</p>
                    </div>
                </div>
                <div className='text-right min-w-[72px]'>
                    <h2 className='text-lg font-semibold'>${props.fare.auto}</h2>
                </div>
            </div>
            </div>
        </div>
    )
}

export default VehiclePanel
