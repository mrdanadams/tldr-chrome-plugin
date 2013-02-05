(function() {
  var chrome, window;

  chrome = this.chrome;

  window = this;

  $(function() {
    var $q, changes, fire, last, t;
    $q = $('#q');
    last = null;
    t = null;
    changes = 0;
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
          var $a, url;
          $a = $(data).find('li a.l').first();
          if (!$a.length) {
            return;
          }
          url = $a.attr('href');
          chrome.tabs.update(null, {
            url: url
          });
          return changes += 1;
        }
      });
    };
    return $q.focus().on('keydown', function(e) {
      if (e.keyCode === 13) {
        window.close();
      } else if (e.keyCode === 27) {
        if (changes > 0) {
          chrome.tabs.executeScript(null, {
            code: "history.go(-" + changes + ");"
          });
        }
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
