const createRide = async (req, res) => {
    Ride.create(req.body)
    res.send('Rides created successfully!')
  }

  const getRides =  async (req, res) => {
    const rides = await Ride.find()
    res.send(rides)
  }

  const getRidesById = async (req, res) => {
    const ride = await Ride.findById(req.params.id)
    res.send(ride)
  }

  const editRidesById = async (req, res) => {
    await Ride.findByIdAndUpdate(req.params.id, req.body)
    res.send('Edited!')
  }


 const deleteRidesById =  async(req, res) => {
    await Ride.findByIdAndDelete(req.params.id)
    res.send('Deleted success!')
  }

  export { createRide, getRides, getRidesById, editRidesById, deleteRidesById }
