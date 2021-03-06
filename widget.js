"use strict";


var Widget = (function () {

	const tags = initStyle();

	function reposWidget(selector, username, amount) {
		apiRequest(username, {"urlParam": "users", "targetParam": "repos"}, res => {
			var data = JSON.parse(res);
			if (amount != null)
				data = data.splice(0, amount);
			extractRelevantData(data, repoArr => {
				createWidgetType(repoArr, selector);
			});
		});
	}

	function attr(elem, name, value) {
		if (!name || name.constructor != String) return '';
		name = {'for': 'htmlFor', 'className': 'class'}[name] || name;
		if (typeof value != 'undefined') {
			elem[name] = value;
			if (elem.setAttribute)
				elem.setAttribute(name, value);
		}
		return elem[name] || elem.getAttribute(name) || '';
	}

	function extractRelevantData(data, cb) {
		var repoArr = [];
		data.map( item => {
			repoArr.push({
				name: item.name,
				full_name: item.full_name,
				language: item.language,
				fork: item.fork,
				html_url: item.html_url,
				avatar_url: item.owner.avatar_url,
				owner_url: item.owner.html_url,
				username: item.owner.login
			});
		});
		cb(repoArr)
	}

	function overviewWidget(selector, username) {
		apiRequest(username, {"urlParam": "users", "targetParam": ""}, function (res) {
			const data = JSON.parse(res);
			var overviewArr = [data.public_repos, data.public_gists, data.followers, data.avatar_url, data.repos_url, data.gists_url, data.followers_url, data.html_url, data.login];
			createWidgetType(overviewArr, selector);
		});
	}

	function apiRequest(user, urlData, callback) {
		const urlParam = urlData.urlParam.replace("/", "");
		var url = "https://api.github.com/" + urlParam
			+ "/" + user.replace("/", "");
		const target = urlData.targetParam.length === 0
			? ""
			: "/" + urlData.targetParam.replace("/", "") + "?sort=updated";
		url = url + target;
		const xobj = new XMLHttpRequest();
		xobj.overrideMimeType("application/json");
		xobj.open('GET', url, true);
		xobj.onreadystatechange = function () {
			if (xobj.readyState == 4 && xobj.status == "200") {
				callback(xobj.responseText);
			}
		};
		xobj.send(null);
	}

	function createWidgetType(arr, selector) {
		const elem = document.querySelectorAll(selector)[0];
		if (typeof elem === "undefined") {
			return;
		} else {
			buildElem(arr, elem, selector);
		}
	}

	function buildElem(arr, baseElement, selector) {
		const prependStr = typeof arr[0] == "object" ? "repo__" : "o__";
		const el = divide(prependStr, arr);
		list(prependStr, arr, el, baseElement, selector, view);
	}

	function divide(prependStr, arr) {
		var el = create("div");
		attr(el, "class", prependStr + "view-wrap");
		addTitle(el, arr);
		el = createElem(el, "div", 1);

		return el;
	}

	function list(prependStr, arr, el, baseElement, selector, fn) {
		const ul = create("ul");
		attr(ul, "class", prependStr + "ul");
		setElement(ul, arr, el, baseElement);
		fn(baseElement, arr, selector );
	}

	function repo(arr) {
		addAvatar(".repo__view-wrap", arr);
	}

	function overview(arr, selector) {
		addData(selector, arr);
		addAvatar(".o__view-wrap", arr);
	}

	function element(param, arr) {
		var tmp = typeof arr[0] == "object"
			? createRepoElem(param, "li", 3, arr, true)
			: createElem(param, "li", 3, arr, true)
	}

	function view(param, arr, selector) {
		var tmp = typeof arr[0] == "object"
			? repo(arr)
			: overview(arr, selector);
	}

	function addTitle(elem, arr) {
		var username;
		username = (typeof arr[8] !== "object") ? arr[8] : arr[0].username;
		if (typeof arr[8] !== "object") {
			//TODO...
		}
		elem.innerHTML = "<span class=username>" + username + "</span>";
	}

	function addData(option, data) {
		if (typeof option === "string") {
			const stringsArray = ["Repos", "Gists", "Followers"];
			var d = document.querySelectorAll(option + " li");
			createHTML(d, stringsArray, data);
		}
	}


	function createElem(baseEl, elem, index, data, event) {
		for (var i = 1; i <= index; i++) {
			const el = document.createElement(elem);
			addEventToElement(event, el, data, i);
			baseEl.appendChild(el);
		}
		return baseEl;
	}

	function action(index, data) {
		const indexPosition = data.length - 2;
		switch (index) {
			case 1:
				window.open(data[indexPosition] + "?tab=repositories");
				break;
			case 2:
				window.open(data[indexPosition].replace("//", "//gist."))
				break;
			case 3:
				window.open(data[indexPosition] + "/followers");
				break;
		}
	}

	function createWrap(elem, obj) {
		const el = create("div");
		attr(el, obj, "o__view-wrap");
	}

	function appendElement(baseEl) {
		for (var i = 1; i < arguments.length; i++) {
			baseEl.appendChild(arguments[i]);
		}
	}

	function create(el, tx) {
		var newElement = document.createElement(el);
		if (typeof tx !== "undefined") {
			newElement.appendChild(document.createTextNode(tx));
		}
		return newElement;
	}


	function initStyle() {
		const style = document.currentScript.src;
		const styles = document.getElementsByTagName("script");
		var newPath = style.split("widget.js")[0];
		console.log(newPath)
		newPath = newPath.trim() + "widget.css"
		const head = document.querySelectorAll("head")[0];
		const link = create("link");
		var link2 = addAttributesToElement(link, newPath);
		appendElement(head, link, link2);

		return ["<", ">", "/>", "</"];
	}

	function addAvatar(element, data) {
		var avatar, link;
		if (typeof data[0] != "object") {
			avatar = data[3];
			link = data[7];
		} else {
			avatar = data[0].avatar_url;
			link = data[0].owner_url;
		}
		const elem = document.querySelectorAll(element + " div")[0];
		elem.innerHTML = tags[0] + "a href=" + link + " target=__blank" +
			tags[1] + tags[0] + "img class=avatar src=" + avatar +
			tags[1] + tags[3] + "a" + tags[1];
		attr(elem, "class", "header");
		var tmpElement = (typeof data[0] !== "object")
			? attr(elem, "class", "header")
			: attr(elem, "class", "header-repo");
	}

	function createRepoElem(baseEl, elem, index, data, event) {
		for (var i = 0; i < data.length; i++) {
			const el = document.createElement(elem);
			const a = document.createElement("a");
			attr(a, "href", data[i].html_url);
			attr(a, "target", "__blank");
			const icon = data[i].fork ? tags[0] + "span class='octicon octicon-repo-forked icon'" + tags[1] +
			tags[3] + "span" + tags[1] : tags[0] + "span class='octicon octicon-repo icon'" + tags[1] + tags[3] + "span" + tags[1];
			el.innerHTML = icon + "<span class=name>" + data[i].name + "</span><span class=lang>" + data[i].language + "</span>"
			a.appendChild(el);
			baseEl.appendChild(a);
		}
		return baseEl;
	}

	function createHTML(d, stringsArray, data) {
		for (var i = 0; i < d.length; i++) {
			d[i].innerHTML = "<span class=__" + i + ">" + stringsArray[i] + "</span>" + data[i];
		}
	}

	function addAttributesToElement(link, newPath) {
		attr(link, "rel", "stylesheet");
		attr(link, "href", newPath);
		const link2 = create("link");
		attr(link2, "rel", "stylesheet");
		attr(link2, "href", "https://cdnjs.cloudflare.com/ajax/libs/octicons/3.5.0/octicons.css");

		return link2;
	}

	function setElement(ul, arr, el, baseElement) {
		element(ul, arr);
		appendElement(el, ul);
		baseElement.appendChild(el)
	}

	function addEventToElement(event, el, data, i) {
		if (event) {
			(function (j) {
				el.addEventListener("click", function () {
					action(j, data);
				});
			}(i))
		}
	}

	return {
		overView: overviewWidget,
		repos: reposWidget
	}

})();
