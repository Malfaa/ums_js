/*
Auth.auth().addStateDidChangeListener { (auth, user) in
    if let user = user {
      let email = user.email
      // ...
    }
  }
  Auth.auth().signIn(withEmail: userEmail, password: password) { (user, error) in
    if let user = user {
      // ...
    }
  }

  */