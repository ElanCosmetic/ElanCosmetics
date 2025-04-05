import React from "react";
import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'


type Props = {
    data: SerializedEditorState
} & React.HTMLAttributes<HTMLDivElement>


const RichText = (props: Props) => {
    const { className, ...rest } = props
    return (
        <div>
            <RichTextConverter {...rest} className={className} />
        </div>
    )
}

export default RichText;