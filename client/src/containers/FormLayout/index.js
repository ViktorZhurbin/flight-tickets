import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';
import { connect } from 'react-redux';

import { resetTickets, fetchTicketData } from '../../store/tickets';
import {
    resetSearch,
    setFormInput,
} from '../../store/search';

import LoadingBar from '../../components/LoadingBar';
import NavBar from '../NavBar';
import MainForm from '../MainForm';

import styles from './index.css';

export const cx = cl.bind(styles);


class FormLayout extends React.PureComponent {
    static propTypes = {
        getTickets: PropTypes.func.isRequired,
        resetSearch: PropTypes.func.isRequired,
        resetTicketData: PropTypes.func.isRequired,
        setUpFormInput: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        hasTickets: PropTypes.bool,
    };

    static defaultProps = {
        hasTickets: false,
    };

    componentDidMount() {
        window.onpopstate = () => this.onUpdateState();
        this.onUpdateState();
    }

    onUpdateState = () => {
        const { search } = window.location;
        if (search.length > 0) {
            this.props.setUpFormInput(search);
            this.props.getTickets(search);
        } else {
            this.onResetState();
        }
    }

    onResetState = () => {
        window.history.pushState('', '', '/');
        this.props.resetSearch();
        this.props.resetTicketData();
    }

    onSubmit = ({ queryObject, queryString }) => {
        window.history.pushState(queryObject, '', queryString);
        this.props.getTickets(queryString);
    };

    render() {
        const {
            isLoading,
            hasTickets,
        } = this.props;

        return (
            <div className={cx('container', { hasTickets })}>
                <div className={cx('innerContainer', { hasTickets })}>
                    <LoadingBar
                        isLoading={isLoading}
                    />
                    <NavBar
                        onResetState={this.onResetState}
                    />
                    <MainForm
                        onSubmit={this.onSubmit}
                        isLoading={isLoading}
                        hasTickets={hasTickets}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ tickets }) => ({
    isLoading: tickets.isLoading,
    hasTickets: tickets.hasTickets,
});

const mapDispatchToProps = dispatch => ({
    getTickets: query => dispatch(fetchTicketData(query)),
    resetTicketData: () => dispatch(resetTickets()),
    resetSearch: () => dispatch(resetSearch()),
    setUpFormInput: search => dispatch(setFormInput(search)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormLayout);
