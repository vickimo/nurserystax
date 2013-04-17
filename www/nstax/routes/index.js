
/*
 * GET users listing.
 */

exports.index = function(req, res, next){
   req.app.get('cassandra').cql('SELECT * FROM schools LIMIT 10' , function(err, schools){ //LIMIT 10
     if(err){
       return next(err);
     }

    res.render('index', { title: 'Schools', schools: schools });
  });
};

exports.new = function(req, res, next){
  var insert = 'INSERT into schools(state,email_domain,active, school_name, city) values (?, ?, 1, ?, ?)',
      params = [req.body.state, req.body.email_domain, req.body.school_name, req.body.city];

  req.app.get('cassandra').cql(insert,  params, function(err, schools){
    if(err){
      return next(err);
    }

    res.redirect('/');
  });
};

exports.delete = function(req, res, next){
  var remove = 'UPDATE schools SET active=0 WHERE school_name=? and city=?',
      params = [req.body.school_name, req.body.city];

  req.app.get('cassandra').cql(remove,  params, function(err, schools){
    if(err){
      return next(err);
    }

    res.redirect('/');
  });
};