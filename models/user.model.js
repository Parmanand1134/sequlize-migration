module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        city: {
            type: DataTypes.STRING, // New column
            allowNull: true,
        },
    }, {
        timestamps: true,
    });

    User.associate = (models) => {
        User.hasOne(models.Profile, {
            foreignKey: 'userId',
            as: 'profile',
            onDelete: 'CASCADE',
        });
    };

    return User;
};
