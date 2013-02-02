(function() {

  $(function() {
    var $frame, $q, fire, last, url;
    $frame = $('#frame');
    $q = $('#q');
    last = null;
    url = null;
    fire = function() {
      var q;
      q = $q.val();
      if (q.length < 3 || ((last != null) && q === last)) {
        return;
      }
      last = q;
      return $.ajax({
        url: "http://www.google.com/custom?q=" + q,
        method: "GET",
        success: function(data) {
          var $a, h;
          $a = $(data).find('li a.l').first();
          if (!$a.length) {
            return;
          }
          h = $frame.height();
          url = $a.attr('href');
          return $frame.html("<iframe src=\"" + url + "\" width=\"100%\" height=\"" + h + "px\"></iframe>");
        }
      });
    };
    fire = _.debounce(fire, 250);
    return $q.focus().on('keydown', function(e) {
      if (e.keyCode === 13) {
        window.location.href = url;
      } else {
        fire();
      }
      return true;
    });
  });

}).call(this);
