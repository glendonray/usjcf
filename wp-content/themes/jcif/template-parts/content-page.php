<?php

/**
 * Template part for displaying page content in page.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package jcif
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('center'); ?>>

    <?php if (is_front_page()) {
        $featured_meta = get_field('featured_post');
        if ($featured_meta) {
            $featured = get_post($featured_meta[0]);
            $title = $featured->post_title;
            $excerpt = $featured->post_excerpt;
            $link = $featured->guid;
            $img = get_the_post_thumbnail_url($featured_meta[0]);
    ?>
            <div class="home-hero ph4 pv6 tc" style="background-image:url(<?php echo $img; ?>);">
                <div class="br3 center home-hero-card mw7 pa4">
                    <h2 class="f1-ns f3 lh-solid tc ma0"><?php echo $title; ?></h2>
                    <p><?php echo $excerpt; ?></p>
                    <a class="btn bg-sea" href="<?php echo $link; ?>">Read More</a>
                </div>
            </div>
        <?php } ?>

        <div class="home-sub-row flex flex-wrap mb4">
            <?php
            $feature_post_2 = get_field('feature_post_2');
            $args = array(
                'post_type' => array('post', 'event', 'page'),
                'posts_per_page' => 1,
                'post__in' => $feature_post_2,

            );

            $query = new WP_Query($args);
            // The Loop
            if ($query->have_posts()) {
                while ($query->have_posts()) {
                    $query->the_post();

                    $thumb = get_the_post_thumbnail_url();
                    $pid = get_the_id();

                    if (get_post_type($pid) == 'event') {
                        $loc_meta = get_field('location');

                        $date = get_field('date');
                        $date = date('m/d/Y', strtotime($date));
                        $end_d = get_field('end_date');
                        if (!empty($end_d)) {
                            $end_d = date('m/d/Y', strtotime($end_d));
                        }

                        $time = get_field('time');
                    }
            ?>

                    <div class="w-50-l w-100 ph4 pv6 home-event" style="background-image:url(
                        <?php
                        echo $thumb;
                        ?>
                        );">
                        <h2 class="mt0 mb2 lh-solid f2-ns f3 white mw7">
                            <?php
                            the_title()
                            ?>
                        </h2>
                        <?php
                        if (get_post_type($pid) == 'event') {
                        ?>
                            <p class="location white ma0">
                                <?php
                                echo $loc_meta;
                                ?>
                            </p>
                            <p class="time white ma0">
                                <?php
                                echo $date;
                                if (($end_d)) {
                                    echo ' - ' . $end_d;
                                }
                                ?>
                            </p>
                            <p class="time white mt0"><?php echo $time ?></p>
                            <a class="btn bg-sea" href="<?php the_permalink(); ?>">Event Details</a>
                        <?php
                        } else {
                        ?>
                            <p class="white relative mw6">
                                <?php
                                echo get_the_excerpt();
                                ?>
                            </p>
                            <a class="btn bg-sea" href="
				<?php
                            the_permalink();
                ?>
				">Read More</a>
                        <?php
                        }
                        ?>
                    </div>
            <?php

                }
                /* Restore original Post Data */
                wp_reset_postdata();
            }
            ?>
            <div class="w-50-l w-100 ph4 pv6 home-donate">
                <h2 class="f1-ns f3 lh-solid ma0 mb2 ttu white">Help our cause.</h2>
                <p class="mt0 white">The Jaycee foundation improves the lives of thousands every year.</p>
                <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" class="flex self-center donate-form">
                    <input type="hidden" name="cmd" value="_s-xclick">
                    <input type="hidden" name="hosted_button_id" value="R7XUE7LGERQ3W">
                    <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
                    <button type="submit" class="btn bg-orange" name="submit" alt="PayPal - The safer, easier way to pay online!">Donate</button>
                </form>
            </div>
        </div>

    <?php } ?>


    <?php if (!is_front_page()) { ?>
        <div id="gc-page" class="mw7 center pv3 ph4">
            <div class="center gc-header mb3 mt3 pb3 tc">
                <header class="entry-header">
                    <h1 class="f1-ns ma0 lh-solid ttu"><?php the_title(); ?></h1>
                </header><!-- .entry-header -->
            </div>
            <div class="b--black-10 bb mw5 center"></div>
        <?php } ?>

        <?php // jcif_post_thumbnail(); 
        ?>

        <div class="gc-container">
            <div class="entry-content ma0">
                <?php
                the_content();

                wp_link_pages(array(
                    'before' => '<div class="page-links">' . esc_html__('Pages:', 'jcif'),
                    'after'  => '</div>',
                ));
                ?>
            </div><!-- .entry-content -->
        </div>
        </div>

        <?php if (get_edit_post_link()) : ?>
            <footer class="entry-footer">
                <?php
                edit_post_link(
                    sprintf(
                        wp_kses(
                            /* translators: %s: Name of current post. Only visible to screen readers */
                            __('Edit <span class="screen-reader-text">%s</span>', 'jcif'),
                            array(
                                'span' => array(
                                    'class' => array(),
                                ),
                            )
                        ),
                        get_the_title()
                    ),
                    '<span class="edit-link">',
                    '</span>'
                );
                ?>
            </footer><!-- .entry-footer -->
        <?php endif; ?>
</article><!-- #post-<?php the_ID(); ?> -->

<div class="btt fixed bg-blue white br-100 pa2 tc flex items-center shadow-4"><a class="white center" href="#masthead"><i class="fas fa-arrow-up"></i></a></div>