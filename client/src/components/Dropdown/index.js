import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import ReactOutsideEvent from 'react-outside-event';
import cl from 'classnames/bind';

import { classNamesPropType } from '../../entities/propTypes';

import styles from './index.css';

const cx = cl.bind(styles);

class Dropdown extends React.Component {
    static propTypes = {
        trigger: PropTypes.node.isRequired,
        children: PropTypes.node.isRequired,
        classNames: classNamesPropType,
    }

    static defaultProps = {
        classNames: '',
    }

    state = {
        isOpen: false,
    }

    onToggle = () => {
        const { isOpen } = this.state;

        this.setState(() => ({
            isOpen: !isOpen,
        }));
    }

    onOutsideEvent = () => {
        this.setState(() => ({
            isOpen: false,
        }));
    }

    renderDropdown = () => {
        const { isOpen } = this.state;
        const { children } = this.props;

        return (
            <CSSTransition
                in={isOpen}
                timeout={100}
                classNames="message"
                unmountOnExit
            >
                <div className={cx('dropdown')}>
                    {children}
                </div>
            </CSSTransition>
        );
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.onToggle();
        }
    }

    render() {
        const { trigger, classNames } = this.props;

        return (
            <div
                className={cx({
                    ...classNames,
                    container: true,
                })}
                role="button"
                data-toggle="dropdown"
                tabIndex="0"
                onClick={this.onToggle}
                onKeyPress={this.handleKeyPress}
            >
                <div
                    className={cx('trigger')}
                    role="button"
                    data-toggle="dropdown"
                    tabIndex="0"
                    onClick={this.onToggle}
                    onKeyPress={this.handleKeyPress}
                >
                    {trigger}
                </div>
                {this.renderDropdown()}
            </div>
        );
    }
}

export default ReactOutsideEvent(Dropdown, ['click']);