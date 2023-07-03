/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
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
import { Markdown } from '@ckeditor/ckeditor5-markdown-gfm';
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing';
import { fcmUploadAdapterPlugin } from './FcmUploadAdapter';
export default class ClassicEditor extends ClassicEditorBase {
    static builtinPlugins: (typeof SourceEditing | typeof Markdown | typeof Essentials | typeof UploadAdapter | typeof Autoformat | typeof Bold | typeof Italic | typeof BlockQuote | typeof CKBox | typeof CKFinder | typeof CloudServices | typeof EasyImage | typeof Heading | typeof Image | typeof ImageCaption | typeof ImageStyle | typeof ImageToolbar | typeof ImageUpload | typeof Indent | typeof Link | typeof List | typeof MediaEmbed | typeof Paragraph | typeof PasteFromOffice | typeof PictureEditing | typeof Table | typeof TableToolbar | typeof TextTransformation | typeof ImageResize | typeof ImageInsert | typeof HtmlEmbed | typeof FontFamily | typeof Font | typeof fcmUploadAdapterPlugin)[];
    static defaultConfig: {
        toolbar: {
            items: string[];
        };
        image: {
            resizeUnit: "px" | "%";
            toolbar: string[];
            styles: {
                options: string[];
            };
            resizeOptions: ({
                name: string;
                label: string;
                value: null;
            } | {
                name: string;
                label: string;
                value: string;
            })[];
        };
        table: {
            contentToolbar: string[];
        };
        htmlEmbed: {
            showPreviews: boolean;
        };
        language: string;
        plugins: any;
    };
}
