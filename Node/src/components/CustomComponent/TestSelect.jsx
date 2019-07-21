import React, { Component } from 'react';
import SuperSelectField from 'material-ui-superselectfield';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import Chip from 'material-ui/Chip/Chip';
import FontIcon from 'material-ui/FontIcon/FontIcon';
import Avatar from 'material-ui/Avatar/Avatar';
import { teal500, pink500, teal200, pink200, yellow500, yellow200, deepPurple500 } from 'material-ui/styles/colors';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import countries from '../../assets/countries';
import data from '../../assets/states';
import flagIconCSSCountryCodes from '../../assets/flagIconCSSCountryCodes';
import '../../assets/flag-icon.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';


const containerStyle = {
    padding: 40,
    paddingBottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
};
const menuItemStyle = {
    whiteSpace: 'normal',
    display: 'flex',
    justifyContent: 'space-between',
    lineHeight: 'normal',
};
const chipAvatarStyle = {
    width: '100%',
    height: '100%',
    margin: 0,
    borderRadius: '50%',
    backgroundSize: 'cover',
};

const displayState = (state) =>
    state && state.length ? [...state].map(({ value, label }) => label || value).join(', ') : 'empty state';

const dataSource = [
    { id: 0, name: 'Raphaël' },
    { id: 1, name: 'Jessica' },
    { id: 2, name: 'Naomie' },
    { id: 3, name: 'Oliver' },
    { id: 4, name: 'Wynona' },
    { id: 5, name: 'Ben' },
    { id: 6, name: 'Vincent' },
    { id: 7, name: 'Clémentine' },
    { id: 8, name: 'Angélique' },
    { id: 9, name: 'Julien' },
    { id: 10, name: 'Steve' },
    { id: 11, name: 'Yoan' },
    { id: 12, name: 'Nathalie' },
    { id: 13, name: 'Marie' },
    { id: 14, name: 'Renée' },
];

class SelectExample1 extends Component {
    state = {
        state31: [
            {
                label: 'France',
                value: {
                    'English short name': 'France',
                    'French short name': 'France (la)',
                    'Alpha-2 code': 'FR',
                    'Alpha-3 code': 'FRA',
                    Numeric: 250,
                    Capital: 'Paris',
                    Continent: 4,
                },
            },
        ],
        state32: [],
    };

    handleSelection = (values, name) => this.setState({ [name]: values });

    handleCustomDisplaySelections = (name) => (values) =>
        values.length ? (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {values.map(({ label, value: country }, index) => (
                    <Chip key={index} style={{ margin: 5 }} onRequestDelete={this.onRequestDelete(index, name)}>
                        <Avatar
                            icon={
                                <FontIcon
                                    className={`flag-icon flag-icon-${country['Alpha-2 code'].toLowerCase()}`}
                                    style={chipAvatarStyle}
                                />
                            }
                        />
                        {label}
                    </Chip>
                ))}
            </div>
        ) : (
                <div style={{ minHeight: 42, lineHeight: '42px' }}>Select some values</div>
            ); // advice: use one of <option>s' default height as min-height

    onRequestDelete = (key, name) => (event) => {
        this.setState({ [name]: this.state[name].filter((v, i) => i !== key) });
    };

    handleAutoCompleteTyping = (searchText) => console.debug('You typed in AutoComplete :', searchText); // eslint-disable-line no-console

    render() {
        const { state31, state32 } = this.state;
        console.debug('state31', state31, '\nstate32', state32); // eslint-disable-line no-console

        const countriesNodeList = countries.map((country, index) => {
            const countryCode = country['Alpha-2 code'].toLowerCase();
            const countryLabel = country['English short name'];
            if (!flagIconCSSCountryCodes.includes(countryCode)) return null;

            return (
                <div key={index} value={country} label={countryLabel} style={menuItemStyle}>
                    <div style={{ marginRight: 10 }}>
                        <span style={{ fontWeight: 'bold' }}>{countryLabel}</span>
                        <br />
                        <span style={{ fontSize: 12 }}>{country.Capital}</span>
                    </div>
                    <FontIcon className={`flag-icon flag-icon-${countryCode}`} />
                </div>
            );
        });

        const dataSourceNodes = dataSource.map(({ id, name }) => (
            <div key={id} value={id} label={name}>
                {name}
            </div>
        ));

        const CustomFloatingLabel = (
            <span>
                Custom floatingLabel<br />
                <span style={{ color: deepPurple500, fontWeight: 'bold', fontStyle: 'italic' }}>state32</span>
            </span>
        );

        const customHintTextAutocomplete = (
            <span>
                Some<span style={{ color: 'blue', fontSize: 20, margin: '0 10px' }}>hint Text</span>test
      </span>
        );

        return (
            <MuiThemeProvider>
                <section style={containerStyle}>
                    <fieldset style={{ marginBottom: 40 }}>
                        <legend>Selected values</legend>
                        <div>State 31: {displayState(state31)}</div>
                        <div>State 32: {displayState(state32)}</div>
                    </fieldset>

                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <SuperSelectField
                            name='state31'
                            multiple
                            floatingLabel='floatingLabelText state31'
                            hintText='Complex example'
                            onChange={this.handleSelection}
                            value={state31}
                            elementHeight={58}
                            selectionsRenderer={this.handleCustomDisplaySelections('state31')}
                            style={{ width: 300, marginTop: 20, marginRight: 40 }}
                            showAutocompleteThreshold='always' //để luôn bật autocomplete (autocomplete chỉ bật khi set number threshold < số menuitem, để always thì sẽ luôn bật)
                        >
                            {countriesNodeList}
                        </SuperSelectField>

                        <SuperSelectField
                            name='state32'
                            multiple
                            withResetSelectAllButtons
                            floatingLabel={CustomFloatingLabel}
                            floatingLabelStyle={{ color: pink200 }}
                            floatingLabelFocusStyle={{ color: pink500 }}
                            hintTextAutocomplete={customHintTextAutocomplete}
                            underlineStyle={{ borderColor: teal200 }}
                            underlineFocusStyle={{ borderColor: teal500 }}
                            autocompleteStyle={{ color: 'red', fontSize: 25 }}
                            autocompleteUnderlineStyle={{ borderColor: yellow200 }}
                            autocompleteUnderlineFocusStyle={{ borderColor: yellow500 }}
                            hintText='Simple example'
                            onChange={this.handleSelection}
                            onAutoCompleteTyping={this.handleAutoCompleteTyping}
                            value={state32}
                            hoverColor='rgba(3, 169, 244, 0.15)'
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            style={{ width: 200, marginTop: 20 }}
                            menuCloseButton={<FlatButton label='close' hoverColor='lightSalmon' />}
                            dropDownIcon={<ArrowDown />}
                        >
                            {dataSourceNodes}
                        </SuperSelectField>
                    </div>
                </section>
            </MuiThemeProvider>
        );
    }
}




