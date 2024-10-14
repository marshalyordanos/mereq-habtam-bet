
const Prize = require("../../models/prizeModel");
const UserPrize = require("../../models/userPrizeModel");
const AppErorr = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const mongoose = require('mongoose');

const createPrize = catchAsync(async (req, res, next)=>{
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  if (req.files?.image) {
    req.body.image = baseUrl + "/" +  req.files.image[0].filename;
  }
const prize = await Prize.create(req.body);
console.log( req.files.image[0])
res.status(201).json({
status:"success",
data:prize
})

});

const getPrize = catchAsync(async (req, res, next) => {
const prize = await Prize.findById({ _id: req.params.id });
if (!prize) {
return next(new AppErorr("There is not prize in this ID", 404));
}
res.status(200).json({ 
status: "success",
data: prize,
});
});

const getAllPrize = catchAsync(async (req, res, next) => {
    const prize = await Prize.find( );
    if (!prize) {
    return next(new AppErorr("There is not prize ", 404));
    }
    res.status(200).json({ 
    status: "success",
    data: prize,
    });
    });


const getPrizedUser = catchAsync(async (req, res, next) => {
  const prize = await UserPrize.find( );
  if (!prize) {
  return next(new AppErorr(" no data ", 404));
  }
  res.status(200).json({ 
  status: "success",
  data: prize,
  });
  });


const getUserhistory = catchAsync(async (req, res, next) => {
  const {userId} = req.params
  const prizeHistory = await UserPrize.find({user_id:userId});
  console.log("////",prizeHistory)
  if (!prizeHistory) {
  return next(new AppErorr(" no data ", 404));
  }
  res.status(200).json({ 
  status: "success",
  data: prizeHistory,
  });
  });
  



    const updatePrize = catchAsync(async (req, res, next) => {
      const { id } = req.params;
const baseUrl = `${req.protocol}://${req.get("host")}`;
if (req.files?.image) {
  req.body.image = baseUrl + "/" +  req.files.image[0].filename;
}    

      // Start a session for transaction
      const session = await mongoose.startSession();
      session.startTransaction();
    
      try {
        const prizee = await Prize.findById(id).session(session);
        if (!prizee) {
          await session.abortTransaction(); // Abort transaction if prize is not found
          session.endSession();
          return next(new AppError('Prize is not found!', 404));
        }
    
        // Check if count or prizeDuration has changed
        if (prizee.count !== req.body.count || prizee.prizeDuration !== req.body.prizeDuration) {
          req.body.initialDate = Date.now();  // Set initialDate in req.body
        }
    
        // Update the prize with the modified req.body data
        const prize = await Prize.findByIdAndUpdate(id, req.body, { new: true, session });
    
        if (!prize) {
          await session.abortTransaction(); // Abort transaction if the update fails
          session.endSession();
          return next(new AppError('Prize is not found!', 404));
        }
    
        // Commit the transaction
        await session.commitTransaction();
        session.endSession();
    
        // Return success response
        res.status(200).json({
          status: "success",
          message: "The prize is updated successfully!",
          data: prize
        });
    
      } catch (error) {
        // Abort transaction in case of an error
        await session.abortTransaction();
        session.endSession();
        return next(error);
      }
    });
    



const deletePrize = catchAsync(async (req, res, next) => {
const { id } = req.params;

const prize = await Prize.findByIdAndDelete(id)
if (!prize) {
  return next(new AppErorr('prize is not found!', 404))
}
res.status(205).json({
  status: "success",
  message: "The prize is  deleted!",
  data:null

})
});




module.exports = {
createPrize,
getPrize,
getAllPrize,
updatePrize,
deletePrize,
getPrizedUser,
getUserhistory

}


