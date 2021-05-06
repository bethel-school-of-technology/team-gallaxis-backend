'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "buySells", deps: []
 *
 **/

var info = {
    "revision": 2,
    "name": "buySell__migration",
    "created": "2021-04-30T21:18:48.030Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "buySells",
        {
            "PostId": {
                "type": Sequelize.INTEGER,
                "field": "PostId",
                "primaryKey": true,
                "autoIncrement": true,
                "allowNull": false
            },
            "PostTitle": {
                "type": Sequelize.STRING,
                "field": "PostTitle"
            },
            "PostBody": {
                "type": Sequelize.STRING,
                "field": "PostBody"
            },
            "UserId": {
                "type": Sequelize.INTEGER,
                "field": "UserId",
                "key": "UserId",
                "model": "users"
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            }
        },
        {}
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
