import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

export default function save({ attributes }) {
	const { videos, selectedVideo, videoLayout } = attributes;

	return (
		<div
			{...useBlockProps.save({
				className: "video-testimonial-block",
				"data-videos": JSON.stringify(videos),
				"data-selected-video": selectedVideo,
				"data-video-layout": videoLayout,
			})}
		>
			<div className="video-testimonial-layout">
				{/* Left Column - Content Area */}
				<div className="video-testimonial-content">
					<div className="video-testimonial-editor">
						<InnerBlocks.Content />
					</div>
					{/* Video Thumbnail Buttons - These will be handled by frontend JavaScript */}
					<div className={`video-testimonial-thumbnails layout-${videoLayout}`} data-video-thumbnails>
						{/* Thumbnails will be populated by frontend JavaScript */}
					</div>
				</div>
				{/* Right Column - Video Player - This will be handled by frontend JavaScript */}
				<div className="video-testimonial-player" data-video-player>
					{/* Video player will be populated by frontend JavaScript */}
				</div>
			</div>
		</div>
	);
}
