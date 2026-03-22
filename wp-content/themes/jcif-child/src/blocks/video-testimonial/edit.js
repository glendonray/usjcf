import { useState } from '@wordpress/element';
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	Placeholder,
	Card,
	CardBody,
	Flex,
	FlexItem,
	FlexBlock,
	TextControl,
	SelectControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import {
	video as videoIcon,
	plus,
	trash,
	dragHandle,
	chevronDown,
	chevronUp,
} from '@wordpress/icons';

const TEMPLATE = [
	[ 'core/heading', { level: 2, placeholder: 'Enter heading...' } ],
	[ 'core/paragraph', { placeholder: 'Enter content...' } ],
];

function getYouTubeId( url ) {
	const match = url.match(
		/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?#]+)/
	);
	return match ? match[ 1 ] : null;
}

export default function Edit( { attributes, setAttributes } ) {
	const { videos, selectedVideo, videoLayout } = attributes;
	const [ youtubeInput, setYoutubeInput ] = useState( '' );
	const [ showYoutubeInput, setShowYoutubeInput ] = useState( false );
	const [ expandedVideoIndex, setExpandedVideoIndex ] = useState( null );
	const blockProps = useBlockProps( {
		className: 'video-testimonial-block',
		'data-videos': JSON.stringify( videos ),
		'data-selected-video': selectedVideo,
		'data-video-layout': videoLayout,
	} );

	const onSelectVideo = ( video, index ) => {
		setAttributes( { selectedVideo: index } );
	};

	const onAddVideo = ( video ) => {
		// Try to get thumbnail from various possible sources
		let thumbnail = '';
		if ( video.image?.url ) {
			thumbnail = video.image.url;
		} else if ( video.sizes?.medium?.url ) {
			thumbnail = video.sizes.medium.url;
		} else if ( video.sizes?.thumbnail?.url ) {
			thumbnail = video.sizes.thumbnail.url;
		} else if ( video.sizes?.full?.url ) {
			thumbnail = video.sizes.full.url;
		} else if ( video.media_details?.sizes ) {
			const sizes = video.media_details.sizes;
			if ( sizes.large?.source_url ) {
				thumbnail = sizes.large.source_url;
			} else if ( sizes.medium?.source_url ) {
				thumbnail = sizes.medium.source_url;
			} else if ( sizes.thumbnail?.source_url ) {
				thumbnail = sizes.thumbnail.source_url;
			}
		}

		const newVideos = [
			...videos,
			{
				id: video.id,
				url: video.url,
				title: video.title || video.filename,
				thumbnail: thumbnail,
				posterImage: null,
				customTitle: null,
				videoTitle: null,
				videoSubtitle: null,
			},
		];
		setAttributes( { videos: newVideos } );
	};

	const onAddYoutubeVideo = async () => {
		const videoId = getYouTubeId( youtubeInput.trim() );
		if ( ! videoId ) return;

		const embedUrl = `https://www.youtube.com/embed/${ videoId }?rel=0`;
		const thumbnail = `https://img.youtube.com/vi/${ videoId }/hqdefault.jpg`;

		let title = youtubeInput.trim();
		try {
			const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${ videoId }&format=json`;
			const response = await fetch( oembedUrl );
			if ( response.ok ) {
				const data = await response.json();
				if ( data.title ) {
					title = data.title;
				}
			}
		} catch ( e ) {
			// Fall back to URL if fetch fails
		}

		const newVideos = [
			...videos,
			{
				id: null,
				type: 'youtube',
				url: embedUrl,
				youtubeId: videoId,
				title: title,
				thumbnail: thumbnail,
				posterImage: null,
				customTitle: null,
				videoTitle: null,
				videoSubtitle: null,
			},
		];
		setAttributes( { videos: newVideos } );
		setYoutubeInput( '' );
		setShowYoutubeInput( false );
	};

	const onRemoveVideo = ( index ) => {
		const newVideos = videos.filter( ( _, i ) => i !== index );
		if ( expandedVideoIndex === index ) {
			setExpandedVideoIndex( null );
		} else if ( expandedVideoIndex > index ) {
			setExpandedVideoIndex( expandedVideoIndex - 1 );
		}
		setAttributes( {
			videos: newVideos,
			selectedVideo:
				selectedVideo >= newVideos.length
					? Math.max( 0, newVideos.length - 1 )
					: selectedVideo,
		} );
	};

	const onUpdateVideoField = ( index, field, value ) => {
		const newVideos = [ ...videos ];
		newVideos[ index ] = {
			...newVideos[ index ],
			[ field ]: value,
		};
		setAttributes( { videos: newVideos } );
	};

	const onReorderVideos = ( dragIndex, dropIndex ) => {
		const newVideos = [ ...videos ];
		const draggedVideo = newVideos[ dragIndex ];
		newVideos.splice( dragIndex, 1 );
		newVideos.splice( dropIndex, 0, draggedVideo );

		// Update expanded index to follow the dragged card
		let newExpanded = expandedVideoIndex;
		if ( expandedVideoIndex === dragIndex ) {
			newExpanded = dropIndex;
		} else if ( expandedVideoIndex !== null ) {
			if (
				dragIndex < expandedVideoIndex &&
				dropIndex >= expandedVideoIndex
			) {
				newExpanded = expandedVideoIndex - 1;
			} else if (
				dragIndex > expandedVideoIndex &&
				dropIndex <= expandedVideoIndex
			) {
				newExpanded = expandedVideoIndex + 1;
			}
		}
		setExpandedVideoIndex( newExpanded );
		setAttributes( { videos: newVideos } );
	};

	const isExpanded = ( index ) => expandedVideoIndex === index;

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Layout Options', 'propagate' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __(
							'Video Selection Layout',
							'propagate'
						) }
						value={ videoLayout }
						options={ [
							{
								label: __( 'Default (Grid)', 'propagate' ),
								value: 'grid',
							},
							{
								label: __( 'List', 'propagate' ),
								value: 'list',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { videoLayout: value } )
						}
						__nextHasNoMarginBottom
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Video Selection', 'propagate' ) }
					initialOpen={ true }
				>
					<Flex gap={ 2 } style={ { marginBottom: '8px' } }>
						<FlexItem>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ onAddVideo }
									allowedTypes={ [ 'video' ] }
									value={ videos
										.filter( ( v ) => v.id )
										.map( ( v ) => v.id ) }
									render={ ( { open } ) => (
										<Button
											variant="primary"
											icon={ plus }
											onClick={ open }
										>
											{ __(
												'Media Library',
												'propagate'
											) }
										</Button>
									) }
								/>
							</MediaUploadCheck>
						</FlexItem>
						<FlexItem>
							<Button
								variant="secondary"
								icon={ plus }
								onClick={ () =>
									setShowYoutubeInput( ( prev ) => ! prev )
								}
							>
								{ __( 'YouTube', 'propagate' ) }
							</Button>
						</FlexItem>
					</Flex>
					{ showYoutubeInput && (
						<div style={ { marginBottom: '8px' } }>
							<TextControl
								label={ __( 'YouTube URL', 'propagate' ) }
								value={ youtubeInput }
								onChange={ setYoutubeInput }
								placeholder="https://www.youtube.com/watch?v=..."
								help={
									youtubeInput.trim() !== '' &&
									getYouTubeId( youtubeInput.trim() ) === null
										? __(
												'Please enter a valid YouTube URL.',
												'propagate'
										  )
										: ''
								}
							/>
							<Flex gap={ 2 }>
								<FlexItem>
									<Button
										variant="primary"
										onClick={ onAddYoutubeVideo }
										disabled={
											! getYouTubeId(
												youtubeInput.trim()
											)
										}
									>
										{ __( 'Add', 'propagate' ) }
									</Button>
								</FlexItem>
								<FlexItem>
									<Button
										variant="tertiary"
										onClick={ () => {
											setShowYoutubeInput( false );
											setYoutubeInput( '' );
										} }
									>
										{ __( 'Cancel', 'propagate' ) }
									</Button>
								</FlexItem>
							</Flex>
						</div>
					) }

					{ videos.length > 0 && (
						<div style={ { marginTop: '16px' } }>
							<h4>{ __( 'Videos', 'propagate' ) }</h4>
							<div>
								{ videos.map( ( video, index ) => (
									<Card
										key={ video.id ?? video.url }
										className={ `video-testimonial-video-card ${
											isExpanded( index )
												? 'is-expanded'
												: ''
										}` }
										style={ { marginBottom: '8px' } }
										draggable
										onDragStart={ ( e ) => {
											e.dataTransfer.setData(
												'text/plain',
												index.toString()
											);
											e.dataTransfer.effectAllowed =
												'move';
										} }
										onDragOver={ ( e ) => {
											e.preventDefault();
											e.dataTransfer.dropEffect = 'move';
										} }
										onDrop={ ( e ) => {
											e.preventDefault();
											const dragIndex = parseInt(
												e.dataTransfer.getData(
													'text/plain'
												)
											);
											const dropIndex = index;
											if ( dragIndex !== dropIndex ) {
												onReorderVideos(
													dragIndex,
													dropIndex
												);
											}
										} }
									>
										<CardBody>
											{ /* Collapsed row — always visible */ }
											<Flex align="center">
												<FlexItem>
													<Button
														variant="tertiary"
														icon={ dragHandle }
														style={ {
															cursor: 'grab',
															padding: '4px',
															minWidth: 'auto',
															height: 'auto',
														} }
														aria-label={ __(
															'Drag to reorder',
															'propagate'
														) }
													/>
												</FlexItem>
												<FlexItem>
													<Button
														variant={
															selectedVideo ===
															index
																? 'primary'
																: 'secondary'
														}
														onClick={ () =>
															onSelectVideo(
																video,
																index
															)
														}
														style={ {
															width: '48px',
															height: '48px',
															padding: '0',
															backgroundImage:
																video
																	.posterImage
																	?.url ||
																video.thumbnail
																	? `url(${
																			video
																				.posterImage
																				?.url ||
																			video.thumbnail
																	  })`
																	: 'none',
															backgroundSize:
																'cover',
															backgroundPosition:
																'center',
														} }
														aria-label={
															selectedVideo ===
															index
																? __(
																		'Selected',
																		'propagate'
																  )
																: __(
																		'Click to select',
																		'propagate'
																  )
														}
													>
														{ ! (
															video.posterImage
																?.url ||
															video.thumbnail
														) && <videoIcon /> }
													</Button>
												</FlexItem>
												<FlexBlock>
													<div className="video-card-summary">
														<div className="video-card-title">
															{ video.videoTitle ||
																video.title }
														</div>
														{ video.videoSubtitle && (
															<div className="video-card-subtitle">
																{
																	video.videoSubtitle
																}
															</div>
														) }
													</div>
												</FlexBlock>
												<FlexItem>
													<Button
														icon={
															isExpanded( index )
																? chevronUp
																: chevronDown
														}
														onClick={ () =>
															setExpandedVideoIndex(
																isExpanded(
																	index
																)
																	? null
																	: index
															)
														}
														aria-label={
															isExpanded( index )
																? __(
																		'Collapse',
																		'propagate'
																  )
																: __(
																		'Expand',
																		'propagate'
																  )
														}
														style={ {
															padding: '4px',
															minWidth: 'auto',
															height: 'auto',
														} }
													/>
												</FlexItem>
												<FlexItem>
													<Button
														variant="tertiary"
														icon={ trash }
														onClick={ () =>
															onRemoveVideo(
																index
															)
														}
														isDestructive
														style={ {
															padding: '4px',
															minWidth: 'auto',
															height: 'auto',
														} }
													/>
												</FlexItem>
											</Flex>

											{ /* Expanded fields */ }
											{ isExpanded( index ) && (
												<div className="video-card-expanded">
													<TextControl
														label={ __(
															'Title',
															'propagate'
														) }
														value={
															video.videoTitle ??
															''
														}
														onChange={ (
															value
														) =>
															onUpdateVideoField(
																index,
																'videoTitle',
																value
															)
														}
														placeholder={ __(
															'Video title',
															'propagate'
														) }
														__nextHasNoMarginBottom
													/>
													<TextControl
														label={ __(
															'Subtitle',
															'propagate'
														) }
														value={
															video.videoSubtitle ??
															''
														}
														onChange={ (
															value
														) =>
															onUpdateVideoField(
																index,
																'videoSubtitle',
																value
															)
														}
														placeholder={ __(
															'Optional subtitle',
															'propagate'
														) }
														__nextHasNoMarginBottom
													/>
													<TextControl
														label={ __(
															'Player Title',
															'propagate'
														) }
														value={
															video.customTitle ??
															''
														}
														onChange={ (
															value
														) =>
															onUpdateVideoField(
																index,
																'customTitle',
																value
															)
														}
														placeholder={
															video.title
														}
														help={ __(
															'Displayed above the video player. Defaults to the media/YouTube title.',
															'propagate'
														) }
														__nextHasNoMarginBottom
													/>
													<div className="video-controls">
														<MediaUploadCheck>
															<MediaUpload
																onSelect={ (
																	image
																) =>
																	onUpdateVideoField(
																		index,
																		'posterImage',
																		image
																	)
																}
																allowedTypes={ [
																	'image',
																] }
																value={
																	video
																		.posterImage
																		?.id
																}
																render={ ( {
																	open,
																} ) => (
																	<Button
																		variant="secondary"
																		size="small"
																		onClick={
																			open
																		}
																	>
																		{ video.posterImage
																			? __(
																					'Change Poster',
																					'propagate'
																			  )
																			: __(
																					'Add Poster',
																					'propagate'
																			  ) }
																	</Button>
																) }
															/>
														</MediaUploadCheck>
														{ video.posterImage && (
															<Button
																variant="tertiary"
																size="small"
																onClick={ () =>
																	onUpdateVideoField(
																		index,
																		'posterImage',
																		null
																	)
																}
															>
																{ __(
																	'Remove',
																	'propagate'
																) }
															</Button>
														) }
													</div>
												</div>
											) }
										</CardBody>
									</Card>
								) ) }
							</div>
						</div>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="video-testimonial-layout">
					{ /* Left Column - Content Area */ }
					<div className="video-testimonial-content">
						<div className="video-testimonial-editor">
							<InnerBlocks
								template={ TEMPLATE }
								templateLock={ false }
							/>
						</div>

						{ /* Video Thumbnails — shared grid container */ }
						<div
							className={ `video-testimonial-thumbnails layout-${ videoLayout }` }
						>
							{ videos.length > 0 ? (
								videos.map( ( video, index ) => (
									<button
										key={ video.id ?? video.url }
										className={ `video-thumbnail ${
											selectedVideo === index
												? 'selected'
												: ''
										}` }
										onClick={ () =>
											onSelectVideo( video, index )
										}
										style={ {
											backgroundImage:
												videoLayout === 'grid' &&
												( video.posterImage?.url ||
													video.thumbnail )
													? `url(${
															video.posterImage
																?.url ||
															video.thumbnail
													  })`
													: 'none',
										} }
									>
										{ videoLayout === 'list' && (
											<>
												<span
													className="video-list-thumb"
													style={ {
														backgroundImage:
															video.posterImage
																?.url ||
															video.thumbnail
																? `url(${
																		video
																			.posterImage
																			?.url ||
																		video.thumbnail
																  })`
																: 'none',
													} }
												/>
												<span className="video-list-info">
													<span className="video-list-title">
														{ video.videoTitle ||
															video.title }
													</span>
													{ video.videoSubtitle && (
														<span className="video-list-subtitle">
															{
																video.videoSubtitle
															}
														</span>
													) }
												</span>
											</>
										) }
										{ videoLayout === 'grid' &&
											! (
												video.posterImage?.url ||
												video.thumbnail
											) && <videoIcon /> }
									</button>
								) )
							) : (
								<Placeholder
									icon={ videoIcon }
									label={ __(
										'No videos selected',
										'propagate'
									) }
									instructions={ __(
										'Add videos using the block settings panel to create thumbnail buttons.',
										'propagate'
									) }
								/>
							) }
						</div>
					</div>

					{ /* Right Column - Video Player */ }
					<div className="video-testimonial-player">
						{ videos.length > 0 && videos[ selectedVideo ] ? (
							<>
								<h3 className="video-title-display">
									{ videos[ selectedVideo ].customTitle ||
										videos[ selectedVideo ].title }
								</h3>
								<div
									className="video-player-container"
									style={ { pointerEvents: 'none' } }
								>
									{ videos[ selectedVideo ].type ===
									'youtube' ? (
										<iframe
											src={ videos[ selectedVideo ].url }
											title={
												videos[ selectedVideo ]
													.customTitle ||
												videos[ selectedVideo ].title
											}
											frameBorder="0"
											allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
											allowFullScreen
											style={ {
												width: '100%',
												aspectRatio: '16/9',
											} }
										/>
									) : (
										<video
											controls
											poster={
												videos[ selectedVideo ]
													.thumbnail
											}
											style={ {
												width: '100%',
												height: 'auto',
											} }
										>
											<source
												src={
													videos[ selectedVideo ].url
												}
												type="video/mp4"
											/>
											{ __(
												'Your browser does not support the video tag.',
												'propagate'
											) }
										</video>
									) }
								</div>
							</>
						) : (
							<Placeholder
								icon={ videoIcon }
								label={ __( 'Video Player', 'propagate' ) }
								instructions={ __(
									'Select a video to display the player.',
									'propagate'
								) }
							/>
						) }
					</div>
				</div>
			</div>
		</>
	);
}
