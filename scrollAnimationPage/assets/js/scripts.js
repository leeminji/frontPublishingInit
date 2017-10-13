(function(A, q, u, a, t, y, p, e) {
	f = ['polyfills.js', 'jquery.js', 'jquery.mCustomScrollbar.min.js', 'TweenMax.js',  'global.js'],
		o = 'onreadystatechange', r = 'readyState';
	for (; p = A.getElementsByTagName(q)[a]; a++)
		if (p.src && p.src.match(u)) {
			u = p.src.replace(u, '');
			break
		}
	for (; a = f.shift();) a = (-1 === a.indexOf('//')) ? u + a : a, e = A.createElement(q), 'async' in p ? (e.async = !1, A.head.appendChild(e)) : p[r] ? (t = t || [], t.push(e), e[o] = function() {
		for (; t[0] && 'loaded' == t[0][r];) u = t.shift(), u[o] = null, p.parentNode.insertBefore(u, p)
	}) : A.write("<" + q + " src='" + a + "' defer></" + q + ">"), e.src = a
})(document, 'script', 'scripts.js', 0);