import classNames from "classnames";
import {
    button,
    footer,
    save,
    errorMessageContainer
} from "../AppointmentEditorFooter/AppointmentEditorFooter.module.scss";
import React, {useState} from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import CancelConfirmation from "../CancelConfirmation/CancelConfirmation.jsx";
import CustomPopup from "../CustomPopup/CustomPopup.jsx";
import {customPopup} from "../CustomPopup/CustomPopup.module.scss";
import {AppContext} from "../AppContext/AppContext";
import UpdateButtons from "../EditAppointment/UpdateButtons.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import {Button} from "carbon-components-react";

const AppointmentEditorFooter = props => {

    const {checkAndSave, isEdit, isOptionsRequired, disableSaveAndUpdateButton, cancelConfirmationMessage, errorMessage} = props;
    const[showUpdateButtons, setShowUpdateButtons] = useState(false);

    const getUpdateButtons =() =>{
        setShowUpdateButtons(!showUpdateButtons);
    };

    const cancelButton = <Button kind="secondary" style={{width: "270px", height: "64px" }} data-testid="cancel">
                            <span><FormattedMessage id={'APPOINTMENT_CREATE_CANCEL'} defaultMessage={'Cancel'}/></span>
                        </Button>;

    return (
        <div>
            <div className={classNames(errorMessageContainer)}>
                <ErrorMessage message={errorMessage} />
            </div>
        <div className={classNames(footer)}>
            <div>
                <CancelConfirmation onBack={React.useContext(AppContext).onBack} triggerComponent={cancelButton}/>
                {isEdit
                    ? <Button kind="primary" style={{width: "270px", height: "64px" }}  className={classNames(button, save)}
                              onClick={() => isOptionsRequired ? getUpdateButtons() : checkAndSave(undefined)}
                              disabled={disableSaveAndUpdateButton}
                              data-testid="check-and-save">
                        <span>
                        <FormattedMessage id={'APPOINTMENT_UPDATE_LABEL'} defaultMessage={'Update'}/>
                    </span>
                    </Button>
                    : <Button kind="primary" style={{width: "270px", height: "64px" }} onClick={checkAndSave} data-testid="check-and-save" disabled={disableSaveAndUpdateButton}>
                        <span>
                        <FormattedMessage id={'APPOINTMENT_CREATE_CHECK_AND_SAVE'} defaultMessage={'Check and Save'}/>
                    </span>
                    </Button>}
                {isOptionsRequired && showUpdateButtons ? <UpdateButtons updateOptionsVisibleStatus={setShowUpdateButtons} checkAndSave={applyForAll =>  checkAndSave(applyForAll)} /> : undefined}

            </div>
        </div>
        </div>
    );
};

AppointmentEditorFooter.propTypes = {
    checkAndSave: PropTypes.func,
    isEdit: PropTypes.bool,
    isOptionsRequired: PropTypes.bool,
    disableSaveAndUpdateButton: PropTypes.bool,
    cancelConfirmationMessage: PropTypes.shape({
      translationKey: PropTypes.string.isRequired,
      defaultMessage: PropTypes.string.isRequired
    }),
    errorMessage: PropTypes.string
};

export default AppointmentEditorFooter;
