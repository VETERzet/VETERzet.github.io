$(document).ready(function() {
    $('#reportAd').on('click',function(e){
        e.preventDefault();
        adReporter.collect();
        adReporter.show();
    });

    $('#adReporter form').on('submit',function(e){
        adReporter.submit();
    });

    $('#adReporter .close').on('click',function(e){
        e.preventDefault();
        adReporter.hide();
    });

    $("#upload_iframe").on("load",function (e) {
        adReporter.complete(this.contentWindow.document.body.innerHTML);
    });
});


var adReporter = {
    show: function(){
        $('#fade').show();
        $('#adReporter').show();
    },
    hide: function(){
        $('#adReporter').hide();
        $('#fade').hide();
    },
    collect: function(){
        $('#rf2_url').attr('value',$('#rf').contents().find('#rf2').attr('src'));
    },
    submit: function(){
        var form = $('#adReporter form').attr('target','upload_iframe');
    },
    complete: function(response){
    	response = $.trim(response);
    	// In FF when page finished loading "load" event triggered for "upload frame" and this function is called with blank response.
    	// This leads JSON syntax error and "alert" to user.
    	// https://app.asana.com/0/8341775902189/253088525288247/f
    	if (response) {
	        try {
	            response = JSON.parse(response);
	
	            if(response.status == 1){
	                adReporter.success(response.message);
	            }else{
	                adReporter.error(response.message);
	            }
	        } catch(e) {
	            adReporter.error('An error ocurred, please try again!');
	        }
    	}
    },
    success: function(message){
        alert(message);
        adReporter.hide();
    },
    error: function(message){
        alert(message);
    }
};
