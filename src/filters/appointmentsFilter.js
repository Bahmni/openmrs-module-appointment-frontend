'use strict';

angular.module('bahmni.appointments')
    .filter('appointments', [function () {
        var filterAppointmentsByService = function (appointments, serviceUuids) {
            return _.filter(appointments, function (appointment) {
                return appointment.service && _.includes(serviceUuids, appointment.service.uuid);
            });
        };

        var filterAppointmentsByServiceType = function (appointments, serviceTypeUuids) {
            return _.filter(appointments, function (appointment) {
                return appointment.serviceType && _.includes(serviceTypeUuids, appointment.serviceType.uuid);
            });
        };

        var filterAppointmentsByProviders = function (appointments, providerUuids) {
            if (_.isEmpty(providerUuids)) {
                return appointments;
            }
            return _.filter(appointments, function (appointment) {
                if ((appointment.providers == undefined) || _.isEmpty(appointment.providers)) {
                    return _.includes(providerUuids, 'no-provider-uuid');
                } else {
                    return _.find(appointment.providers, function (p) {
                        return _.includes(providerUuids, p.uuid) && p.response !== "CANCELLED";
                    });
                }
            });
        };

        var filterAppointmentsByLocations = function (appointments, locationUuids) {
            if (_.isEmpty(locationUuids)) {
              return appointments;
            }
            return _.filter(appointments, function (appointment) {
              return _.includes(locationUuids, appointment.location && appointment.location.uuid);
            });
        };

        var filterAppointmentsByStatus = function (appointments, statusList) {
            if (_.isEmpty(statusList)) {
                return appointments;
            }
            return _.filter(appointments, function (appointment) {
                return _.includes(statusList, appointment.status);
            });
        };

        return function (appointments, filters) {
            if (_.isEmpty(filters)) {
                return appointments;
            }
            if ((_.isEmpty(filters.serviceUuids) && _.isEmpty(filters.serviceTypeUuids))) {
                var appointmentsFilteredByProviders = filterAppointmentsByProviders(appointments, filters.providerUuids);
                var appointmentsFilteredByLocations = filterAppointmentsByLocations(appointmentsFilteredByProviders, filters.locationUuids);
                return filterAppointmentsByStatus(appointmentsFilteredByLocations, filters.statusList);
            }
            var appointmentsFilteredByService = filterAppointmentsByService(appointments, filters.serviceUuids);
            var appointmentsFilteredByServiceType = filterAppointmentsByServiceType(appointments, filters.serviceTypeUuids);
            var appointmentsFilteredBySpeciality = appointmentsFilteredByService.concat(appointmentsFilteredByServiceType);
            var appointmentsFilteredByProviders = filterAppointmentsByProviders(appointmentsFilteredBySpeciality, filters.providerUuids);
            var appointmentsFilteredByLocations = filterAppointmentsByLocations(appointmentsFilteredByProviders, filters.locationUuids);
            return filterAppointmentsByStatus(appointmentsFilteredByLocations, filters.statusList);
        };
    }]);
