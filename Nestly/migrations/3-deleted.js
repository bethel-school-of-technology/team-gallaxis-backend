'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "Deleted" to table "buySells"
 *
 **/

var info = {
    "revision": 3,
    "name": "deleted",
    "created": "2021-05-14T02:07:02.848Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "buySells",
        "Deleted",
        {
            "type": Sequelize.BOOLEAN,
            "field": "Deleted"
        }
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
