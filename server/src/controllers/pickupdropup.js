import Booking from "../models/pickupdropup.js";


const createpickupdropup = async (req, res) => {
  try {
    const pickupdropup = await Booking.create(req.body);
    res.status(201).json({
      message: 'Pickup/Dropup created successfully!',
      data: pickupdropup
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllPickupDropups = async (req, res) => {
  try {

    if (req.query.action === "ambulance") {
      const bookings = await Booking.find({ type: "Ambulance" })
        .populate("user")
        .populate("hospital");

      return res.json(bookings);

    } else if (req.query.action === "emergency") {

      const bookings = await Booking.find({ type: "Emergency" })
        .populate("user")
        .populate("hospital");

      return res.json(bookings);

    } else {

      const bookings = await Booking.find()
        .populate("user")
        .populate("hospital");

      return res.json(bookings);
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get pickup/dropup by ID
const getPickupDropupById = async (req, res) => {
  try {

    const booking = await Booking.findById(req.params.id)
      .populate("user")
      .populate("hospital");

    if (!booking)
      return res.status(404).json({ message: "Pickup/Dropup not found" });

    res.json(booking);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Edit pickup/dropup
const editPickupDropupById = async (req, res) => {
  try {

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate("user")
      .populate("hospital");

    if (!updatedBooking)
      return res.status(404).json({ message: "Pickup/Dropup not found" });

    res.json({
      message: "Pickup/Dropup updated successfully!",
      data: updatedBooking
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Delete pickup/dropup
const deletePickupDropupById = async (req, res) => {
  try {

    const deleted = await Booking.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ message: "Pickup/Dropup not found" });

    res.json({
      message: "Pickup/Dropup deleted successfully!"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createpickupdropup,
    getAllPickupDropups,
    getPickupDropupById,
    editPickupDropupById,
    deletePickupDropupById
};  
