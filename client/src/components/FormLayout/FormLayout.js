import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import LoadingBar from '../LoadingBar';
import NavBar from '../NavBar';
import MainForm from '../MainForm';
import { setLastSearchCookie, getLastSearchCookie } from '../../utils/cookie';
import { ticketRequestController } from '../../utils/api';

import styles from './FormLayout.css';

const cx = cl.bind(styles);

const FormLayout = ({
    getTickets,
    getTicketsCancel,
    resetSearchQuery,
    resetTickets,
    setUpFormInput,
    isLoading,
    hasTickets,
}) => {
    const updateSearch = () => {
        const lastSearchQuery = getLastSearchCookie();
        if (lastSearchQuery) {
            setUpFormInput(lastSearchQuery);
        } else {
            resetSearchQuery();
        }
    };

    const cancelRequest = () => {
        if (isLoading) {
            ticketRequestController.abort();
            getTicketsCancel();
        }
    };

    const onResetState = () => {
        window.history.pushState('', '', '/');
        cancelRequest();
        resetTickets();
        updateSearch();
    };

    const onLoad = (search) => {
        if (search.length > 0) {
            getTickets(search);
            setUpFormInput(search);
        } else {
            onResetState();
        }
    };

    const onSubmit = (search) => {
        setLastSearchCookie(search);
        getTickets(search);
        window.history.pushState({ search }, '', search);
    };

    useEffect(() => {
        const { search } = window.location;
        window.onpopstate = () => onLoad(search);
        onLoad(search);
    }, [window.location.search]);

    return (
        <div className={cx('container', { hasTickets })}>
            <div className={cx('innerContainer', { hasTickets })}>
                <LoadingBar
                    isLoading={isLoading}
                />
                <NavBar
                    onResetState={onResetState}
                />
                <MainForm
                    onSubmit={onSubmit}
                    isLoading={isLoading}
                    hasTickets={hasTickets}
                />
            </div>
        </div>
    );
};

FormLayout.propTypes = {
    getTickets: PropTypes.func.isRequired,
    getTicketsCancel: PropTypes.func.isRequired,
    resetSearchQuery: PropTypes.func.isRequired,
    resetTickets: PropTypes.func.isRequired,
    setUpFormInput: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    hasTickets: PropTypes.bool,
};

FormLayout.defaultProps = {
    hasTickets: false,
};

export default FormLayout;
