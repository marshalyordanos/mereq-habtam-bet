const User = require('../../models/userModel');
const UserPuzzle = require('../../models/userPuzzleModel');
const Puzzle = require('../../models/puzzleModel');
const AppError = require('../../utils/appError');

const sharePuzzle = async (req, res, next) => {
  try {
    const { phoneNumber, puzzleId, userId } = req.body;

    
    let recipientUser = await User.findOne({ phoneNumber });
    if (!recipientUser) {
    
      recipientUser = new User({
        phoneNumber
      });
      await recipientUser.save();
      console.log(`New user created with phone number: ${phoneNumber}`);
    }

    const sharingUser = await User.findById(userId);
    if (!sharingUser) {
      return next(new AppError("Sharing user not found", 404));
    }

    const puzzle = await Puzzle.findById(puzzleId);
    if (!puzzle) {
      return next(new AppError("Puzzle not found", 404));
    }

    const senderPuzzle = await UserPuzzle.findOne({
      user_id: sharingUser._id,
      puzzle_id: puzzleId,
      isShared: false,
    });

    if (!senderPuzzle) {
      return res.status(400).json({
        status: 'fail',
        message: 'No unshared puzzle found for the sender to share.',
      });
    }


    senderPuzzle.isShared = true;
    await senderPuzzle.save();

    
    const newSharedPuzzle = await UserPuzzle.create({
      user_id: recipientUser._id,
      puzzle_id: puzzleId,
      isShared: false,  
      sharedBy: sharingUser._id,
    });

    
    res.status(200).json({
      status: 'success',
      message: 'Puzzle shared successfully!',
      data: {
        sharedPuzzle: newSharedPuzzle,
      },
    });
  } catch (error) {
    console.error("Error sharing puzzle:", error);
    next(error);
  }
};

module.exports = { sharePuzzle };