class SelectExample2 extends Component {
    state = {
        isFetchingStates: true,
        isFetchingCounties: false,
        selectedStates: [],
        stateNodes: [],
        selectedCounties: [],
        countyNodes: [],
    };

    componentDidMount = () => {
        this.setState({ isFetchingStates: true });

        // Ideally should be externalized in a HoC,
        // with stateNodes && countyNodes in props
        window.setTimeout(() => {
            const stateNodes = data.states.map(({ code, name, capital }) => (
                <div key={code} value={name}>
                    {name}
                </div>
            ));
            this.setState({ stateNodes, isFetchingStates: false });
            console.log('States updated'); // eslint-disable-line no-console
        }, 5000); // simulates a 5secs fetch delay
    };

    handleStateSelection = (selectedStates, name) => {
        console.debug('selectedStates', selectedStates); // eslint-disable-line no-console
        this.setState({ selectedStates, isFetchingCounties: true }, () => {
            const countyNodes = data.counties.reduce((nodes, { INCITS, county, state }) => {
                if (!selectedStates.find(({ value }) => value === state)) return nodes;
                return [
                    ...nodes,
                    <div key={INCITS} value={county}>
                        {county}
                    </div>,
                ];
            }, []);
            // must also check if previous selections are still consistent with new selectedStates
            const selectedCounties = this.state.selectedCounties.filter(({ value }) =>
                countyNodes.find((node) => node.props.value === value)
            );

            window.setTimeout(() => {
                this.setState({ countyNodes, selectedCounties, isFetchingCounties: false });
                console.log('Counties updated'); // eslint-disable-line no-console
            }, 3000); // simulates a 3secs fetch delay
        });
    };

    handleCountySelection = (selectedCounties, name) => this.setState({ selectedCounties });

    selectionsRenderer = (values, hintText, name) => {
        const { isFetchingStates, isFetchingCounties } = this.state;

        switch (name) {
            case 'states':
                if (isFetchingStates) {
                    return (
                        <div>
                            <CircularProgress size={20} style={{ marginRight: 10 }} />
                            {hintText}
                        </div>
                    );
                }
                break;
            case 'counties':
                if (isFetchingCounties) {
                    return (
                        <div>
                            <CircularProgress size={20} style={{ marginRight: 10 }} />
                            {hintText}
                        </div>
                    );
                }
                break;
            default:
        }

        if (!values) return hintText;
        const { value, label } = values;
        if (Array.isArray(values)) {
            return values.length ? values.map(({ value, label }) => label || value).join(', ') : hintText;
        } else if (label || value) return label || value;
        else return hintText;
    };

    render() {
        const { selectedStates, stateNodes, selectedCounties, countyNodes } = this.state;

        console.debug('countyNodes', countyNodes); // eslint-disable-line no-console

        return (
            <MuiThemeProvider>
                <section style={{ margin: 40 }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <SuperSelectField
                            name='states'
                            hintText='Select a state...'
                            multiple
                            selectionsRenderer={(values, hintText) => this.selectionsRenderer(values, hintText, 'states')}
                            value={selectedStates}
                            onChange={this.handleStateSelection}
                            checkPosition='left'
                            style={{ width: 300, marginRight: 60 }}
                        >
                            {stateNodes}
                        </SuperSelectField>

                        <SuperSelectField
                            name='counties'
                            hintText='Select a county...'
                            multiple
                            selectionsRenderer={(values, hintText) => this.selectionsRenderer(values, hintText, 'counties')}
                            value={selectedCounties}
                            onChange={this.handleCountySelection}
                            checkPosition='left'
                            style={{ width: 300 }}
                            
                        >
                            {countyNodes}
                        </SuperSelectField>
                    </div>
                </section>
            </MuiThemeProvider>
        );
    }
}

export { SelectExample2, SelectExample1 };

