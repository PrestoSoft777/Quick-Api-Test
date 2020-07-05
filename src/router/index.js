const express = require('express');
const Router = express.Router();
const Page = require('../models/page');

function seed() {
  let data = [{title: '1', body: 'Lorem ipsum dolor sit amet'}, {title: '2', body: 'Lorem ipsum dolor sit amet'}, {title: '3', body: 'Lorem ipsum dolor sit amet'}, {title: '4', body: 'Lorem ipsum dolor sit amet'}];
  Page.deleteMany({}, (err) => {
    if(err) {
      console.log(err);
    } else {
      data.forEach((seed) => {
        Page.create(seed, (err) => {
          if(err) {
            console.log(err);
          }
        });
      });
    }
  });
  console.log('seed successful');
}
seed();

Router.route('/')
  .get((req, res) => {
    res.render('index');
  })
;

Router.route('/page')
  .get((req, res) => {
    Page.find({}, (err, page) => {
      if(err) {
        console.log(err);
      } else {
        res.render('page', {page:page});
      }
    });
  })
  .post((req, res) => {
    Page.create(req.body.post, (err) => {
      if(err) {
        console.log(err);
      } else {
        res.redirect('/page');
      }
    });
  })
;

Router.route('/page/new')
  .get((req, res) => {
    res.render('new');
  })
;

Router.route('/page/:id')
  .get((req, res) => {
    Page.findById(req.params.id, (err, page) => {
      if(err) {
        console.log(err)
      } else {
        res.render('show', { page:page });
      }
    })
  })
  .delete((req, res) => {
    Page.findByIdAndRemove(req.params.id, (err) => {
      if(err) {
        console.log(err);
      } else {
        res.redirect('/page');
      }
    })
  })
  .put((req, res) => {
    Page.findByIdAndUpdate(req.params.id, req.body.post, (err, page) => {
      if(err) {
        console.log(err);
      } else {
        console.log('Updated successfully')
        res.redirect('/page/' + req.params.id);
      }
    })
  })
;

Router.route('/page/:id/edit')
  .get((req, res) => {
    Page.findById(req.params.id, (err, page) => {
      if(err) {
        console.log(err);
      } else {
        res.render('edit', { page:page });
      }
    })
  })
;

module.exports = Router;
