const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

async function getFare(pickup, destination) {

    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    // Helpers to parse env with numeric defaults
    const num = (v, d) => {
        const n = Number(v);
        return Number.isFinite(n) ? n : d;
    };

    // Canadian defaults (CAD); overridable via .env
    const baseFare = {
        auto: num(process.env.FARE_BASE_AUTO, 3.5),
        car: num(process.env.FARE_BASE_CAR, 5.0),
        moto: num(process.env.FARE_BASE_MOTO, 3.0),
    };

    const perKmRate = {
        auto: num(process.env.FARE_PER_KM_AUTO, 1.2),
        car: num(process.env.FARE_PER_KM_CAR, 1.8),
        moto: num(process.env.FARE_PER_KM_MOTO, 1.0),
    };

    const perMinuteRate = {
        auto: num(process.env.FARE_PER_MIN_AUTO, 0.3),
        car: num(process.env.FARE_PER_MIN_CAR, 0.5),
        moto: num(process.env.FARE_PER_MIN_MOTO, 0.2),
    };

    const roundToNickel = (amount) => Math.round(amount / 0.05) * 0.05;

    const distanceKm = distanceTime.distance.value / 1000; // meters -> km
    const durationMin = distanceTime.duration.value / 60;   // seconds -> minutes

    const calc = (type) => {
        const raw = baseFare[type] + (distanceKm * perKmRate[type]) + (durationMin * perMinuteRate[type]);
        const nickel = roundToNickel(raw);
        return Math.round(nickel * 100) / 100; // keep 2 decimals
    };

    return {
        auto: calc('auto'),
        car: calc('car'),
        moto: calc('moto'),
    };
}

module.exports.getFare = getFare;

function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}

module.exports.createRide = async ({
    user, pickup, destination, vehicleType
}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const fare = await getFare(pickup, destination);

    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType]
    });

    return ride;
}

module.exports.confirmRide = async ({
    rideId, captain
}) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id
    });

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;
}

module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    });

    return ride;
}

module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    });

    return ride;
}
