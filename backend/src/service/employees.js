"use strict";

const employees = require('../models').employees;

exports.list = function (req, res) {
  employees.findAll().then(employees => {
    res.jsonp(employees);
  }).catch((error) => res.status(400).send(error));
};

exports.create = function (req, res) {
  res.jsonp(employees.create(req.body));
};

exports.findById = function (req, res) {
  let id = req.params.id;
  employees.findById(id).then(employees => {
    if (!employees) {
      return res.status(400).send({
        message: 'Employee Not Found',
      });
    }
    res.jsonp(employees);
  });
};

exports.delete = function (req, res) {
  let id = req.params.id;
  employees.findById(req.params.id)
    .then(employees => {
      if (!employees) {
        return res.status(400).send({
          message: 'Employee Not Found',
        });
      }
      return employees
        .destroy()
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
};