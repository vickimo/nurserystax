
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

exports.select_school = function(req, res, next){
  if (req.body.email_domain) {
    var insert = 'INSERT into schools(state,email_domain,active, school_name, city) values (?, ?, 1, ?, ?)',
        params = [req.body.state, req.body.email_domain, req.body.school_name, req.body.city];

    req.app.get('cassandra').cql(insert,  params, function(err, schools){
      if(err){
        return next(err);
      }

    });
  }

  var select = 'SELECT * FROM classes where school_name=? and city=? LIMIT 10 allow filtering',
      params = [req.body.school_name, req.body.city];
  // process.stdout.write(select);
  req.app.get('cassandra').cql(select, params, function(err, all_classes){ //LIMIT 10
    if(err){
      return next(err);
    }

    res.render('create_class', { title: 'this title',school: req.body.school_name, city: req.body.city, all_classes: all_classes });
  });
};

/* edit this next so that class id works */
exports.select_class = function(req, res, next){
  if (req.body.teacher_email) {
  	class_id = 1
    var insert = 'INSERT into classes(school_name, city, teacher_name,teacher_email,class_year_start,class_year_end,min_age,max_age,est_enrollment,class_id,active) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)',
        params = [req.body.school_name, req.body.city, req.body.teacher_name, req.body.teacher_email, parseInt(req.body.class_year_start), parseInt(req.body.class_year_end), parseFloat(req.body.min_age), parseFloat(req.body.max_age), parseInt(req.body.est_enrollment), class_id];
    process.stdout.write(insert);
    req.app.get('cassandra').cql(insert,  params, function(err, schools){
      if(err){
        return next(err);
      }

    });
    res.render('enroll_class', {title:'this title', cid: class_id})
  }
  else {
  	class_id = req.body.class_id;
    res.render('enroll_class', { title: 'this title', cid: class_id });
  }

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