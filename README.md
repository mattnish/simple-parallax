simple-parallax
===============

Simple parallax plugin using css3 3DTransforms with the option to fade out.

Needs: `throttle.js` or another throttling function to prevent too many scroll events firing.

# To initialize

`$(id).parallaxScroll()`

# Params

```
$(id).parallaxScroll({
  rate: .5,
  opacity: true,
  opacitySpread: 500
})
```