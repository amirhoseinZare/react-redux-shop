import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import {useEffect, useState} from "react"
import classes from "./text-editor.module.scss"

function TextEditor(props){
    const toolbar = {
        options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji',],
        inline: {
          inDropdown: false,
          className: undefined,
          component: undefined,
          dropdownClassName: undefined,
          options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
          bold: { icon: 'bold', className: undefined },
          italic: { icon: 'italic', className: undefined },
          underline: { icon: 'underline', className: undefined },
          strikethrough: { icon: 'strikethrough', className: undefined },
          monospace: { icon: 'monospace', className: undefined },
          superscript: { icon: 'superscript', className: undefined },
          subscript: { icon: 'subscript', className: undefined },
        },
        blockType: {
          inDropdown: true,
          options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
          className: undefined,
          component: undefined,
          dropdownClassName: undefined,
        },
        fontSize: {
          icon: 'fontSize',
          options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
          className: undefined,
          component: undefined,
          dropdownClassName: undefined,
        },
        list: {
          inDropdown: false,
          className: undefined,
          component: undefined,
          dropdownClassName: undefined,
          options: ['unordered', 'ordered', 'indent', 'outdent'],
          unordered: { icon: 'unordered', className: undefined },
          ordered: { icon: 'ordered', className: undefined },
          indent: { icon: 'indent', className: undefined },
          outdent: { icon: 'outdent', className: undefined },
        },
        textAlign: {
          inDropdown: false,
          className: undefined,
          component: undefined,
          dropdownClassName: undefined,
          options: ['left', 'center', 'right', 'justify'],
          left: { icon: 'left', className: undefined },
          center: { icon: 'center', className: undefined },
          right: { icon: 'right', className: undefined },
          justify: { icon: 'justify', className: undefined },
        },
        link: {
          inDropdown: false,
          className: undefined,
          component: undefined,
          popupClassName: undefined,
          dropdownClassName: undefined,
          showOpenOptionOnHover: true,
          defaultTargetOption: '_self',
          options: ['link', 'unlink'],
          link: { icon: 'link', className: undefined },
          unlink: { icon: 'unlink', className: undefined },
          linkCallback: undefined
        },
        emoji: {
          icon: 'emoji',
          className: undefined,
          component: undefined,
          popupClassName: undefined,
          emojis: [
            '😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌', '🤓',
            '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈',
            '🙉', '🙊', '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃',
            '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕',
            '👇', '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥',
            '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸',
            '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈',
            '🎉', '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷', '💰', '🖊', '📅',
            '✅', '❎', '💯',
          ],
        },
        embedded: {
          icon: 'embedded',
          className: undefined,
          component: undefined,
          popupClassName: undefined,
          embedCallback: undefined,
          defaultSize: {
            height: 'auto',
            width: 'auto',
          },
        }
        
    }
    const [editorState, setEditorState] = useState({editorState:EditorState.createWithContent(
      ContentState.createFromBlockArray(
        convertFromHTML(props.defaultText || '')
      ))})

    useEffect(()=>{
        const htmlValue = draftToHtml(convertToRaw(editorState.editorState.getCurrentContent('hello')))
        const {handleChange} = props
        handleChange(htmlValue)
    }, [editorState])

    return (
        <Editor
        editorState={editorState.editorState}
        toolbarClassName={classes.toolbar}
        wrapperClassName={classes.wrapper}
        editorClassName={classes.editor}
        onEditorStateChange={(editorState) => {setEditorState({editorState})}}
        toolbar={{inline: { inDropdown: true }}}
        style={{width:'400px'}}
        {...props}
        />
    )
}

export {TextEditor}