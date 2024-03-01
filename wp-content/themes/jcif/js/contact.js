//Contact
jQuery(document).ready(function($) {
	$('.gc-form label').addClass('bigger');

	var input = $('.gc-input input');
	input.focusin(function() {
		$(this).parent('span').prev('label').removeClass('bigger');
	});
	input.focusout(function() {
		if(!$(this).val()) {
			$(this).parent('span').prev('label').addClass('bigger');
		}
	});
	var textarea = $('.gc-textarea textarea');
	textarea.focusin(function() {
		$(this).parent('span').prev('label').removeClass('bigger');
	});
	textarea.focusout(function() {
		if(!$(this).val()) {
			$(this).parent('span').prev('label').addClass('bigger');
		}
	});
});