import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Checkbox from '../../components/Checkbox';
import { inflectStopsEn } from '../../utils/inflection';

import styles from './index.css';

const cx = classNames.bind(styles);

class FilterGroup extends React.Component {
    static propTypes = {
        stopOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
        selectedStops: PropTypes.objectOf(
            PropTypes.bool,
        ).isRequired,
        onFilter: PropTypes.func.isRequired,
    }

    onToggleFilter = (key) => {
        const { onFilter, selectedStops } = this.props;

        const selectedFilters = {
            ...selectedStops,
            [key]: !selectedStops[key],
        };
        onFilter(selectedFilters);
    }

    onToggleAll = (isAllChecked) => {
        const { onFilter, stopOptions } = this.props;

        const selectedFilters = {};
        stopOptions.forEach(
            (key) => { selectedFilters[key] = !isAllChecked; },
        );
        onFilter(selectedFilters);
    }

    render() {
        const { stopOptions, selectedStops } = this.props;

        const selectedCount = Object.values(selectedStops).filter(item => Boolean(item));
        const isAllChecked = selectedCount.length === stopOptions.length;

        return (
            stopOptions
                ? (
                    <div className={cx('container')}>
                        <div className={cx('title')}>Number of stops</div>
                        <div className={cx('filters')}>
                            <Checkbox
                                className={cx('filterItem')}
                                id="all"
                                checked={isAllChecked}
                                name="All"
                                onChange={() => this.onToggleAll(isAllChecked)}
                            />
                            {stopOptions.map((item) => {
                                const isChecked = Boolean(selectedStops[item]);
                                const name = inflectStopsEn(item);

                                return (
                                    <Checkbox
                                        key={item}
                                        className={cx('filterItem')}
                                        id={item}
                                        checked={isChecked}
                                        name={name}
                                        onChange={() => this.onToggleFilter(item)}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )
                : null
        );
    }
}

export default FilterGroup;
