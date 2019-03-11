import React from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames/bind';

import Ticket from '../Ticket';
import NoResults from '../../components/NoResults';
import { ticketPropType } from '../../entities/propTypes';

import styles from './index.css';

const cx = cl.bind(styles);

const TicketList = (props) => {
    const {
        currencyRates,
        hasTickets,
        filteredTickets,
        allTicketsCount,
        onFilterReset,
    } = props;

    return (
        hasTickets && filteredTickets.length === 0
            ? (
                <NoResults
                    ticketsCount={allTicketsCount}
                    onFilterReset={onFilterReset}
                />
            )
            : (
                <div className={cx('container')}>
                    {filteredTickets.map(ticket => (
                        <Ticket
                            key={ticket.id}
                            ticket={ticket}
                            rates={currencyRates}
                        />
                    ))}
                </div>
            )
    );
};

TicketList.propTypes = {
    filteredTickets: PropTypes.arrayOf(ticketPropType),
    currencyRates: PropTypes.objectOf(PropTypes.number),
    hasTickets: PropTypes.bool.isRequired,
    allTicketsCount: PropTypes.number.isRequired,
    onFilterReset: PropTypes.func.isRequired,
};

TicketList.defaultProps = {
    filteredTickets: [],
    currencyRates: {},
};

export default React.memo(TicketList);
