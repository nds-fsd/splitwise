// const validateObjectId = (paramName) => (req, res, next) => {
//     const id = req.params[paramName];

//     if (!mongoose.isValidObjectId(id)) {
//         return res.status(400).json({ message: `Invalid ${paramName} ID` });
//     }

//     next();
// };

// module.exports = validateObjectId;
