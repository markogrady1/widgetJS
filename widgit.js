
"use strict";

var Widgit = (function() {

	//ADD STYLE SHEET
	
    var styles = document.getElementsByTagName("script");
    for (var i in styles) {

        if(typeof  styles[i].src != "undefined") {
            var containResult = styles[i].src.indexOf("widgit.js") != -1;
            if(containResult){
                var newPath = styles[i].src.split("widgit.js")[0];
                newPath = newPath + "/css/widgit.css"
            }
        }
    }
    var head = document.querySelectorAll("head")[0];
    var link = create("link");
    attr(link, "rel", "stylesheet");
    attr(link, "href", newPath);
    appendElement(head, link);

    
	function overviewWidget(selector, username) {
		apiRequest(username, "users", function(res) {
			var data = JSON.parse(res);
			var overviewArr = [data.public_repos,data.public_gists, data.followers, data.avatar_url, data.repos_url, data.gists_url,  data.followers_url, data.html_url, data.login];
			createWidget("overview", overviewArr, selector);
		});
	}

	function apiRequest(target, section, callback) {
		var urlParam = section.replace("/", "");
		var url = "https://api.github.com/" + urlParam + "/" + target.replace("/", "");
		var xobj = new XMLHttpRequest();
	    xobj.overrideMimeType("application/json");
	    xobj.open('GET',url, true); 
	    xobj.onreadystatechange = function () {
		    if (xobj.readyState == 4 && xobj.status == "200") {
		    	callback(xobj.responseText);
		    }
	  	};
	    xobj.send(null);  
	}

	function createWidget(widgetType, arr, selector) {
		var elem = document.querySelectorAll(selector)[0];
		if(typeof elem === "undefined") {
			return 
		} else {
			var el = create("div")
			attr(el, "class", "o__view-wrap");
			addTitle(el, arr);
			el = createElem(el, "div",1);
			var ul = create("ul")
			attr(ul, "class", "o__ul");
			ul = createElem(ul, "li",3, arr,  true);
			appendElement(el, ul)
			elem.appendChild(el)
			addData(selector, arr);
			addAvatar(".o__view-wrap", arr)
		}
	}

	function addTitle(elem, arr) {
		elem.innerHTML = "<span class=username>" +arr[8] + "</span>";
	}

	function addAvatar(element, data) {
		var elem = document.querySelectorAll(element + " div")[0]
		elem.innerHTML = "<a href=" + data[7] + " target=__blank><img class=avatar src=" +data[3] + "></a>";
		attr(elem, "class", "header")
	}

	function addData(option, data) {
		if(typeof option === "string") {
			var strings = ["Repos", "Gists", "Followers"]
			var d = document.querySelectorAll(option + " li")
			for(var i = 0; i < d.length; i++) {
				d[i].innerHTML = "<span class=__" + i + ">" + strings[i] + "</span>" +  data[i] ;
			}
		} 
	}

	function createElem(baseEl, elem, index, data, event) {
		for(var i = 1; i <= index; i++) {
			var el = document.createElement(elem);
			if(event) {
				(function(j){
					el.addEventListener("click", function() {
					action(j, data);
				});
				}(i))
			}
			baseEl.appendChild(el)
		}
		return baseEl;
	}

	function action(index, data) {
		switch(index) {
			case 1:
			 	window.open(data[data.length-1] + "?tab=repositories");
			 	break;
			case 2:
			 	window.open(data[data.length-1].replace("//", "//gist."))
			 	break;
			case 3:
			 	window.open(data[data.length-1] + "/followers");
			 	break;
		}
	}
	
	function createWrap(elem, obj) {
		var el = create("div")
		attr(el, obj, "o__view-wrap");
	}
	
	function appendElement(baseEl) {
		for(var i = 1; i < arguments.length; i++) {
			baseEl.appendChild(arguments[i])
		}
	}
	
	function create(el,  tx) {
		var el = document.createElement(el);
		if(typeof tx !== "undefined") {
			el.appendChild(document.createTextNode(tx))
		}
		return el;
	}

	function attr(elem, name, value) {
		if ( !name || name.constructor != String ) return '' ;
		name = { 'for': 'htmlFor', 'className': 'class' }[name] || name;
		if ( typeof value != 'undefined' ) {
			elem[name] = value;
			if ( elem.setAttribute )
				elem.setAttribute(name,value);
		}
	return elem[name] || elem.getAttribute(name) || '';
	}

	return {
		overView: overviewWidget
	}

})();




