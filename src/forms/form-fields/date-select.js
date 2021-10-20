import { createClass } from 'react';
import PropTypes from 'prop-types'
import DatePicker from 'material-ui/DatePicker/DatePicker';
import IconButton from 'material-ui/IconButton/IconButton';

export default createClass({
    propTypes: {
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,
        ]),
        labelText: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
    },

    renderDatePicker() {
        const {
            labelText,
            referenceType,
            referenceProperty,
            isInteger,
            translateOptions,
            isRequired,
            options,
            model,
            models,
            modelDefinition,
            ...other
        } = this.props;

        return (
            <div style={{ ...this.props.style }}>
                <DatePicker
                    {...other}
                    value={this.props.value && new Date(this.props.value)}
                    mode="portrait"
                    autoOk
                    floatingLabelText={labelText}
                    onChange={this._onDateSelect}
                />
            </div>
        );
    },

    render() {
        const styles = {
            closeButton: {
                position: 'absolute',
                right: '-16px',
                top: '28px',
                zIndex: 1,
            },
            closeIcon: {
                color: '#888888',
            },
        };

        return (
            <div>
                {!this.props.isRequired && this.props.value !== undefined && this.props.value !== '' ? (
                    <IconButton
                        iconClassName="material-icons"
                        style={styles.closeButton}
                        iconStyle={styles.closeIcon}
                        onClick={this._clearDate}
                    >close</IconButton>
                ) : null}
                {this.renderDatePicker()}
            </div>
        );
    },

    _clearDate() {
        this._onDateSelect(undefined, '');
    },

    _onDateSelect(event, date) {
        this.props.onChange({
            target: {
                value: date,
            },
        });
    },
});
