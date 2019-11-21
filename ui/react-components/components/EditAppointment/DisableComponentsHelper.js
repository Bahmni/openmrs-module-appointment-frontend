import {isAppointmentScheduledOrCheckedIn} from "../../utils/AppointmentUtil";
import moment from "moment";

export const getComponentsDisableStatus = (appointment, isServiceOnAppointmentEditable) => {
    const componentDisableStatus = {
        patient: true,
        speciality: true,
        service: true,
        serviceType: true,
        providers: true,
        location: true,
        startDate: true,
        time: true,
        occurrences: true,
        endDate: true
    };

    const isPastAppointment = appointment.startDateTime && moment(appointment.startDateTime).startOf('day')
        .isBefore(moment().startOf('day'));

    if (isPastAppointment)
        return componentDisableStatus;

    const scheduledOrCheckedInAppointment = isAppointmentScheduledOrCheckedIn(appointment);
    if (scheduledOrCheckedInAppointment) {
        componentDisableStatus.service = !(scheduledOrCheckedInAppointment && isServiceOnAppointmentEditable);
        componentDisableStatus.speciality = componentDisableStatus.service;
        componentDisableStatus.serviceType = false;
        componentDisableStatus.providers = false;
        componentDisableStatus.location = false;
        componentDisableStatus.startDate = false;
        componentDisableStatus.time = false;
        componentDisableStatus.occurrences = false;
        componentDisableStatus.endDate = false;
    }
    return componentDisableStatus;
};
