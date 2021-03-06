import DS from 'ember-data';
import { A } from '@ember/array';
import EmberObject, { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Timelineable from 'client/mixins/model-timelineable';

export default DS.Model.extend(Timelineable, {
  user: DS.belongsTo('user', { inverse: 'posts' }),
  images: DS.hasMany('image'),

  shortText: DS.attr('string'),
  text: DS.attr('string'),

  date: alias('timelineItem.date'),
  isPrivate: alias('timelineItem.isPrivate'),

  panels: computed('images.[]', {
    get() {
      return this.get('images');
    }
  }),

  panelsWithBlank: computed('panels.[]', {
    get() {
      const panels = this.get('panels');

      return panels.get('length') === 0 ? A([this.get('_blankPanel')]) : A(panels.toArray());
    }
  }),

  _blankPanel: computed({
    get() {
      return EmberObject.create({ postNavComponent: 'timeline-item-nav/slideshow/post/blank', post: { content: this } });
    }
  })
});
