function bumbleline (root) {
	var STEP = 5;
	var z_incr = -STEP;
	var start_z = 150;
	var end_z = 255;
	var z = end_z;
	root.originalHTML = root.cloneNode(true).innerHTML;
	root.swap = function () {
		if (root.classList.contains('beeline')) {
			root.innerHTML = root.originalHTML;
			root.classList.remove('beeline');
		} else {
			root.innerHTML = root.beelineHTML;
			root.classList.add('beeline');
		}
	};
	var paragraphs = root.getElementsByTagName('p');
	for(var i=0; i<paragraphs.length; i++) {
		z = end_z;
		z_incr = -STEP;
		var p = paragraphs[i];
		var s = window.getComputedStyle(p);
		if (s.color != 'rgb(204, 204, 204)') {
			continue;
		}
		var cn = p.childNodes;
		for(var x=0; x<cn.length; x++) {
			var c = cn[x];
			if(c.nodeName != '#text') {
				continue;
			}
			var words = c.nodeValue.split(/(\s+)/);
			var text = ''
			for(var w=0; w<words.length; w++) {
				var word = words[w];
				text += word;
				if (word.match(/\S+/) == null) {
					continue;
				}
				z += z_incr;
				if (z >= end_z) {
					z = end_z;
					z_incr = -STEP;
				}
				if (z <= start_z) {
					z = start_z;
					z_incr = STEP;
				}
				var word_elem = document.createElement('span');
				word_elem.innerHTML = text;
				word_elem.style.color = 'rgb(' + z + ', ' + z + ', ' + z + ')';
				p.insertBefore(word_elem, c);
				text = '';
			}
			p.insertBefore(document.createTextNode(' '), c);
			p.removeChild(c);
		}
	}
	root.beelineHTML = root.cloneNode(true).innerHTML;
	root.classList.add('beeline');
};

document.addEventListener('DOMContentLoaded', function(event) {
	bumbleline(document.getElementById('article'));
});
