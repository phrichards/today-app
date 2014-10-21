var todayApp = {};

todayApp.dayFull = '';
todayApp.apikey = 'AIzaSyDVK3f_UmdX_KMcirpPKRS-jIA3lvsVJLY';
todayApp.number = 0;

todayApp.init = function(){
	todayApp.getDay();
	todayApp.getTracks();
	todayApp.player();
};

todayApp.getDay = function(){
	var todayFull = Date.today().toString();
	var day = todayFull.substr(0, 3);
	console.log(todayFull);
	console.log(day);
	if (day == 'Mon') {
		todayApp.dayFull = 'monday';
	}
	else if (day == 'Tue') {
		todayApp.dayFull = 'tuesday';
	}
	else if (day == 'Wed') {
		todayApp.dayFull = 'wednesday';
	}
	else if (day == 'Thu') {
		todayApp.dayFull = 'thursday';
	}
	else if (day == 'Fri') {
		todayApp.dayFull = 'friday';
	}
	else if (day == 'Sat') {
		todayApp.dayFull = 'saturday';
	}
	else if (day == 'Sun') {
		todayApp.dayFull = 'sunday';
	}
	console.log(todayApp.dayFull);
	todayApp.getTracks(todayApp.dayFull)
};

todayApp.getRandomNumber = function(max, min) {
    return Math.round(Math.random() * (max - min) + min);
}

todayApp.number = todayApp.getRandomNumber(30, 0);
console.log(todayApp.number);


todayApp.getTracks = function(){	
	$.ajax({
		url: 'https://www.googleapis.com/youtube/v3/search?',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			part: 'snippet',
			maxResults: 30,
			q: todayApp.dayFull,
			regionCode: 'US',
			type: 'video',
			videoCategoryId: 10,
			key: todayApp.apikey
		},
		success: function(result) {
			console.log(result);
			var videoId = (result.items[todayApp.number].id.videoId);
			todayApp.player(videoId);
		}
	});
};

todayApp.player = function(videoId) {
	var params = { allowScriptAccess: "always" };
	var atts = { id: "videoPlayer" };
	swfobject.embedSWF("http://www.youtube.com/v/" + videoId + "&enablejsapi=1&playerapiid=videoPlayer", "videoPlayer", "425", "365", "8", null, null, params);
};

$(document).ready(function(){
	todayApp.init();
});
