import React, { useState } from 'react';
import { timeFromSeconds, secondsFromTime } from 'duration-str';
const DEFAULT_STYLES = {
    position: 'relative',
    display: 'inline-flex',
    height: '1.5em',
};
const INPUT_STYLES = {
    padding: '4px 6px',
    borderRadius: '2px',
    border: '1px solid #989898',
    maxWidth: '100%',
    height: 'calc(100% - 8px)',
};
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
};
const BUTTON_STYLE = {
    padding: '0',
    margin: '0',
    height: 'calc(50% - 2px)',
    lineHeight: '6px',
};
function DurationInput(props) {
    const [value, setValue] = useState(props.value != null && props.value > 0 ? props.value : 0);
    const [tempValue, setTempValue] = useState(timeFromSeconds(value));
    const BUTTON_INCREMENT = props.buttonIncrement != null ? props.buttonIncrement : 0.1;
    function setSeconds(newSecondsValue) {
        let adjustedValue = newSecondsValue;
        if (props.minValue != null && adjustedValue < props.minValue) {
            adjustedValue = props.minValue;
        }
        if (props.maxValue != null && adjustedValue > props.maxValue) {
            adjustedValue = props.maxValue;
        }
        if (adjustedValue < 0) {
            adjustedValue = 0;
        }
        if (props.onChange) {
            props.onChange(adjustedValue);
        }
        setValue(adjustedValue);
        setTempValue(timeFromSeconds(adjustedValue));
    }
    function onChange(e) {
        setTempValue(e.target.value);
        const parsedSeconds = secondsFromTime(e.target.value);
        if (parsedSeconds != null && props.onChange) {
            props.onChange(parsedSeconds);
        }
    }
    function onBlur(e) {
        const parsedSeconds = secondsFromTime(e.target.value);
        if (parsedSeconds == null) {
            setTempValue(timeFromSeconds(value));
        }
        else {
            setSeconds(parsedSeconds);
        }
    }
    return (React.createElement("span", { className: 'duration-input-wrapper ' + (props.className || ''), style: { ...DEFAULT_STYLES, ...props.style } },
        React.createElement("input", { name: props.name, className: "duration-input", type: "text", pattern: "^([0-9]+):([0-9]+):([0-9]+([\\.|,][0-9+]*)?)$", onChange: onChange, value: tempValue, style: INPUT_STYLES, onBlur: onBlur }),
        props.noButtons ? null : (React.createElement("div", { className: "duration-input-button-wrapper", style: BUTTON_WRAPPER_STYLE },
            React.createElement("button", { className: "duration-input-button duration-input-up-button", style: BUTTON_STYLE, onClick: () => setSeconds(value + BUTTON_INCREMENT) }, "\u25B4"),
            React.createElement("button", { className: "duration-input-button duration-input-down-button", style: BUTTON_STYLE, onClick: () => setSeconds(value - BUTTON_INCREMENT) }, "\u25BE")))));
}
export default DurationInput;
