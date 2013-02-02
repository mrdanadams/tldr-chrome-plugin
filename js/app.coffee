---
---

$ ->
  $frame = $('#frame')
  $q = $('#q')

  fire = ->
    q = $q.val()
    return unless q.length
    $frame.html """<iframe src="http://www.google.com/custom?q=#{q}&btnI"></iframe>"""
    # $.ajax
    #   url: "http://www.google.com/custom?q=foobar"
    #   method: "GET"
    #   success: (data) -> console.log data

  fire = _.debounce(fire, 250)

  $q.focus().on 'keydown', (e) -> fire(); true
    # e.keyCode == 13 is enter

  # 