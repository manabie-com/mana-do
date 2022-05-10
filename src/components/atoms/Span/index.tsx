// Library
import React from 'react';

interface SpanProps extends React.HTMLAttributes<any>{

}

export const Span: React.FC<SpanProps> =(props) => {
    return <span {...props} />
}