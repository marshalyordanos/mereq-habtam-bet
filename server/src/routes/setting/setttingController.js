
const Setting = require("../../models/settingModel");
const AppErorr = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");






const createSetting = catchAsync(async (req, res, next)=>{

const setting = await Setting.create(req.body);

res.status(201).json({
status:"success",
data:setting
})

});

const getSetting = catchAsync(async (req, res, next) => {
const setting = await Setting.findById({ _id: req.params.id });
if (!setting) {
return next(new AppErorr("There is not setting in this ID", 404));
}
res.status(200).json({ 
status: "success",
data: setting,
});
});


const updateSetting = catchAsync(async (req, res, next) => {

const { id } = req.params;

const setting = await Setting.findByIdAndUpdate(id,req.body,{new:true})
if (!setting) {
  return next(new AppErorr('setting is not found!', 404))
}

res.status(201).json({
  status: "success",
  message: "The setting is updated successfully!",
  data:setting

})
});






module.exports = {
createSetting,
getSetting,
updateSetting

}


