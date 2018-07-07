import { computed, get } from '@ember/object';
import { alias, oneWay, filter } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/string';
import { isPresent } from '@ember/utils';
import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

const hasWebRTCSupport = isPresent(navigator.mediaDevices);

export default Component.extend({
  cameraOn: hasWebRTCSupport,
  hasWebRTCSupport,

  classNames: ['image-editor'],

  currentUser: service(),
  messageBus: service(),
  store: service(),

  user: oneWay('currentUser.user'),

  init(...args) {
    this._super(...args);

    this.get('messageBus').subscribe('didResize', this, this._adjustImageContainer);
  },

  _adjustImageContainer() {
    this.notifyPropertyChange('containerStyle');
  },

  didInsertElement(...args) {
    this._super(...args);

    Ember.run.later(() => {
      this.notifyPropertyChange('containerStyle');
    }, 100);
  },

  containerStyle: computed({
    get() {
      const $imageContainer = this.$();
      const destinationWidth = this.get('width');
      const destinationHeight = this.get('height');
      const height = $imageContainer.height();
      const width = $imageContainer.width();
      const idealWidth = height * (destinationWidth / destinationHeight);

      if (height >= destinationHeight && width >= destinationWidth) return htmlSafe('');
      else if (width > idealWidth) return htmlSafe(`height: ${height}px; width: ${idealWidth}px;`);
      else return htmlSafe(`height: ${width * (destinationHeight / destinationWidth)}px; width: ${width}px;`);
    }
  }),

  actions: {
    deleteImage(image) {
      this.attrs.removeImage(image);
      this.set('cameraOn', true);
    },

    openCamera() {
      this.set('cameraOn', true);
    },

    selectImage(image) {
      this.setProperties({
        cameraOn: false,
        displayImage: image
      })
    },

    sortEndAction() {
      this.get('panels').forEach((panel, index) => {
        panel.set('order', index);
      });
    },

    takePicture(dataUri) {
      this.attrs.addImage(dataUri);
    },

    uploadImage(file) {
      file.readAsDataURL().then((dataUri) => {
        this.attrs.addImage(dataUri);
      });
    }
  }
});
