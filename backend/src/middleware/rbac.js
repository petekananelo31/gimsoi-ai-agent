const rbacMiddleware = (req, res, next) => {
  const role = req.headers['x-user-role'];
  // Ensure role is present and valid
  const validRoles = ['PM/Exec', 'Team Lead', 'Intern', 'Client'];
  
  if (!role || !validRoles.includes(role)) {
    return res.status(403).json({ error: "Access Denied: Role context required." });
  }
  next();
};

module.exports = { rbacMiddleware };