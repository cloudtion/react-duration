"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _durationFormatter = require("duration-formatter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DEFAULT_STYLES = {
  position: 'relative',
  display: 'inline-flex',
  height: '1.5em'
};
const INPUT_STYLES = {
  padding: '4px 6px',
  borderRadius: '2px',
  border: '1px solid #989898',
  maxWidth: '100%',
  height: 'calc(100% - 8px)'
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
  transform: 'translateY(-50%)'
};
const BUTTON_STYLE = {
  padding: '0',
  margin: '0',
  height: 'calc(50% - 2px)',
  lineHeight: '6px'
};

const DurationInput = props => {
  const [value, setValue] = (0, _react.useState)(props.value > 0 ? props.value : 0);
  const [tempValue, setTempValue] = (0, _react.useState)((0, _durationFormatter.timeFromSeconds)(value));
  const BUTTON_INCREMENT = props.buttonIncrement != null ? props.buttonIncrement : 0.1;

  const setSeconds = new_seconds_value => {
    if (props.minValue && new_seconds_value < props.minValue) new_seconds_value = props.minValue;
    if (props.maxValue && new_seconds_value > props.maxValue) new_seconds_value = props.maxValue;
    if (new_seconds_value < 0) new_seconds_value = 0;
    props.onChange && props.onChange(new_seconds_value);
    setValue(new_seconds_value);
    setTempValue((0, _durationFormatter.timeFromSeconds)(new_seconds_value));
  };

  const onChange = e => {
    setTempValue(e.target.value);
    const parsed_seconds = (0, _durationFormatter.secondsFromTime)(e.target.value);

    if (parsed_seconds != null) {
      props.onChange && props.onChange(parsed_seconds);
    }
  };

  const onBlur = e => {
    const parsed_seconds = (0, _durationFormatter.secondsFromTime)(e.target.value);

    if (parsed_seconds == null) {
      setTempValue((0, _durationFormatter.timeFromSeconds)(value));
    } else {
      setSeconds(parsed_seconds);
    }
  };

  return _react2.default.createElement("span", {
    className: 'duration-input-wrapper ' + props.className,
    style: { ...DEFAULT_STYLES,
      ...props.style
    }
  }, _react2.default.createElement("input", {
    name: props.name,
    className: "duration-input",
    type: "text",
    pattern: "^([0-9]+):([0-9]+):([0-9]+([\\.|,][0-9+]*)?)$",
    onChange: onChange,
    value: tempValue,
    style: INPUT_STYLES,
    onBlur: onBlur
  }), props.noButtons ? null : _react2.default.createElement("div", {
    className: "duration-input-button-wrapper",
    style: BUTTON_WRAPPER_STYLE
  }, _react2.default.createElement("button", {
    className: "duration-input-button duration-input-up-button",
    style: BUTTON_STYLE,
    onClick: () => setSeconds(value + BUTTON_INCREMENT)
  }, "\u25B4"), _react2.default.createElement("button", {
    className: "duration-input-button duration-input-down-button",
    style: BUTTON_STYLE,
    onClick: () => setSeconds(value - BUTTON_INCREMENT)
  }, "\u25BE")));
};

exports.default = DurationInput;