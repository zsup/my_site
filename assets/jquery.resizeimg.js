// Based off code from http://ditio.net/2010/01/02/jquery-image-resize-plugin/
// Modified for Shopify themes by Clean Canvas
(function($) {
    $.fn.resizeImg = function(options) {
 
        var settings = $.extend({
            scale: 1,
            maxWidth: null,
    		maxHeight: null,
            fadeIn: false,
            fadeInSpeed: 200
        }, options);
 
        $(this).one('load', function() {
 
			if(this.tagName.toLowerCase() != "img") {
				// Only images can be resized
				return $(this);
			} 

			var width = this.naturalWidth;
			var height = this.naturalHeight;
            
			if(!width || !height) {
				//IE? Time for hax
                var outerimg = this;
                $("<img/>")
                .attr("src", $(this).attr("src"))
                .load(function() {
                    return doImageResize(outerimg, settings.maxWidth, settings.maxHeight, settings.scale, this.width, this.height, settings.fadeIn, settings.fadeInSpeed);
                }).each(function(){
            		if (this.complete)
        			{
        				$(this).trigger("load");
        			}
        		});
                return $(this);
			}
			
			return doImageResize(this, settings.maxWidth, settings.maxHeight, settings.scale, width, height, settings.fadeIn, settings.fadeInSpeed);
        })
        .each(function(){
			if (this.complete)
			{
				$(this).trigger("load");
			}
		});
    }
})(jQuery);

function doImageResize(elem, maxWidth, maxHeight, scale, imgWidth, imgHeight, doFadeIn, fadeInSpeed) {

	if(scale != 1) {
		imgWidth = imgWidth*scale;
		imgHeight = imgHeight*scale;
	}
	
	var pWidth = 1;
	if(maxWidth != null) {
		pWidth = imgWidth/maxWidth;
	}
	var pHeight = 1;
	if(maxHeight != null) {
		pHeight = imgHeight/maxHeight;
	}
	var reduce = 1;
	
	if(pWidth < pHeight) {
		reduce = pHeight;
	} else {
		reduce = pWidth;
	}
	
	if(reduce < 1) {
		reduce = 1;
	}
	
	var newWidth = imgWidth/reduce;
	var newHeight = imgHeight/reduce;
	
    var marginY = (maxHeight - newHeight) / 2;
    var marginX = (maxWidth - newWidth) / 2;
    $(elem).css( { 'margin-top': Math.floor(marginY), 'margin-left':Math.floor(marginX) } );
    
    if(doFadeIn) {
        $(elem).fadeIn(fadeInSpeed);
    }
    
	return $(elem)
		.attr("width", Math.ceil(newWidth) + 1)
		.attr("height", Math.ceil(newHeight) + 1);
}