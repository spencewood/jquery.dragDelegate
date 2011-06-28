;(function($){
$.fn.dragDelegate = function(children, options){
	var $delegate = $(this),
		$children = $(children, $delegate),
		defaults = {
			multiDragClass: ""
		},
		opts = $.extend(defaults, options),
		pos = {
			x:0,
			y:0
		};
		$focus = null,
		dragging = false,
		getEligible = function(){
			var x = opts.multiDragClass.length ?
				$focus.add($children.filter(opts.multiDragClass)) :
				$focus;
			return x;
		};
	
	$delegate.mousemove(function(e){
		var deltaX = e.pageX - pos.x,
			deltaY = e.pageY - pos.y;

		dragging && getEligible().each(function(){
			var $el = $(this),
				offset = $el.offset();
			$el.css({
				left: offset.left + deltaX,
				top: offset.top + deltaY
			});
		});
		pos.x = e.pageX;
		pos.y = e.pageY;

	}).mouseup(function(){
		dragging = false;	
	}).delegate(children, "mousedown", function(e){
		if(!dragging){
			$focus = $(e.currentTarget);
			pos.x = e.pageX;
			pos.y = e.pageY;
			dragging = true;
		}
		return false;
	});
	
	$children.css("position", "absolute");
}
})(jQuery);
