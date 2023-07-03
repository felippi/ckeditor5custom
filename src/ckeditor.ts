/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import { ClassicEditor as ClassicEditorBase } from '@ckeditor/ckeditor5-editor-classic';

import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { UploadAdapter } from '@ckeditor/ckeditor5-adapter-ckfinder';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { CKBox } from '@ckeditor/ckeditor5-ckbox';
import { CKFinder } from '@ckeditor/ckeditor5-ckfinder';
import { EasyImage } from '@ckeditor/ckeditor5-easy-image';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Image, ImageCaption, ImageStyle, ImageToolbar, ImageUpload, PictureEditing, ImageResize, ImageInsert } from '@ckeditor/ckeditor5-image';
import { Indent } from '@ckeditor/ckeditor5-indent';
import { Link } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';
import { HtmlEmbed } from '@ckeditor/ckeditor5-html-embed';
import { FontFamily, Font } from '@ckeditor/ckeditor5-font';

import {fcmUploadAdapterPlugin} from './FcmUploadAdapter';




// import EasyImagePlugin from '@ckeditor/ckeditor5-easy-image/src/easyimage';
// import TextTransformationPlugin from '@ckeditor/ckeditor5-text-transformation/src/text-transformation';

export default class ClassicEditor extends ClassicEditorBase {
	public static override builtinPlugins = [
		Essentials,
		UploadAdapter,
		Autoformat,
		Bold,
		Italic,
		BlockQuote,
		CKBox,
		CKFinder,
		CloudServices,
		EasyImage,
		Heading,
		Image,
		ImageCaption,
		ImageStyle,
		ImageToolbar,
		ImageUpload,
		Indent,
		Link,
		List,
		MediaEmbed,
		Paragraph,
		PasteFromOffice,
		PictureEditing,
		Table,
		TableToolbar,
		TextTransformation,

		ImageResize,
		ImageInsert,
		HtmlEmbed,
		FontFamily,
		Font,
		fcmUploadAdapterPlugin
	];
/* Original
	public static override defaultConfig = {
		toolbar: {
			items: [
				'undo', 'redo',
				'|', 'heading',
				'|', 'bold', 'italic',
				'|', 'link', 'uploadImage', 'insertTable', 'blockQuote', 'mediaEmbed',
				'|', 'bulletedList', 'numberedList', 'outdent', 'indent'
			]
		},
		image: {
			toolbar: [
				'imageStyle:inline',
				'imageStyle:block',
				'imageStyle:side',
				'|',
				'toggleImageCaption',
				'imageTextAlternative'
			]
		},
		table: {
			contentToolbar: [
				'tableColumn',
				'tableRow',
				'mergeTableCells'
			]
		},
		// This value must be kept in sync with the language defined in webpack.config.js.
		language: 'pt'
	};
	*/

	public static override defaultConfig = {
		toolbar: {
			items: [
				'undo', 'redo',
				'|', 'heading',
				'|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList',
				'|', 'outdent', 'indent',
				// "uploadImage",
				'|', 'insertImage', 'mediaEmbed',
				'|', 'blockQuote', 'insertTable', 'undo', 'redo',
				'|', 'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor',
				'|', 'htmlEmbed',
			]
		},
		image: {
			resizeUnit: 'px' as ('px' | '%'),
			toolbar: [
				'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
				'|', 'resizeImage',
				'|', 'imageTextAlternative'
				//  "|", "imageStyle:full", "imageStyle:side",

			],
			styles: {
				options: [ 'alignLeft', 'alignCenter', 'alignRight', 'full', 'side' ]
			},
			resizeOptions: [
				{
					name: 'resizeImage:original',
					label: 'Original',
					value: null
				},
				{
					name: 'resizeImage:300',
					label: '300px',
					value: '300'
				},
				{
					name: 'resizeImage:800',
					label: '800px',
					value: '800'
				}
			],

		},
		table: {
			contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
		},
		htmlEmbed: {
			showPreviews: true,
			/*  sanitizeHtml: ( inputHtml ) => {
          // Strip unsafe elements and attributes, e.g.:
          // the `<script>` elements and `on*` attributes.
          // pode ser utilizado a sanitize-html por exemplo
          const outputHtml = sanitize( inputHtml );

          return {
            html: outputHtml,
            // true or false depending on whether the sanitizer stripped anything.
            hasChanged: true
          };
        } */
		},
		language: 'pt-br',
	};
}
