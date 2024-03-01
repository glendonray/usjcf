jQuery( document ).ready( function( $ ) {
	$(".meter > .meter-bar").each(function() {
		var current = $(this).attr("data-current");
		$(this)
			.data("origWidth", $(this).width())
			.width(0)
			.animate(
			{
				width: current + "%"
			},
			1200
			);
		$('.meter-current .meter-number').each(function () {
			var $this = $(this);
			$({ Counter: 0 }).animate({ Counter: $this.attr('data-stop') }, {
				duration: 1000,
				easing: 'swing',
				step: function (now) {
				$this.text("$" + Math.ceil(now).toLocaleString());
				}
			});
		});
		$('.meter-percent .meter-number').each(function () {
			var $this = $(this);
			$({ Counter: 0 }).animate({ Counter: $this.attr('data-stop') }, {
				duration: 1000,
				easing: 'swing',
				step: function (now) {
				$this.text(Math.ceil(now) + "%");
				}
			});
		});
	});
});