# widgit.js
##### Library that provides small GitHub widgets to display various GitHub information directly into your website.
- Overview of GitHub account widget.
```html
<script type="text/javascript" src="src/js/widgit.js"></script>
```
####The overview widget.
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

####The repo list widget.

```html
<div class='another-classname></div>
```
Simply call the relevant widget function and pass it a location, your GitHub username and the amount of repos you wish to display
```javascript
<script>
    Widgit.overview(".another-classname", "markogrady1", 10);
</script>
```
This will result in the following widget.

![checkmark]( https://github.com/markogrady1/widgit.js/raw/master/demo/repo2.png)


***NOTE: widgets are still being constructed.***
