// our first database table will be Posts, which will have three columns: title, postText, and Username.
module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
        title: { // colum number one in our database
            type: DataTypes.STRING,
            allowNull: false,
        },
        postText: { // colum number two
            type: DataTypes.STRING,
            allowNull: false,
        },
        Username: { // colum number three 
            type: DataTypes.STRING,
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
          }
    });

    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            onDelete: "cascade", // when we delete the post all comments assosiated with it will be deleted
        });
        Posts.hasMany(models.Likes, {
            onDelete: "cascade", 
        });
    };
    return Posts;
};