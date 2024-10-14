const PuzzlePiece = require("../../models/puzzleModel");
const User = require("../../models/userModel");

const UserPuzzle = require("../../models/userPuzzleModel");

const spinPuzzle = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (parseInt(user.spinChance, 10) <= 0) {
      return res.status(400).json({ message: "No spin chances left" });
    }

    const commonPieces = await PuzzlePiece.find({ is_rare: { $ne: true } });

    const rarePiece = await PuzzlePiece.findOne({ is_rare: true });

    if (commonPieces.length !== 8 || !rarePiece) {
      return res
        .status(500)
        .json({ message: "Invalid puzzle piece configuration" });
    }

    const userPuzzles = await UserPuzzle.find({
      user_id: userId,
      isShared: false,
    }).populate("puzzle_id");
    console.log("///", userPuzzles);
    console.log("//", userPuzzles.length);
    if (userPuzzles.length === 0) {
      console.log("888");
      const randomIndex = Math.floor(Math.random() * commonPieces.length);
      const firstPiece = commonPieces[randomIndex];

      await UserPuzzle.create({
        user_id: userId,
        puzzle_id: firstPiece._id,
        isShared: false,
      });

      user.spinChance = (parseInt(user.spinChance, 10) - 1).toString();
      await user.save();

      return res.status(200).json({
        message: "You received your first puzzle piece!",
        piece: firstPiece,
      });
    }

    let selectedPiece;
    const userCommonPieces = userPuzzles
      .filter((puzzle) => puzzle.puzzle_id && !puzzle.puzzle_id.is_rare)
      .map((puzzle) => puzzle.puzzle_id._id.toString());

    const uniqueCommonPieces = new Set(userCommonPieces);

    const oo = uniqueCommonPieces.length === commonPieces.length;
    // console.log("///",uniqueCommonPieces.size)
    // console.log("commonPieces.length", commonPieces.length)
    // console.log(";;;",oo)
    if (uniqueCommonPieces.size === commonPieces.length) {
      const spinOutcome = Math.random();
      console.log(".hhhhhhhhhhhhhhhhhhh..");

      if (spinOutcome < 0.05) {
        selectedPiece = rarePiece;
        console.log("..", selectedPiece);
      } else {
        const commonIndex = Math.floor((spinOutcome - 0.05) / 0.11875);
        selectedPiece = commonPieces[commonIndex];
        console.log(".....", selectedPiece);
      }
    } else {
      const spinOutcome = Math.random();
      const commonIndex = Math.floor(spinOutcome * commonPieces.length);
      selectedPiece = commonPieces[commonIndex];
    }
    console.log("///", selectedPiece);

    await UserPuzzle.create({
      user_id: userId,
      puzzle_id: selectedPiece._id,
      isShared: false,
    });

    user.spinChance = (parseInt(user.spinChance, 10) - 1).toString();
    await user.save();

    const userPuzzles2 = await UserPuzzle.find({
      user_id: userId,
      isShared: false,
    }).populate("puzzle_id");
    const uniquePuzzleCount = new Set(
      userPuzzles2.map((up) => up.puzzle_id.toString())
    ).size;

    const totalPuzzlePieces = await PuzzlePiece.countDocuments(); // Total unique pieces in the database
    console.log("///", totalPuzzlePieces);
    console.log("..", uniquePuzzleCount);

    if (uniquePuzzleCount === totalPuzzlePieces) {
      user.prizeChance += 1;
      await user.save();
      const pieces = [
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
      ];
      for (let piece of pieces) {
        console.log("piece", piece);

        const puzzle = await PuzzlePiece.findOne({ name: piece });

        if (!puzzle) {
          return res.status(500).json({ message: "Internal server error" });
        }
        await UserPuzzle.findOneAndDelete({
          user_id: userId,
          puzzle_id: puzzle._id,
        });
      }

      res.status(200).json({
        message: "Congratulations! You have collected all puzzle pieces!",
        piece: selectedPiece,
      });
    } else {
      res.status(200).json({ piece: selectedPiece });
    }
  } catch (error) {
    console.error("Error spinning puzzle:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { spinPuzzle };
