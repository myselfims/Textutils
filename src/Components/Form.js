import React, { useState } from 'react'


export default function Form(props) {
    const [text,setText] = useState('Hello World')
    const [textMode, setTextMode] = useState('Encrypt')

    const changeHandler = (event)=>{
        setText(event.target.value)
        if (event.target.value.at(-1) in encrypt_char){
            setTextMode('Encrypt')
        }else{
            setTextMode('Decrypt')
        }
    }

    const toUpperCase = ()=>{
        setText(text.toUpperCase())
    }
    const toLowerCase = ()=>{
        setText(text.toLowerCase())
    }

    const encrypt_char = {
        a : '@',
        b : '#',
        c : '!',
        d : '$',
        e : '^',
        f : '&',
        g : '*',
        h : '(',
        i : ')',
        j : '-',
        k : '+',
        l : '=',
        m : ':',
        n : ';',
        o : '"',
        p : "'",
        q : '[',
        r : ']',
        s : '{',
        t : '}',
        u : '|',
        v : '?',
        w : '~',
        x : '`',
        y : '<',
        z : '>'   
    }

    const encrypt = ()=>{
        let newText = '';
        if (textMode === 'Encrypt'){
            for (let char of text){ 
                if (char !== ' '){
                    newText += encrypt_char[char.toLowerCase()]
                }else{
                    newText += ',';
    
                }
            }
            setTextMode('Decrypt')

        }else{
            for (let char of text){
                if (char !== ','){
                    newText += Object.keys(encrypt_char).find(key => encrypt_char[key] === char)
                }else{
                    newText += ' ';

                }
            }
            setTextMode('Encrypt')
        }
        setText(newText)

    }

    const [copyBtnText,setCopyText] = useState('Copy')
    const copyText = ()=>{
        window.navigator.clipboard.writeText(text)
        setCopyText('Copied')
        setTimeout(() => {
            setCopyText('Copy')
        }, 500);
    }

  return (
    <>
    <div>
        <div className="mb-3">
        <h1>Enter text here</h1>
        <textarea value={text} className={`form-control bg-${props.mode} text-${props.mode==='dark'?'light':'dark'}`}id="exampleFormControlTextarea1" onChange={changeHandler} rows="8"></textarea>
        <button disabled={text.length===0} onClick={toUpperCase} className="btn btn-primary my-4 mx-3">UPPER CASE</button>
        <button disabled={text.length===0} onClick={toLowerCase} className="btn btn-primary my-4 mx-3">UPPER CASE</button>
        <button disabled={text.length===0} onClick={copyText} className="btn btn-primary my-4 mx-3"><i className="fa-regular fa-copy"></i> {copyBtnText}</button>
        <button disabled={text.length===0} onClick={encrypt} className="btn btn-primary my-4 mx-3">{textMode}</button>
        </div>
    </div>
    <div className="container">
        <h1>Your text summary.</h1>
        <p>Word : {text.split(/\s/).filter((elem)=>{return elem.length !== 0}).length}</p>
        <p>Characters : {text.length}</p>
        <p>Read time : { 0.008 * text.split(' ').filter((elem)=>{return elem.length !== 0}).length}</p>
        <h2>Preview</h2>
        <p>{text}</p>
    </div>
    </>
  )
  
}


Form.prototype = {text : String.prototype}