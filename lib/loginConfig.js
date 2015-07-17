SinglePageLogin.config({
      loginTitle: 'Login',
      signupTitle: 'Sign up',
      forgotPasswordTitle: 'Retrieve password',
      canRetrievePassword: true,
      passwordSignupFields: 'EMAIL_ONLY',
      forbidClientAccountCreation: true,
      routeAfterLogin: '/',
      routeAfterSignUp: '/',
      forceLogin: true,
      routeAfterLogout: '/',
      exceptRoutes: ['home']
  });