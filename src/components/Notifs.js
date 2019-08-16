import React from 'react';
import { connect } from 'react-redux';
import Notif from './Notif';
import PropTypes from 'prop-types';

// This checks to see if object is immutable and properly access it
const getter = (obj, propName) => (obj.get ? obj.get(propName) : obj[propName]);

const Notifs = (props) => {
  const {
    notifications,
    className,
    componentClassName,
    CustomComponent,
  } = props;

  const renderedNotifications = notifications.map((notification) => {
    if (CustomComponent) {
      return (
        <CustomComponent
          {...props}
          componentClassName={componentClassName}
          key={getter(notification, 'id')}
          id={getter(notification, 'id')}
          message={getter(notification, 'message')}
          kind={getter(notification, 'kind')}
        />
      );
    }
    return (
      <Notif
        {...props}
        componentClassName={componentClassName}
        key={getter(notification, 'id')}
        id={getter(notification, 'id')}
        message={getter(notification, 'message')}
        kind={getter(notification, 'kind')}
      />
    );
  });
  const classes = [
    `${componentClassName}__container`,
    className,
  ].join(' ').split();

  return (
    <div className={classes} >
      {renderedNotifications}
    </div>
  );
};

Notifs.defaultProps = {
  className: null,
  componentClassName: 'notif',
  CustomComponent: null,
};

Notifs.propTypes = {
  notifications: PropTypes.array.isRequired,
  className: PropTypes.string,
  CustomComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.element,
  ]),
  componentClassName: PropTypes.string,
};

function mapStateToProps(state) {
  return { notifications: state.get ? state.get('notifs') : state.notifs };
}

export default connect(mapStateToProps)(Notifs);
