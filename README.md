# widgit.js
##### Library that provides small GitHub widgets to display various GitHub information.
- Overview of GitHub account widget.
```html
<script type="text/javascript" src="src/js/widgit.js"></script>
```
```html
<div class='some-classname></div>
```
Simply call the relevant widget function and pass it a location and your GitHub username
```javascript
<script>
    Widgit.overview(".some-classname", "markogrady1");
</script>
```
This will result in the following widget.

![checkmark]( https://github.com/markogrady1/widgit.js/raw/master/demo/overview.png)

***NOTE: widgets are still being constructed.***
