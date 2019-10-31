import React from "react";
import Label from "../Label/Label.jsx";
import {checkbox, checkboxContainer, planLabel, container} from "./RecurringPlan.module.scss";
import classNames from "classnames";
import PropTypes from "prop-types";
import {injectIntl} from "react-intl";
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';

const RecurringPlan = props => {
    return (<div className={classNames(container)}>
        <span className={classNames(planLabel)}><Label className={classNames(planLabel)} translationKey="PLAN_LABEL" defaultValue="Plan"/></span>
        <div className={classNames(checkboxContainer)} data-test-id="checkbox">
            <Checkbox
            onChange={props.onChange}
            defaultChecked={false}
            className={classNames(checkbox)}
            id="recurrence-selection-checkbox"
        />
            <Label forInput="recurrence-selection-checkbox" translationKey="RECURRING_APPOINTMENT_LABEL" defaultValue="Recurring Appointment"/>
        </div>
    </div>)
};

RecurringPlan.propTypes = {
    onChange: PropTypes.func.isRequired
};

export default injectIntl(RecurringPlan);
