import React, { useState } from 'react'
import { getKruti, unicode } from '.';


export default function Form(props) {
    const [text,setText] = useState('')
    const [krutibtn,setKrutiBtn] = useState(true)
    const [textMode, setTextMode] = useState('Encrypt')
    const [tranlatebtn, setTransBtn] = useState(false)
    const [encryptionBtn, setencryptionBtn] = useState(false)

    const changeHandler = (event)=>{
        setText(event.target.value)
        if (event.target.value.at(-1) in encrypt_char){
            setTextMode('Encrypt')
        }else{
            setTextMode('Decrypt')
        }
        if (event.target.value.at(0) in unicode || text.length === 0){
            setTransBtn(true)
            setKrutiBtn(false)
            setencryptionBtn(true)
        }else{
            setKrutiBtn(true)
            setTransBtn(false)
            setencryptionBtn(false)
        }
    }

    const translateToHindi = async ()=>{
        let oldtext = text
        setText('Translating...')
        let url = `https://api.mymemory.translated.net/get?q=${oldtext}&langpair=en|hi`
        let response = await fetch(url);
        let translated = await response.json()
        setText(translated.responseData['translatedText'])
        setKrutiBtn(false)
        setTransBtn(true)
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

    const copyKrutidev = ()=>{
        window.navigator.clipboard.writeText(getKruti(text))
        alert('Copied...')
    }


    const [copyBtnText,setCopyText] = useState('Copy')
    const copyText = ()=>{
        window.navigator.clipboard.writeText(text)
        setCopyText('Copied')
        setTimeout(() => {
            setCopyText('Copy')
        }, 500);
    }

    const clearText = () => {
        setText('')
    }

  return (
    <>
    <div>
        <div className="mb-3">
        <div className="row my-4 d-flex align-items-center">
            <div className="col md-6">
            <h1>Enter text here</h1>
                
            </div>
            <div className="col md-6">

            {text.length !== 0 && <button onClick={clearText} type="button" className="btn btn-danger" aria-label="Close">Clear</button>}
            </div>

        </div>
        <textarea placeholder='Type here' id='transliterateTextarea' value={text} className={`form-control bg-${props.mode} text-${props.mode==='dark'?'light':'dark'}`} onChange={changeHandler} rows="8"></textarea>
        <button disabled={text.length===0} onClick={toUpperCase} className="btn btn-primary my-4 mx-3"><i className="fa-solid fa-arrow-up"></i> UPPER CASE</button>

        <button disabled={text.length===0} onClick={toLowerCase} className="btn btn-primary my-4 mx-3"><i className="fa-solid fa-arrow-down"></i> Lower CASE</button>

        <button disabled={krutibtn || text.length===0} onClick={copyKrutidev} className="btn btn-primary my-4 mx-3"><i className="fa-regular fa-copy"></i> Copy Krutidev</button>

        <button disabled={tranlatebtn || text.length===0} onClick={translateToHindi} className="btn btn-primary my-4 mx-3"><i className="fa-solid fa-language"></i> Translate to hindi</button>

        <button disabled={text.length===0} onClick={copyText} className="btn btn-primary my-4 mx-3"><i className="fa-regular fa-copy"></i> {copyBtnText}</button>
        <button disabled={encryptionBtn && text.length!==0 || text.length===0} onClick={encrypt} className="btn btn-primary my-4 mx-3">{textMode}</button>

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