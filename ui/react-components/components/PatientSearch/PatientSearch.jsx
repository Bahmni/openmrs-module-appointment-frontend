import React, {useCallback, useEffect, useState} from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { DEBOUNCE_PATIENT_SEARCH_DELAY_IN_MILLISECONDS, MINIMUM_CHAR_LENGTH_FOR_PATIENT_SEARCH } from "../../constants";
import { ComboBox } from "carbon-components-react";
import { getPatientsByLocation } from "../../api/patientApi";
import { currentLocation } from "../../utils/CookieUtil";
import { getPatientForDropdown } from "../../mapper/patientMapper";
import { debounce } from "lodash";
import Title from "../Title/Title.jsx";

export const PatientSearch = (props) => {
    const {
        intl,
        onChange,
        value,
        isDisabled,
        minCharLengthToTriggerPatientSearch = MINIMUM_CHAR_LENGTH_FOR_PATIENT_SEARCH,
        debouncePatientSearchDelayInMilliseconds,
        autoFocus
    } = props;
    const [items, setItems] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const debouncePatientSearchDelay = debouncePatientSearchDelayInMilliseconds || DEBOUNCE_PATIENT_SEARCH_DELAY_IN_MILLISECONDS;

    const loadPatients = async (searchString) => {
        if (searchString.length >= (minCharLengthToTriggerPatientSearch || 3)) {
            setIsLoading(true);
            const patients = await getPatientsByLocation(currentLocation().uuid, searchString);
            setIsLoading(false);
            if (patients.length === 0) {
                setItems([{
                    label: intl.formatMessage({id: 'DROPDOWN_NO_OPTIONS_MESSAGE', defaultMessage: 'No patients found'}),
                    disabled: true
                }])
            } else {
                setItems(patients.map(getPatientForDropdown));
            }
        }
    };
    const debouncedLoadPatients = useCallback(
        debounce(loadPatients, debouncePatientSearchDelay, {
            leading: true,
        }),
        [],
    );

    useEffect(() => {
        if (userInput.length > 1) {
            debouncedLoadPatients(userInput);
        }
    }, [userInput])

    const handleInputChange = async (searchString) => {
        setUserInput(searchString);
        if (searchString.length < 3) {
            setItems([{
                label: intl.formatMessage({id: 'DROPDOWN_TYPE_TO_SEARCH_MESSAGE', defaultMessage: 'Type to search'}),
                disabled: true
            }]);
        }
    }
    useEffect(() => {
        if (isLoading) {
            setItems([{
                label: intl.formatMessage({id: 'DROPDOWN_LOADING_MESSAGE', defaultMessage: 'Loading...'}),
                disabled: true
            }])
        }
    }, [isLoading])
    const label = <Title
        text={intl.formatMessage({id: 'APPOINTMENT_PATIENT_SEARCH_LABEL', defaultMessage: 'Search Patient'})}
        isRequired={true}/>
    return <ComboBox
        id={"PatientSearch"}
        items={items}
        placeholder={intl.formatMessage({
            id: 'PLACEHOLDER_APPOINTMENT_CREATE_SEARCH_PATIENT',
            defaultMessage: 'Patient Name or ID'
        })}
        onChange={(e) => {
            onChange(e.selectedItem);
        }}
        size={"xl"}
        onInputChange={handleInputChange}
        disabled={isDisabled}
        autoFocus={autoFocus}
        titleText={label}
        selectedItem={value}
        data-testid={"search-patient"}
    />
}

PatientSearch.propTypes = {
    intl: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.object,
    isDisabled: PropTypes.bool,
    minCharLengthToTriggerPatientSearch: PropTypes.number,
    debouncePatientSearchDelayInMilliseconds: PropTypes.number,
    autoFocus: PropTypes.bool
};

export default injectIntl(PatientSearch);