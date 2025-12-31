// textNode.js

import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';


const extractVariables = (text) => {
  const regex = /{{\s*([a-zA-Z_$][\w$]*)\s*}}/g;
  const variables = new Set();
  let match;

  while ((match = regex.exec(text)) !== null){
    variables.add(match[1]);
  }

  // console.log(variables)

  return Array.from(variables)
}

export const TextNode = ({ id, data }) => {
  const defaultVar = data?.inputName || 'input';
  // console.log("textnode data ", data);
  const [currText, setCurrText] = useState(data?.text || `{{${defaultVar}}}`);
  const textFieldRef = useRef(null);
  const [variables, setVariables] = useState([]);

  // useeffect to extract variables
  useEffect(() => {
    setVariables(extractVariables(currText));
  }, [currText])

  // useeffect to auto resize the text field
  useEffect(() => {
    if(textFieldRef.current){
      textFieldRef.current.style.height = 'auto';
      textFieldRef.current.style.height = `${textFieldRef.current.scrollHeight}px`;
    }
  }, [currText])

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };




  return (
    <BaseNode
      title="Text"
      handles={{
        inputs: variables.map((variable, index) => ({
          id: `${id}-${variable}`,
          position: Position.Left,
          style: { top: `${20 + index * 20}px` }
        })),
        outputs: [{
            id: `${id}-output`,
            position: Position.Right
        }]
      }}
    >
      <label>
        Text:
        <textarea 
          value={currText} 
          ref={textFieldRef}
          onChange={handleTextChange} 
          style={{
            width: "100%",
            resize: "none",
            minHeight: '40px'
          }}
        />
      </label>


    </BaseNode>
  );
}
