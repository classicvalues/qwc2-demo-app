/**
 * Copyright 2016, Sourcepole AG.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');
const PropTypes = require('prop-types');
const ReactDOM = require('react-dom');
const {connect} = require('react-redux');
// Needed for IE11 to avoid 'Promise not defined' error in axios
require("babel-polyfill");
// Avoid Intl is not defined (Intl needed by react-intl further on)
if (!global.Intl) {
   require('intl')
}

const {initialState, pluginsDef, supportedLocales} = require('./appConfig');

const LocaleUtils = require('../qwc2/MapStore2Components/utils/LocaleUtils');
LocaleUtils.setSupportedLocales(supportedLocales);

const MapViewer = require('../qwc2/MapStore2Components/containers/MapViewer');
const {loadMapConfig} = require('../qwc2/QWC2Components/actions/config');
const Localized = require('../qwc2/MapStore2Components/components/I18N/Localized');
const StandardApp = require('../qwc2/MapStore2Components/components/app/StandardApp');
const StandardStore = require('../qwc2/MapStore2Components/stores/StandardStore').bind(null, initialState, {});

class appComponent extends React.Component {
    static propTypes = {
        plugins: PropTypes.object,
        locale: PropTypes.object,
    }
    render() {
        return (
            <Localized messages={this.props.locale.messages} locale={this.props.locale.current} loadingError={this.props.locale.localeError}>
                <MapViewer plugins={this.props.plugins}/>
            </Localized>
        );
    }
};

const appConfig = {
    storeOpts: {},
    appStore: StandardStore,
    pluginsDef: pluginsDef,
    initialActions: [loadMapConfig],
    appComponent: connect(state => ({
        locale: state.locale || {messages: {}, current: ''}
    }))(appComponent)
};

ReactDOM.render(
    <StandardApp {...appConfig}/>,
    document.getElementById('container')
);
