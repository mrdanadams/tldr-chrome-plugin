---
---

chrome = @chrome
window = this

$ ->
  # TODO remove zepto?
  $q = $('#q')

  last = null
  t = null
  changes = 0

  fire = ->
    q = $q.val()
    return if q.length < 3 || (last? && q == last)
    last = q # don't search the same thing repeatedly

    $.ajax
      url: "http://www.google.com/custom?q=#{q}"
      method: "GET"
      success: (data) ->
        $a = $(data).find('li a.l').first()
        return unless $a.length

        url = $a.attr('href')
        chrome.tabs.update null, {url: url}
        changes += 1

  $q.focus().on 'keydown', (e) ->
    if e.keyCode == 13 # enter
      window.close()
    else if e.keyCode == 27 # esc
      if changes > 0
        chrome.tabs.executeScript null, {code:"history.go(-#{changes});"}
      window.close()
    else
      # don't query until the user has stopped typing
      window.clearTimeout(t) if t?
      t = window.setTimeout fire, 250

    true
