const axios = require('axios');
require('dotenv').config();

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