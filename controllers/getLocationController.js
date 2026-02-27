const axios = require('axios');
require('dotenv').config();
const AdminStoreLocation = require('../models/AdminStorelocation');

exports.getLocation = async (req, res) => {
    try {
        const { latitude, longitude } = req.body;
        if (!latitude || !longitude) {
            return res.status(400).json({ msg: "Latitude and Longitude are required" });
        };
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json`,
            {
                params: {
                    latlng: `${latitude},${longitude}`,
                    key: process.env.GOOGLE_API_KEY,
                },
            }
        );
        const result = response.data.results[0];
        // console.log("locationresult",result);
        if (!result) {
            return res.status(404).json({ message: "Address not found" });
        }
        return res.status(200).json({
            formatted_address: result.formatted_address,
            latitude: result.geometry.location.lat,
            longitude: result.geometry.location.lng,
            place_id: result.place_id
        });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.checkAvailableDeliveryLocation = async (req, res) => {
    try {
        const { latitude, longitude } = req.body;
        if (!latitude || !longitude) {
            return res.status(400).json({ msg: "Latitude and Longitude are required" });
        }
         const stores = await AdminStoreLocation.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [parseFloat(longitude), parseFloat(latitude)] },
          distanceField: "distance",
          spherical: true,
        },
      },
      { $limit: 1 },
    ]);
        if (stores.length === 0) {
            return res.status(404).json({ message: "No stores found" });
        }   
        const store = stores[0];
        if (store.distance > store.deliveryRadius * 1000) {
            return res.status(400).json({ message: "Delivery not available at this location" });
        }
        return res.status(200).json({ message: "Delivery available at this location", store });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}