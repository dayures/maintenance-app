import React from 'react'
import mapProps from 'recompose/mapProps';
import branch from 'recompose/branch';
import NotInterestedIcon from 'material-ui/svg-icons/av/not-interested';
import CheckCircleIcon from 'material-ui/svg-icons/action/check-circle';
import renderComponent from 'recompose/renderComponent';
import nest from 'recompose/nest';
import { compose } from 'lodash/fp';
import { green500, red500, red50, green50, orange50, orange500 } from 'material-ui/styles/colors';

const ExpressionInvalidIcon = nest('span', mapProps(() => ({ color: red500 }))(NotInterestedIcon));
const ExpressionValidIcon = nest('span', mapProps(() => ({ color: green500 }))(CheckCircleIcon));
const ExpressionPendingIcon = nest('span', mapProps(() => ({ color: orange500 }))(CheckCircleIcon));

const styles = {
    status: {
        container: status => ({
            display: 'flex',
            flexDirection: 'row',
            padding: '2rem',
            border: `1px solid ${getColorForExpressionStatus(status)}`,
            lineHeight: '1.5rem',
            margin: '1rem 0 2rem',
            backgroundColor: getBackgroundColorForExpressionStatus(status),
        }),
    },
    statusMessage: {
        padding: '.25rem',
        paddingLeft: '1rem',
    },
};

export const ExpressionStatus = {
    VALID: 'VALID',
    INVALID: 'INVALID',
    PENDING: 'PENDING',
};

const ExpressionStatusIcon = compose(
    branch(props => props.status === ExpressionStatus.VALID, renderComponent(ExpressionValidIcon)),
    branch(props => props.status === ExpressionStatus.INVALID, renderComponent(ExpressionInvalidIcon)),
)(ExpressionPendingIcon);

export function getColorForExpressionStatus(status) {
    if (status === ExpressionStatus.VALID) {
        return green500;
    }

    if (status === ExpressionStatus.INVALID) {
        return red500;
    }

    return orange500;
}

export function getBackgroundColorForExpressionStatus(status) {
    if (status === ExpressionStatus.VALID) {
        return green50;
    }

    if (status === ExpressionStatus.INVALID) {
        return red50;
    }

    return orange50;
}

export default ExpressionStatusIcon;

export function ExpressionDescription({ status }) {

    return (
        <div style={styles.status.container(status.status)}>
            <ExpressionStatusIcon status={status.status} />
            <span style={styles.statusMessage}>
                {status.message}
            </span>
        </div>)
}