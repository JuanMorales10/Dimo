
const {Service} = require('../database/models')

const serviceController = {
    showIndex: (req, res) => {
      // res.render("./main/index", {user: req.session.user });
    },
    showAboutUs: (req, res) => {
      // res.render('./main/nosotros', {user: req.session.user });
  },
  };
  
  module.exports = serviceController;
