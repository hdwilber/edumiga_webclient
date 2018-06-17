import { Types, defaultSpec } from './defaults'

const Specs = {
  id: Types.string,
  displayName: Types.string,
  title: Types.string,
  firstName: Types.string,
  lastName: Types.string,
  birthDate: {
    save: function () {},
    type: Types.string,
  },
  occupation: Types.string,
  country: Types.string,
  state: Types.string,
  county: Types.string,
  address: Types.string,
  phones: [Types.string],
  interests: [Types.string],
  location: {
    type: Types.object,
    default: {
      point: null,
      zoom: 10,
    }
  },
  photo: defaultSpec.image,
}

export default Specs


