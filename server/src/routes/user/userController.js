const User = require("../../models/userModel");
const AppErorr = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const UserPrize = require("../../models/userPrizeModel");
const UserPuzzle = require("../../models/userPuzzleModel");

const getUserAndPrizeStats = catchAsync(async (req, res, next) => {
  try {
    // 1. Count all users
    const userCount = await User.countDocuments({
      $or: [
        { email: "" }, // Condition for empty email
        { email: { $exists: false } }, // Condition for non-existent email
      ],
    });

    // 2. Sum the `count` field from the `Prize` model for all associated UserPrize entries
    const totalPrizeCount = await UserPrize.aggregate([
      {
        $lookup: {
          from: "prizes", // The `prizes` collection
          localField: "prize_id", // Field in UserPrize
          foreignField: "_id", // Field in Prize
          as: "prizeDetails", // Prize details array
        },
      },
      {
        $unwind: "$prizeDetails", // Unwind the prizeDetails array
      },
      {
        $group: {
          _id: null, // Group by null to sum all
          totalPrizeCount: { $sum: "$prizeDetails.count" }, // Sum the `count` field in Prize
        },
      },
    ]);

    // 3. Count all entries in the UserPrize table
    const userPrizeCount = await UserPrize.countDocuments();

    // Prepare the response
    res.status(200).json({
      status: "success",
      data: {
        totalUsers: userCount,
        totalPrizeCount:
          totalPrizeCount.length > 0 ? totalPrizeCount[0].totalPrizeCount : 0,
        totalUserPrizes: userPrizeCount,
      },
    });
  } catch (error) {
    console.error("Error fetching user and prize statistics:", error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching user and prize statistics",
    });
  }
});

const getAllUsersWithPrizesAndPuzzles = catchAsync(async (req, res, next) => {
  try {
    const users = await User.find({
      $or: [
        { email: "" }, // Condition for empty email
        { email: { $exists: false } }, // Condition for non-existent email
      ],
    })
      .populate({
        path: "userPrizes", // Populates the userPrizes virtual field
        populate: { path: "prize_id" }, // Populates prize details inside UserPrize
      })
      .populate("userPuzzles") // Populates the userPuzzles virtual field
      .exec();

    // If users are not found, send a 404 response
    if (!users || users.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No users found",
      });
    }

    // Return the users with their prizes and puzzles
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    console.error("Error fetching users with prizes and puzzles:", error);

    // Handle any unexpected error
    return res.status(500).json({
      status: "error",
      message: "An error occurred while fetching users",
    });
  }
});

const createUser = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    status: "success",
    data: user,
  });
});

const getUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);

  res.status(201).json({
    status: "success",
    data: user,
  });
});

const updateChances = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const amount = req.query.amount;

  const user = await User.findByIdAndUpdate(id, { spinChance: amount });

  res.status(201).json({
    status: "success",
    data: user,
  });
});

module.exports = {
  createUser,
  getUser,
  updateChances,
  getAllUsersWithPrizesAndPuzzles,
  getUserAndPrizeStats,
};
