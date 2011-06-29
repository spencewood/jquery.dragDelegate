;(function($){
$.fn.dragDelegate = function(children, options){
	var $delegate = $(this),
		$children = $(children, $delegate),
		defaults = {
			multiDragClass: "",
			dragStart: null,
			dragStop: null
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
		opts.delegateDragStop && opts.delegateDragStop();
		dragging = false;
	}).mousedown(function(){
		opts.delegateDragStart && opts.delegateDragStart();	
	}).delegate(children, "mousedown", function(e){
		opts.dragStart && opts.dragStart();
		if(!dragging){
			$focus = $(e.currentTarget);
			pos.x = e.pageX;
			pos.y = e.pageY;
			dragging = true;
		}
		return false;
	}).delegate(children, "mouseup", function(e){
		opts.dragStop && opts.dragStop();
	});
	
	return this;
}
})(jQuery);
