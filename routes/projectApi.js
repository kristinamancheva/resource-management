/**
 * Created by Polar Cape on 11-Sep-15.
 */
var bookshelf = require('../bookshelf');

bookshelf.knex.schema.hasTable('project').then(function(exists) {
    if(!exists) {
        bookshelf.knex.schema.createTable('project', function(project) {
            project.increments('id').primary();
            project.string('name');
            project.text('description');
            project.date('from');
            project.date('to');
            project.boolean('active');
        }).then(function(table){
            console.log('Created Table:', table);
        });
    }

});

var Project = bookshelf.Model.extend({
    tableName: 'project'
});

// GET
exports.projects = function (req, res) {
    new Project()
        .fetchAll()
        .then(function(projects) {
            res.send(projects.toJSON());
        }).catch(function(error) {
            console.log(error);
            res.send('An error occured');
        });
};

//GET BY ID
exports.project = function (req, res) {
    var id = req.params.id;
    new Project()
        .query('where', 'id', '=', id)
        .fetchAll()
        .then(function(project) {
            res.send(project.toJSON());
        }).catch(function(error) {
            console.log(error);
            res.send('An error occured');
        });
};

//POST
exports.addProject = function(req, res){
    var name = req.body.name;
    var desc = req.body.description;
    var from = req.body.from;
    var to = req.body.to;
    new Project()
        .save({
            name: name,
            description: desc,
            from: from,
            to: to,
            active: '1'
        })
        .then(function(project) {
            res.send(project.toJSON());
        }).catch(function(error) {
            console.log(error);
            res.send('An error occured');
        });
};

//PUT
exports.updateProject = function(req, res){
    var id = req.body.id;
    var name = req.body.name;
    var desc = req.body.description;
    var from = req.body.from;
    var to = req.body.to;
    new Project()
        .query('where', 'id', '=', id)
        .fetch()
        .then(function(project) {
            project
                .save({
                    name: name,
                    description: desc,
                    from: from,
                    to: to,
                    active: '1'
                })
                .then(function(project) {
                    res.send(project.toJSON());
                }).catch(function(error) {
                    console.log(error);
                    res.send('An error occured');
                });
        }).catch(function(error) {
            console.log(error);
            res.send('An error occured');
        });
};

//PUT - mark project that it is done
exports.markDoneProject = function(req, res){
    var id = req.body.id;
    new Project()
        .query('where', 'id', '=', id)
        .fetch()
        .then(function(project) {
            project
                .save({
                    valid: '0'
                })
                .then(function(project) {
                    res.send(project.toJSON());
                }).catch(function(error) {
                    console.log(error);
                    res.send('An error occured');
                });
        }).catch(function(error) {
            console.log(error);
            res.send('An error occured');
        });
};


