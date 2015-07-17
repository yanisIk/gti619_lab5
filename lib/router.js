Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/', { 
   name: 'home'
}); 

Router.route('/carre', { 
   name: 'carre',
   authorize: {
   		allow: isAdminOrCarre()
   }
}); 

Router.route('/cercle', { 
   name: 'cercle',
   authorize: {
   		allow: isAdminOrCercle()
   }
}); 


Router.onBeforeAction(requireLogin, {only: ['carre', 'cercle', 'adminPanel']);