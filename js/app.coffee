---
---

$ ->
  $frame = $('#frame')
  $q = $('#q')

  last = null
  url = null

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

        h = $frame.height()
        url = $a.attr('href')
        $frame.html """<iframe src="#{url}" width="100%" height="#{h}px"></iframe>"""

  fire = _.debounce(fire, 250)

  $q.focus().on 'keydown', (e) ->
    if e.keyCode == 13 # enter
      window.location.href = url
    else
      fire()

    true
