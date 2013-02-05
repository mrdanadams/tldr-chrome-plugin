---
---

chrome = @chrome
window = this

$ ->
  # TODO remove zepto?
  $q = $('#q')

  last = null
  url = null
  t = null

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
        # TODO using the history api so you don't crush your history
        chrome.tabs.update null, {url: url}

  $q.focus().on 'keydown', (e) ->
    if e.keyCode == 13 || e.keyCode == 27 # enter or esc
      window.close()
    else
      # don't query until the user has stopped typing
      window.clearTimeout(t) if t? 
      t = window.setTimeout fire, 250

    true
