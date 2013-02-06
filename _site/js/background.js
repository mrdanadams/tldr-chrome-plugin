(function() {
  var changes, chrome, fire, last, q, re, t, url, window;

  chrome = this.chrome;

  window = this;

  last = null;

  t = null;

  changes = 0;

  q = null;

  re = /<a class="l" href="([^\"]+)"/i;

  url = null;

  fire = function() {
    var req;
    if (q.length < 3 || ((last != null) && q === last)) {
      return;
    }
    last = q;
    req = new XMLHttpRequest();
    req.open("GET", "http://www.google.com/custom?q=" + q, true);
    req.onreadystatechange = function() {
      var m, text, u;
      if (req.readyState === 4) {
        text = req.responseText;
        m = re.exec(text);
        if (!m) {
          return;
        }
        u = m[1];
        if ((url != null) && u === url) {
          return;
        }
        url = u;
        chrome.tabs.update(null, {
          url: url
        });
        return changes += 1;
      }
    };
    return req.send(null);
  };

  chrome.omnibox.onInputStarted.addListener(function() {
    last = null;
    t = null;
    changes = 0;
    return q = null;
  });

  chrome.omnibox.onInputChanged.addListener(function(text) {
    if (t != null) {
      window.clearTimeout(t);
    }
    q = text;
    return t = window.setTimeout(fire, 250);
  });

  chrome.omnibox.onInputCancelled.addListener(function() {
    if (changes > 0) {
      return chrome.tabs.executeScript(null, {
        code: "history.go(-" + changes + ");"
      });
    }
  });

}).call(this);
