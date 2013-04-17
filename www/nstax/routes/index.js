
/*
 * GET users listing.
 */

exports.index = function(req, res, next){
   req.app.get('cassandra').cql('SELECT * FROM users LIMIT 10' , function(err, users){ //LIMIT 10
     if(err){
       return next(err);
     }

    res.render('index', { title: 'Users', users: users });
  });
};

exports.new = function(req, res, next){
  var insert = 'UPDATE users SET first_name=?, last_name=?, active=1 WHERE email=?',
      params = [req.body.first_name, req.body.last_name, req.body.email];

  req.app.get('cassandra').cql(insert,  params, function(err, users){
    if(err){
      return next(err);
    }

    res.redirect('/');
  });
};

exports.delete = function(req, res, next){
  var remove = 'UPDATE users SET active=0 WHERE email=?',
      params = [req.body.email];

  req.app.get('cassandra').cql(remove,  params, function(err, users){
    if(err){
      return next(err);
    }

    res.redirect('/');
  });
};