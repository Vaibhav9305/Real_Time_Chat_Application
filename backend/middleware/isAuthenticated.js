import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decode) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Authentication failed" });
  }
};

export default isAuthenticated;


// import jwt from "jsonwebtoken";

// const isAuthenticated = async (req, res, next) => {
//   try {
//     // 1️⃣ Try to get token from cookies
//     let token = req.cookies?.token;

//     // 2️⃣ If token not in cookies, try Authorization header (Bearer token)
//     if (!token && req.headers.authorization) {
//       const authHeader = req.headers.authorization;
//       if (authHeader.startsWith("Bearer ")) {
//         token = authHeader.split(" ")[1];
//       }
//     }

//     if (!token) {
//       return res.status(401).json({ message: "User not authenticated" });
//     }

//     // 3️⃣ Verify token
//     const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

//     if (!decode) {
//       return res.status(401).json({ message: "Invalid token" });
//     }

//     // 4️⃣ Attach user ID to request object
//     req.id = decode.userId;
//     next();
//   } catch (error) {
//     console.log(error);
//     return res.status(401).json({ message: "Authentication failed" });
//   }
// };

// export default isAuthenticated;
