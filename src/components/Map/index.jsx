import React, { useEffect } from 'react'

const GoogleMapComponent = () => {
  useEffect(() => {
    let map, infoWindow, marker

    const initMap = () => {
      map = new window.google.maps.Map(document.getElementById('map'), {
        center: {
          lat: 31.9636,
          lng: 35.9306
        },
        zoom: 15
      })
      infoWindow = new window.google.maps.InfoWindow()

      const locationButton = document.createElement('button')

      locationButton.textContent = 'Pan to Current Location'
      locationButton.classList.add('custom-map-control-button')
      map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(
        locationButton
      )

      // Fetch the user's current location on component mount
      const fetchCurrentLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }

              infoWindow.setPosition(pos)
              infoWindow.setContent('Location found.')
              infoWindow.open(map)
              map.setCenter(pos)

              // Create a marker at the user's location
              if (marker) {
                marker.setMap(null) // Remove existing marker
              }
              marker = new window.google.maps.Marker({
                position: pos,
                map: map,
                title: 'You are here'
              })
            },
            () => {
              handleLocationError(true, infoWindow, map.getCenter())
            }
          )
        } else {
          handleLocationError(false, infoWindow, map.getCenter())
        }
      }

      locationButton.addEventListener('click', fetchCurrentLocation)

      // Fetch and set the current location on component mount
      fetchCurrentLocation()
    }

    const handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
      infoWindow.setPosition(pos)
      infoWindow.setContent(
        browserHasGeolocation
          ? 'Error: The Geolocation service failed.'
          : "Error: Your browser doesn't support geolocation."
      )
      infoWindow.open(map)
    }

    const googleMapScript = document.createElement('script')
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBacjneM_TduGcLlnfVINx-_3YGmWSAGGY&callback=initMap`
    googleMapScript.async = true
    googleMapScript.defer = true
    window.initMap = initMap
    window.document.body.appendChild(googleMapScript)

    return () => {
      window.document.body.removeChild(googleMapScript)
      delete window.initMap
    }
  }, [])

  return <div id='map' style={{ width: '100%', height: '400px' }} />
}

export default GoogleMapComponent
