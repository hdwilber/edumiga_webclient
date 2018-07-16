import Types from '../../defaults'

const Type = {
  id: Types.string,
  displayName: Types.string,
  title: Types.string,
  firstName: Types.string,
  lastName: Types.string,
  birthDate: {
    save: function () {},
  },
  occupation: Types.string,
  country: Types.string,
  state: Types.string,
  county: Types.string,
  address: Types.string,
  phones: [Types.string],
  interests: [Types.string],
  location: {
    default: {
      point: null,
      zoom: 10,
    }
  },
  photo: Types.image,
}

export default Type

