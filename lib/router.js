Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

//Router.onBeforeAction('authorize');

Router.route('/', { 
   name: 'home',
}); 

Router.route('/carre', { 
   name: 'carre',
}); 

Router.route('/cercle', { 
   name: 'cercle',
}); 

Router.route('/adminlab', { 
   name: 'adminlab',
}); 


Router.onBeforeAction(requireLogin, {only: ['carre', 'cercle', 'adminlab']});
Router.onBeforeAction(isAdminOrCarre, {only: ['carre']});
Router.onBeforeAction(isAdminOrCercle, {only: ['cercle']});
Router.onBeforeAction(isAdmin, {only: ['adminlab']});
