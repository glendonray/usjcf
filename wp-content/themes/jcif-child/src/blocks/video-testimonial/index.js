import { registerBlockType } from "@wordpress/blocks";
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";
import {
	PanelBody,
	Button,
	Placeholder,
	Card,
	CardBody,
	CardMedia,
	Flex,
	FlexItem,
	FlexBlock,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { video as videoIcon } from "@wordpress/icons";
import Edit from "./edit";
import save from "./save";
import "./style.scss";

registerBlockType("propagate/video-testimonial", {
	edit: Edit,
	save,
});
