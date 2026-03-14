const Address = require("../models/address_model");

exports.setAddress = async (req, res) => {
  try {

    const { user, phone, address, lat, lng, note } = req.body;

    const newAddress = await Address.create({
      user,
      phone,
      address,
      note,
      location: { lat, lng }
    });

    res.json({
      status: 1,
      message: "Address created",
      data: newAddress
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserAddresses = async (req, res) => {
  try {

    const { userId } = req.params;

    const addresses = await Address.find({
      user: userId,
      is_deleted: false
    }).sort({ createdAt: -1 }).populate("user", "email") // populate user and only return email (you can add more fields);

    res.json({
      status: 1,
      data: addresses
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAddress = async (req, res) => {
  try {

    const { addressId } = req.params;

    const address = await Address.findByIdAndUpdate(
      addressId,
      req.body,
      { new: true }
    );

    res.json({
      status: 1,
      message: "Address updated",
      data: address
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};