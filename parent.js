;(function () { 
    var eventMethod 	= window.addEventListener ? "addEventListener" : "attachEvent",
    	eventer 		= window[eventMethod],
    	messageEvent 	= eventMethod == "attachEvent" ? "onmessage" : "message";
    
    // Listen to message from child window
    eventer(messageEvent, function(e) {
        var fn = e.data.fn;
        
        if (fn === 'localStorage') {
            var method = e.data.method,
                key = e.data.key,
                value = e.data.value || undefined,
                iframe = document.getElementsByTagName("iframe")[0].contentWindow,
                result;
            
			try {
				result = localStorage[method](key, value);
			} catch (err) {
				var code = err.code || err.number || err.message;
				result = undefined;
			}
            iframe.postMessage({id: e.data.id, response: result}, "*");
        }
    },false);
}());