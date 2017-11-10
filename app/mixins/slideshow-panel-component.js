import { equal, oneWay } from '@ember/object/computed';
import Mixin from '@ember/object/mixin';
import SlideshowComponent from './slideshow-component';

export default Mixin.create(SlideshowComponent, {
  classNames: ['post-nav-slideshow-panel'],

  isAnimating: equal('axis', 'x'),

  isOutgoing: oneWay('panel.isOutgoing'),
  isIncoming: oneWay('panel.isIncoming'),

  didInsertElement(...args) {
    this._super(...args);

    this.loadPanel();
  },

  loadPanel() {
    this.set('panel.isLoaded', true);
  }
});