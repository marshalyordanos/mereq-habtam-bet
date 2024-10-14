
const User = require('../../models/userModel'); 
const Prize = require('../../models/prizeModel');
const userPrizeSchema = require('../../models/userPrizeModel');
const spinPrize = async (req, res, next) => {
  const { userId } = req.body;
  console.log(";;",userId)

  
  const user = await User.findById(userId);
  console.log("//",user)

  if (!user || user.prizeChance <= 0) {
    return res.status(404).json({ message: "No spin chances available for this user" });

  }

  const prizes = await Prize.find({ count: { $gt: 0 } });
  console.log("lll")

  
  const smallPrizes = prizes.filter(prize => !prize.isBig);
  const bigPrizes = prizes.filter(prize => prize.isBig);

  if (smallPrizes.length === 0 && bigPrizes.length === 0) {
    return res.status(400).json({ message: "No prizes available at this time" });

  }

  const randomChance = Math.random(); 
  let selectedPrize;

  if (randomChance <= 0.9 && smallPrizes.length > 0) {
   
    selectedPrize = smallPrizes[Math.floor(Math.random() * smallPrizes.length)];
  } else if (bigPrizes.length > 0) {
   
    selectedPrize = bigPrizes[Math.floor(Math.random() * bigPrizes.length)];
  }

 
  user.prizeChance -= 1;
  await user.save();

  await userPrizeSchema.create({ 
    user_id: userId,
    prize_id: selectedPrize._id,
    status:'inprogress',
    phoneNumber : user.phoneNumber,
    prizeName : selectedPrize.value,
  }
  );
  
  console.log("********8",selectedPrize)


  selectedPrize.count -= 1;
  await selectedPrize.save();


  
  res.status(200).json({
    status: 'success',
    data: {
      prize: selectedPrize,
      // award : selectedPrize.value
    },
  });
};

module.exports = { spinPrize };
