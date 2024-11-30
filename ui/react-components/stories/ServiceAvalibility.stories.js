import React from 'react'
import ServiceAvailability from '../components/ServiceAvailability/ServiceAvailability';
import {IntlProvider} from "react-intl";


export default {
  title: 'Service Availability',
}

export const Basic = () => <IntlProvider locale='en' messages={{
  'SUNDAY': 'Su',
  'MONDAY': 'Mo',
  'TUESDAY': 'Tu',
  'WEDNESDAY': 'We',
  'THURSDAY': 'Th',
  'FRIDAY': 'Fr',
  'SATURDAY': 'Sa'
}}><ServiceAvailability/></IntlProvider>;
