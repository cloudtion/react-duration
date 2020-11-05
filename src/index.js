
import React, {useState} from 'react';
import {timeFromSeconds, secondsFromTime} from 'duration-formatter';

const DEFAULT_STYLES = {

  position: 'relative',
  display: 'inline-flex',
  height: '1.5em',
}

const INPUT_STYLES = {

  padding: '4px 6px',
  borderRadius: '2px',
  border: '1px solid #989898',
  maxWidth: '100%',
  height: 'calc(100% - 8px)',
}

const BUTTON_WRAPPER_STYLE = {

  position: 'absolute',
  right: '2px',
  top: 'calc(50% + 1px)',
  height: 'calc(100% + 1px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '16px',
  transform: 'translateY(-50%)',
}


const BUTTON_STYLE = {
  padding: '0',
    margin: '0',
    height: 'calc(50% - 2px)',
    lineHeight: '6px',
}

function DurationInput(props){

  const [value, setValue] = useState(props.value>0? props.value : 0);
  const [tempValue, setTempValue] = useState(timeFromSeconds(value));

  const BUTTON_INCREMENT = props.buttonIncrement!=null? props.buttonIncrement : 0.1;

  function setSeconds(new_seconds_value){
      
    if( props.minValue && new_seconds_value < props.minValue ){
      new_seconds_value = props.minValue;
    }

    if( props.maxValue && new_seconds_value > props.maxValue ){
      new_seconds_value = props.maxValue;
    }

    if( new_seconds_value < 0 ){
      new_seconds_value = 0;
    }

    props.onChange && props.onChange(new_seconds_value);

    setValue(new_seconds_value);
    setTempValue(timeFromSeconds(new_seconds_value));
  }

  function onChange(e){

    setTempValue(e.target.value);

    const parsed_seconds = secondsFromTime(e.target.value);
    
    if( parsed_seconds != null ){

      props.onChange && props.onChange(parsed_seconds);
    }
  }

  function onBlur(e){

    const parsed_seconds = secondsFromTime(e.target.value);

    if( parsed_seconds == null ){

      setTempValue(timeFromSeconds(value));
    
    }else{

      setSeconds(parsed_seconds);
    }
  }

  return (

    <span className={ 'duration-input-wrapper '+props.className } style={ {...DEFAULT_STYLES, ...props.style} }>

      <input
        name={ props.name }
        className='duration-input'
        type='text'
        pattern='^([0-9]+):([0-9]+):([0-9]+([\.|,][0-9+]*)?)$'
        onChange={ onChange }
        value={ tempValue }
        style={ INPUT_STYLES }
        onBlur={ onBlur }
      />
      

      {
        props.noButtons?

        null:

        <div className='duration-input-button-wrapper' style={ BUTTON_WRAPPER_STYLE }>

          <button className='duration-input-button duration-input-up-button' style={ BUTTON_STYLE } onClick={()=> setSeconds(value + BUTTON_INCREMENT)}>▴</button>
          <button className='duration-input-button duration-input-down-button' style={ BUTTON_STYLE } onClick={()=> setSeconds(value - BUTTON_INCREMENT)}>▾</button>

        </div>
      }

    </span>
  )
}

export default DurationInput;