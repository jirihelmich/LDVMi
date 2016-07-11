import React from 'react'
import iconNames from '../icons'

const icons = {};
iconNames.forEach(iconName => {
  const component = require('material-ui/svg-icons/' + iconName.replace(/_/g, '-')).default;
  icons[iconName] = component;
  icons[iconName.replace(/[^\/]+\//, '')] = component;
});

const Icon = props => {
  const IconComponent = icons[props.icon];

  if (!IconComponent) {
    console.warn(`The icon "${props.icon}" does not exist! Have you added this icon to the icons.js file?`);
    return <div {...props}>Missing icon!</div>
  }

  return <IconComponent {...props} />;
};

export default Icon;
