(function() {
  var chrome, window;

  chrome = this.chrome;

  window = this;

  $(function() {
    var $q, fire, last, t, url;
    $q = $('#q');
    last = null;
    url = null;
    t = null;
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
          var $a;
          $a = $(data).find('li a.l').first();
          if (!$a.length) {
            return;
          }
          url = $a.attr('href');
          return chrome.tabs.update(null, {
            url: url
          });
        }
      });
    };
    return $q.focus().on('keydown', function(e) {
      if (e.keyCode === 13 || e.keyCode === 27) {
        window.close();
      } else {
        if (t != null) {
          window.clearTimeout(t);
        }
        t = window.setTimeout(fire, 250);
      }
      return true;
    });
  });

}).call(this);
