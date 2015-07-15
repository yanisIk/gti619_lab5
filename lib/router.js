Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { 
    return [Meteor.subscribe('notifications')]
  }
});

Router.route('/', { 
   name: 'home'
}); 


//Router.onBeforeAction(requireLogin, {only: 'carre'});