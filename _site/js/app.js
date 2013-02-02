(function() {

  $(function() {
    var $frame, $q, fire;
    $frame = $('#frame');
    $q = $('#q');
    fire = function() {
      var q;
      q = $q.val();
      if (!q.length) {
        return;
      }
      return $frame.html("<iframe src=\"http://www.google.com/custom?q=" + q + "&btnI\"></iframe>");
    };
    fire = _.debounce(fire, 250);
    return $q.focus().on('keydown', function(e) {
      fire();
      return true;
    });
  });

}).call(this);
