module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("Comments", {
    CommentBody: {
      // colum number one in our database
      type: DataTypes.STRING,
      allowNull: false,
    },
    Username : {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Comments;
};
