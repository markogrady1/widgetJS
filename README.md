# widget.js
##### Library that provides small GitHub widgets to display various GitHub information directly into your website.
- Enter the correct path to the widget.js file.
```html
<script type="text/javascript" src="widget.js"></script>
```
####The overview widget.
```html
<div class='some-classname'></div>
```
Simply call the relevant widget function and pass it a location and your GitHub username
```javascript
<script>
    Widget.overview(".some-classname", "markogrady1");
</script>
```
This will result in the following widget.

![checkmark]( https://github.com/markogrady1/widgit.js/raw/master/demo-assets/overview.png)

####The repo list widget.

```html
<div class='another-classname'></div>
```
Simply call the relevant widget function and pass it a location, your GitHub username and the amount of repos you wish to display
```javascript
<script>
    Widget.repos(".another-classname", "markogrady1", 10);
</script>
```
This will result in the following widget.

![checkmark]( https://github.com/markogrady1/widgit.js/raw/master/demo-assets/repo2.png)


***NOTE: More widgets are on their way.***
