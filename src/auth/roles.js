const ROLES = {
  admin: 1,
  manager: 2,
};

const isNotAdmin = (user) => user.role !== ROLES.admin;

module.exports = {
  ROLES,
  isNotAdmin,
};
