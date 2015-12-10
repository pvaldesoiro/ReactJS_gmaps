import React from 'react';

export default class Gmap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {canvasMap: null, markers: [], token: ''};
  }

  // Remove markers when the component is unmounted for every reason
  componentWillUnmount() {
    this.state.markers.forEach(marker => marker.setMap(null));
    this.setState({markers: []});
    this.state.canvasMap.clearOverlays();
  }

  componentDidMount() {
    this.createMap();
    this.getToken()
      .done(() => this.getMarkersData()
        .done(markers => this.createMarkers(markers)));
  }

  createMap() {
    var mapOptions = {
      zoom: 13,
      center: new google.maps.LatLng(52.516843, 13.383301)
    };

    this.setState({
      canvasMap: new google.maps.Map(this.refs.canvasMap, mapOptions)
    });
  }

  getToken() {
    return this.apiCall('https://foxtest.herokuapp.com/v1/token', {},
                        data => this.setState({token: data.token}));
  }

  getMarkersData() {
    return this.apiCall('https://foxtest.herokuapp.com/v1/offers',
                        {token: this.state.token});
  }

  apiCall(url, data, success) {
    return $.ajax({
      type: 'POST',
      headers: this.props.authenticationData,
      url: url,
      data: {token: this.state.token},
      success: success,
    });
  }

  createMarkers(markers) {
    var oldMarkers = $.extend([], this.state.markers);

    var newMarkers = markers.map(marker => new google.maps.Marker({
      position: new google.maps.LatLng(marker.lat, marker.long),
      map: this.state.canvasMap
    }));

    this.setState({markers: oldMarkers.concat(newMarkers)});
  }

  render() {
    return (
      <div className="fullscreen-map" ref="canvasMap"></div>
    );
  }
}
