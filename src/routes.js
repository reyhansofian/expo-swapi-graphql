import App from './App';
import Film from './Film';
import People from './People';
import Planet from './Planet';
import Species from './Species';
import Starship from './Starship';
import Vehicle from './Vehicle';

export const routes = {
  Home: {
    name: 'Home',
    screen: App,
    icon: {
      type: 'md-checkmark-circle',
      size: 32,
      color: 'green',
    },
  },
  Film: {
    name: 'Film',
    screen: Film,
    icon: {
      type: 'md-film',
      size: 32,
      color: 'green',
    },
  },
  People: {
    name: 'People',
    screen: People,
    icon: {
      type: 'md-people',
      size: 32,
      color: 'green',
    },
  },
  Planet: {
    name: 'Planet',
    screen: Planet,
    icon: {
      type: 'md-planet',
      size: 32,
      color: 'green',
    },
  },
  Species: {
    name: 'Species',
    screen: Species,
    icon: {
      type: 'md-bug',
      size: 32,
      color: 'green',
    },
  },
  Starship: {
    name: 'Starship',
    screen: Starship,
    icon: {
      type: 'md-jet',
      size: 32,
      color: 'green',
    },
  },
  Vehicle: {
    name: 'Vehicle',
    screen: Vehicle,
    icon: {
      type: 'md-car',
      size: 32,
      color: 'green',
    },
  },
};
