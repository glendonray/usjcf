<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package jcif
 */

?>

	</div><!-- #content -->

	<footer class="site-footer bg-navy">
		<div class="w-80 center flex flex-wrap">
			<div class="w-100-m w-100-s w-25-l pa4-ns pa3 white">
				<h2 class="f7 bb normal ttu pb1">Address</h2>
				<p class="f7 white">United States Junior Chamber<br>
				Commerce Foundation<br>
				PO Box 3941<br>
				Chesterfield, MO 63006</p>
			</div>
			<div class="w-100-m w-100-s pa4-ns pa3 w-25-l white">
				<h2 class="f7 bb normal ttu pb1">Contact</h2>
				<p class="f7 white mb1"><a class="white link" href="tel: 636-449-3100"><i class="fas fa-phone mr1"></i> 636-449-3100</a></p>
				<p class="f7 white ma0"><a class="white link" href="mailto:contact@usjayceefoundation.org"><i class="fas fa-envelope"></i> contact@usjayceefoundation.org</a></p>
			</div>
			<div class="w-100-m w-100-s pa4-ns pa3 w-25-l">
				<p class="mb2 f7 white">The United States Jaycees Foundation is a 501(c)(3) nonprofit organization registered with the State of Missouri.</p>
				<a href="/wp-content/uploads/2021/09/UNITED-STATES-JUNIOR-CHAMBER-OF-COMMERCE-FOUNDATION_TAX-RETURN_2020-1.pdf" target="_blank" class="f7 white link dib"><i class="far fa-file-pdf"></i> Form 990</a>
			</div>
			<div class="w-100-m w-100-s pa4-ns pa3 w-25-l">
				<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
				<input type="hidden" name="cmd" value="_s-xclick">
				<input type="hidden" name="hosted_button_id" value="R7XUE7LGERQ3W">
				<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
				<button type="submit" class="btn donate" name="submit" alt="PayPal - The safer, easier way to pay online!">Donate</button>
				</form>
			</div>
		</div>

		<p class="ma0 f7 white o-50 pa3 tc">©<?php echo date('Y');?> The United States Jaycee Foundation</p>
	<!-- .site-info -->

	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
