SinglePageLogin.config({
      loginTitle: 'Login',
      signupTitle: 'Sign up',
      forgotPasswordTitle: 'Retrieve password',
      canRetrievePassword: true,
      passwordSignupFields: 'USERNAME_ONLY',
      forbidClientAccountCreation: true,
      routeAfterLogin: '/',
      routeAfterSignUp: '/',
      forceLogin: true,
      routeAfterLogout: '/',
      exceptRoutes: ['home']
  });