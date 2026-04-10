const React = require('react');
const { Text } = require('react-native');

function MaterialIconsMock(props) {
  const label = props.name || 'icon';
  return React.createElement(Text, null, label);
}

module.exports = MaterialIconsMock;
module.exports.default = MaterialIconsMock;
