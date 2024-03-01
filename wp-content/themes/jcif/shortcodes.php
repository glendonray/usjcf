<?php

 //CONTRIBUTOR DASHBOARD PEOPLE
function contributor_dashboard($atts, $content) {
  ob_start();
  $pid = get_the_id();

  print_r(get_current_user_id());
  
	return ob_get_clean();
}
add_shortcode( 'contributor_dashboard', 'contributor_dashboard');