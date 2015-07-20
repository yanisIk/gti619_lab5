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

Router.route('/admin', { 
   name: 'admin',
}); 


Router.onBeforeAction(requireLogin, {only: ['carre', 'cercle', 'admin']});
Router.onBeforeAction(isAdminOrCarre, {only: ['carre']});
Router.onBeforeAction(isAdminOrCercle, {only: ['cercle']});
Router.onBeforeAction(isAdmin, {only: ['admin']});
