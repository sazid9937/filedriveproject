const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');

app.use(ClerkExpressWithAuth({ apiKey: 'pk_test_bW9yZS1lbXUtODEuY2xlcmsuYWNjb3VudHMuZGV2JA' }));
