'use strict';

var React = require('react-native');

var {
  AppRegistry,
  View,
  StyleSheet,
  ListView,
} = React;

var CollectionView = React.createClass({
    groupItems: function(items, itemsPerRow) {
        var itemsGroups = [];
        var group = [];
        items.forEach(function(item) {
          if (group.length === itemsPerRow) {
            itemsGroups.push(group);
            group = [item];
          } else {
            group.push(item);
          }
        });

        if (group.length > 0) {
          itemsGroups.push(group);
        }

        return itemsGroups;
    },
    getInitialState: function() {
        return {
          items: [],
          dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
          renderItem: null,
          style: undefined,
          itemsPerRow: 1,
          onEndReached: undefined
        };
    },
    renderGroup: function(group) {
      var that = this;
      var items = group.map(function(item) {
        return that.props.renderItem(item);
      });
      return (
        <View style={styles.group}>
          {items}
        </View>
      );
    },
    render: function() {
        var groups = this.groupItems(this.props.items, this.props.itemsPerRow);

        return (<ListView
          dataSource={this.state.dataSource.cloneWithRows(groups)}
          renderRow={this.renderGroup}
          style={this.props.style}
          onEndReached={this.props.onEndReached}
          scrollEnabled={this.props.scrollEnabled}
          renderHeader={this.props.renderHeader}
          renderFooter={this.props.renderFooter}
          pageSize={this.props.pageSize | 1}
        />);
    },
});


var styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
  }
});

module.exports = CollectionView;
