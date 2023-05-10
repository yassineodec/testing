var sqlMap = {
  user: {
    select: "select * from user",
    add: "insert into user (username, email, password) values (?,?,?)",
  },
  data: {},
};

module.exports = sqlMap;
