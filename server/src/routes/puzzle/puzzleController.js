const Puzzle = require("../../models/puzzleModel");
const AppErorr = require("../../utils/appError");
const UserPuzzle = require("../../models/userPuzzleModel");
const catchAsync = require("../../utils/catchAsync");
const { default: mongoose } = require("mongoose");
const createPuzzle = catchAsync(async (req, res, next) => {
  const puzzle = await Puzzle.create(req.body);

  res.status(201).json({
    status: "success",
    data: puzzle,
  });
});

const getPuzzle = catchAsync(async (req, res, next) => {
  const puzzle = await Puzzle.findById({ _id: req.params.id });
  if (!puzzle) {
    return next(new AppErorr("There is not puzzle in this ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: puzzle,
  });
});

const getAllPuzzle = catchAsync(async (req, res, next) => {
  const puzzle = await Puzzle.find();
  if (!puzzle) {
    return next(new AppErorr("There is not puzzle ", 404));
  }
  res.status(200).json({
    status: "success",
    data: puzzle,
  });
});

const getAllPuzzlePerUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const userObjectId = new mongoose.Types.ObjectId(userId);

  const results = await Puzzle.aggregate([
    {
      $lookup: {
        from: "userpuzzles",
        let: { puzzleId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$puzzle_id", "$$puzzleId"] },
                  { $eq: ["$user_id", new mongoose.Types.ObjectId(userId)] },
                  { $ne: ["$isShared", true] },
                ],
              },
            },
          },
        ],
        as: "userPuzzles",
      },
    },
    {
      $project: {
        id: "$_id",
        name: 1,
        count: { $size: "$userPuzzles" },
      },
    },
    {
      $project: {
        _id: 0,
        id: 1,
        name: 1,
        count: 1,
      },
    },
  ]);

  if (!results || results.length === 0) {
    return next(new AppError("There are no puzzles for this user", 404));
  }

  res.status(200).json({
    status: "success",
    data: results,
  });
});

const updatePuzzle = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const puzzle = await Puzzle.findByIdAndUpdate(id, req.body, { new: true });
  if (!puzzle) {
    return next(new AppErorr("puzzle is not found!", 404));
  }

  res.status(201).json({
    status: "success",
    message: "The Puzzle is updated successfully!",
    data: puzzle,
  });
});

const deletePuzzle = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const puzzle = await Puzzle.findByIdAndDelete(id);
  if (!puzzle) {
    return next(new AppErorr("puzzle is not found!", 404));
  }
  res.status(205).json({
    status: "success",
    message: "The Puzzle is  deleted!",
    data: null,
  });
});

module.exports = {
  createPuzzle,
  getPuzzle,
  updatePuzzle,
  getAllPuzzlePerUser,
  deletePuzzle,
  getAllPuzzle,
};
