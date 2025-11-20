// import jwt from "jsonwebtoken";
// import  User from "../models/User.js"; 

// __define-ocg__ middleware for protecting routes
// export const protect = async (req, res, next) => {
//   let token;
//   let varOcg; // required variable name (used as temporary token holder)

//   //  Check if token exists in Authorization header
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       //  Extract token
//       varOcg = req.headers.authorization.split(" ")[1];
//       token = varOcg;

//       // Verify token using secret key
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // Attach user data (excluding password) to request
//       req.user = await User.findById(decoded.id).select("-password");

//       //  Move to next middleware / controller
//       next();
//     } catch (error) {
//       console.error("Token verification failed:", error.message);
//       res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   } else {
//     res.status(401).json({ message: "Not authorized, no token" });
//   }
// };

// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// export const protect = async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       req.user = await User.findById(decoded.id).select("-password");

//       next();
//     } catch (err) {
//       return res.status(401).json({ message: "Not authorized, invalid token" });
//     }
//   }

//   if (!token) {
//     return res.status(401).json({ message: "Not authorized, no token" });
//   }
// };


import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);


      // ✅ Use decoded data directly
      req.user = { _id: decoded.id };

      return next();
    } catch (err) {
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  }

  return res.status(401).json({ message: "Not authorized, no token" });
};

