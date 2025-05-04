import Hall from '../models/hallModel.js';

// ✅ GET /api/halls?location=xyz
export const getAllHalls = async (req, res) => {
  try {
    const { location } = req.query;

    const filter = location && location !== "All" ? { location } : {};
    const halls = await Hall.find(filter);

    res.status(200).json(halls);
  } catch (err) {
    res.status(500).json({ message: "Error fetching halls", error: err.message });
  }
};

// ✅ GET /api/halls/:id
export const getHallById = async (req, res) => {
  try {
    const hall = await Hall.findById(req.params.id);

    if (!hall) {
      return res.status(404).json({ message: "Hall not found" });
    }

    res.status(200).json(hall);
  } catch (err) {
    res.status(500).json({ message: "Error getting hall", error: err.message });
  }
};

// ✅ POST /api/halls
export const createHall = async (req, res) => {
  try {
    const newHall = new Hall(req.body);
    const savedHall = await newHall.save();

    res.status(201).json(savedHall);
  } catch (err) {
    res.status(500).json({ message: "Error creating hall", error: err.message });
  }
};

// ✅ PUT /api/halls/:id
export const updateHall = async (req, res) => {
  try {
    const updatedHall = await Hall.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedHall) {
      return res.status(404).json({ message: "Hall not found" });
    }

    res.status(200).json(updatedHall);
  } catch (err) {
    res.status(500).json({ message: "Error updating hall", error: err.message });
  }
};

// ✅ DELETE /api/halls/:id
export const deleteHall = async (req, res) => {
  try {
    const deletedHall = await Hall.findByIdAndDelete(req.params.id);

    if (!deletedHall) {
      return res.status(404).json({ message: "Hall not found" });
    }

    res.status(200).json({ message: "Hall deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting hall", error: err.message });
  }
};
