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
	ButtonGroup,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { video as videoIcon, plus, trash, dragHandle } from '@wordpress/icons';

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
	const { videos, selectedVideo } = attributes;
	const [ youtubeInput, setYoutubeInput ] = useState( '' );
	const [ showYoutubeInput, setShowYoutubeInput ] = useState( false );
	const blockProps = useBlockProps( {
		className: 'video-testimonial-block',
		'data-videos': JSON.stringify( videos ),
		'data-selected-video': selectedVideo,
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
			},
		];
		setAttributes( { videos: newVideos } );
		setYoutubeInput( '' );
		setShowYoutubeInput( false );
	};

	const onRemoveVideo = ( index ) => {
		const newVideos = videos.filter( ( _, i ) => i !== index );
		setAttributes( {
			videos: newVideos,
			selectedVideo:
				selectedVideo >= newVideos.length
					? Math.max( 0, newVideos.length - 1 )
					: selectedVideo,
		} );
	};

	const onUpdateVideoPoster = ( index, posterImage ) => {
		const newVideos = [ ...videos ];
		newVideos[ index ] = {
			...newVideos[ index ],
			posterImage: posterImage,
		};
		setAttributes( { videos: newVideos } );
	};

	const onUpdateVideoTitle = ( index, customTitle ) => {
		const newVideos = [ ...videos ];
		newVideos[ index ] = {
			...newVideos[ index ],
			customTitle: customTitle,
		};
		setAttributes( { videos: newVideos } );
	};

	const onReorderVideos = ( dragIndex, dropIndex ) => {
		const newVideos = [ ...videos ];
		const draggedVideo = newVideos[ dragIndex ];
		newVideos.splice( dragIndex, 1 );
		newVideos.splice( dropIndex, 0, draggedVideo );
		setAttributes( { videos: newVideos } );
	};

	return (
		<>
			<InspectorControls>
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
							<h4>{ __( 'Video Thumbnails', 'propagate' ) }</h4>
							<div>
								{ videos.map( ( video, index ) => (
									<Card
										key={ video.id ?? video.url }
										className="video-testimonial-video-card"
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
											<Flex>
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
															width: '60px',
															height: '60px',
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
													>
														{ ! (
															video.posterImage
																?.url ||
															video.thumbnail
														) && <videoIcon /> }
													</Button>
												</FlexItem>
												<FlexBlock>
													<div className="video-info">
														<div className="video-status">
															{ selectedVideo ===
															index
																? __(
																		'Selected',
																		'propagate'
																  )
																: __(
																		'Click to select',
																		'propagate'
																  ) }
														</div>
														<TextControl
															label={ __(
																'Title',
																'propagate'
															) }
															value={
																video.customTitle ??
																''
															}
															onChange={ (
																value
															) =>
																onUpdateVideoTitle(
																	index,
																	value
																)
															}
															placeholder={
																video.title
															}
															help={ __(
																'Leave blank to use the file/video title.',
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
																		onUpdateVideoPoster(
																			index,
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
																		onUpdateVideoPoster(
																			index,
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
												</FlexBlock>
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
													/>
												</FlexItem>
											</Flex>
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

						{ /* Video Thumbnail Buttons */ }
						<div className="video-testimonial-thumbnails">
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
												video.posterImage?.url ||
												video.thumbnail
													? `url(${
															video.posterImage
																?.url ||
															video.thumbnail
													  })`
													: 'none',
										} }
									>
										{ ! (
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
