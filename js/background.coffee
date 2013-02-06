---
---

chrome = @chrome
window = this

last = null
t = null
changes = 0
q = null
re = /<a class="l" href="([^\"]+)"/i
url = null

fire = ->
  return if q.length < 3 || (last? && q == last)
  last = q # don't search the same thing repeatedly

  req = new XMLHttpRequest()
  # req.overrideMimeType('text/xml')
  req.open "GET", "http://www.google.com/custom?q=#{q}", true
  req.onreadystatechange = ->
    if req.readyState == 4
      text = req.responseText
      m = re.exec(text)
      return unless m

      u = m[1]
      return if url? && u == url
      url = u
      chrome.tabs.update null, {url: url}
      changes += 1

  req.send(null)

chrome.omnibox.onInputStarted.addListener ->
  last = null
  t = null
  changes = 0
  q = null

chrome.omnibox.onInputChanged.addListener (text) ->
  # don't query until the user has stopped typing
  window.clearTimeout(t) if t?
  q = text
  t = window.setTimeout fire, 250

# chrome.omnibox.onInputEntered.addListener (q) ->
  # nothing

chrome.omnibox.onInputCancelled.addListener ->
  if changes > 0
    chrome.tabs.executeScript null, {code:"history.go(-#{changes});"}
