"use strict";

const employee = require('../models').employee;

exports.list = function (req, res) {
  employee.findAll().then(employee => {
    res.jsonp(employee);
  }).catch((error) => res.status(400).send(error));
};

exports.create = function (req, res) {
  res.jsonp(employee.create(req.body));
};

exports.findById = function (req, res) {
  let id = req.params.id;
  employee.findById(id).then(employee => {
    if (!employee) {
      return res.status(400).send({
        message: 'employee Not Found',
      });
    }
    res.jsonp(employee);
  });
};

exports.delete = function (req, res) {
  let id = req.params.id;
  employee.findById(req.params.id)
    .then(employee => {
      if (!employee) {
        return res.status(400).send({
          message: 'Employee Not Found',
        });
      }
      return employee
        .destroy()
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
};