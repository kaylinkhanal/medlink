import Room from "../models/room.js";

const createRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json({
      message: 'Room created successfully!',
      data: room
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllRooms = async (req, res) => {
  try {
      const rooms = await Room.find().populate('landlord');
      return res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate('landlord');
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editRoomById = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('landlord');

    if (!updatedRoom) return res.status(404).json({ message: "Room not found" });

    res.json({
      message: 'Room updated successfully!',
      data: updatedRoom
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteRoomById = async (req, res) => {
  try {
    const deleted = await Room.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Room not found" });
    res.send('Room deleted successfully!');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createRoom,
  getAllRooms,
  getRoomById,
  editRoomById,
  deleteRoomById
};