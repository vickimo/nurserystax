
/*
 * GET users listing.
 */

exports.index = function(req,res,next) {
	res.render('index', { title: 'Improving Communication Among Parents and Nurseries'});
};

exports.list_schools = function(req, res, next){
   req.app.get('cassandra').cql('SELECT * FROM schools LIMIT 10' , function(err, schools){ //LIMIT 10
     if(err){
       return next(err);
     }

    res.render('create_school', { title: 'Schools', schools: schools });
  });
};

exports.make_school = function(req, res, next){
  if (req.body.email_domain) {
	  var insert = 'INSERT into schools(state,email_domain,active, school_name, city) values (?, ?, 1, ?, ?)',
	      params = [req.body.state, req.body.email_domain, req.body.school_name, req.body.city];

	  req.app.get('cassandra').cql(insert,  params, function(err, schools){
	    if(err){
	      return next(err);
	    }

	  });
	}
	process.stdout.write(req.body.school_name);
	process.stdout.write(req.body.city);
   req.app.get('cassandra').cql('SELECT * FROM classes LIMIT 10' , function(err, all_classes){ //LIMIT 10
     if(err){
       return next(err);
     }

    res.render('create_class', { title: 'this title',school: req.body.school_name, city: req.body.city, all_classes: all_classes });
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