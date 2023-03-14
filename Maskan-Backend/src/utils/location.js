// `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
//   address
// )}&key=${API_KEY}`
import axios from"axios";
const API_KEY = "b577904c008086";
const getCoordsForAddress = async (address)=> {
  
    const response = await axios.get(
        `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${encodeURIComponent(
          address
        )}&format=json`
      );
      const data = response.data
      if(!data){
         const error = new Error(`could not find the location for ${address}`)
          throw error
        }
      // let coordinates =[]
      const lat = data[0].lat
      const lng = data[0].lon
      // coordinates.push({lat:lat,lng:lng})
      let coordinates = {lat,lng}
    console.log(coordinates);
      return coordinates
}

export default getCoordsForAddress