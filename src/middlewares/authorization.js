export const authorizeAdmin = (req, res, next) => {
  console.log("authorizeAdmin");
  if (req.user.role === "admin") {
    next();
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
};
