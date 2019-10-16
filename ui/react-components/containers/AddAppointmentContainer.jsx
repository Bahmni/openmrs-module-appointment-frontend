import React, {Component} from "react";
import AppointmentEditor from "../components/AppointmentEditor/AppointmentEditor.jsx";
import {IntlProvider} from "react-intl";
import {getLocale} from "../utils/LocalStorageUtil";
import {getTranslations} from "../api/translationsApi";
import {getAppConfigs} from "../api/configApi";
import translations from '../../app/i18n/appointments';
import {appName} from '../constants';
// TODO : need to add connection to redux

class AddAppointmentContainer extends Component {

    constructor (props) {
        super(props);
        this.state = {
            locale: getLocale(),
            messages: translations[props.locale],
            appConfigs: null
        };
        (async () => {
            await this.getMessages();
            await this.getAppConfigs();
        })();
    }

    async getMessages () {
        const messages = await getTranslations({appName: appName, locale: this.state.locale});
        this.setState({messages: messages});
    }

    async getAppConfigs () {
        const appConfigs = await getAppConfigs({appName: appName});
        const {config} = appConfigs;
        this.setState({appConfigs: config});
    }

    render () {
        const {locale, messages, appConfigs} = this.state;
        return (
            <IntlProvider defaultLocale='en' locale={locale} messages={messages}>
                <AppointmentEditor appConfig={appConfigs}/>
            </IntlProvider>);
    }
}

export default AddAppointmentContainer;
