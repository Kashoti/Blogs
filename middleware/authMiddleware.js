import jwt from 'jsonwebtoken';


export const verifyToken = (req, res, next) => {
  try{
    //Get tokenfrom Authorization header

    const authHeader = req.headers.authorization;
    
    if(!authHeader){
      return res.status(401).json({ error: 'Authorization header missing' });
    }

    // Format Bearer token 
    const token = authHeader.split(" ")[1];

    if(!token){
      return res.status(401).json({ error: "login required"});
    }

    //Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;


    next();

  } catch (error){
    res.status(401).json({ error: "Invalid or expired token", details: error.message });
  }


};