import Component from '@ember/component';
import SlideshowPanelComponentMixin from 'client/mixins/slideshow-panel-component';

export default Component.extend(SlideshowPanelComponentMixin, {
  classNames: ['timeline-item-nav-slideshow-blank']
});
