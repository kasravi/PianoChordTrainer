export function setCookie(cname, cvalue, exdays) {
	exdays = exdays || 365;
	var d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	var expires = 'expires=' + d.toUTCString();
	document.cookie = "pianoChordTrainer-"+cname + '=' + cvalue + ';' + expires + ';path=/';
}

export function getCookie(cname) {
	var name = "pianoChordTrainer-"+cname + '=';
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) === ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}
	return;
}