import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import PostNavRouteMixin from 'client/mixins/post-nav-route';
import RouteTitleMixin from 'client/mixins/route-title';

export default Route.extend(PostNavRouteMixin, RouteTitleMixin, {
  queryParams: {
    query: {
      refreshModel: true
    }
  },

  messageBus: service(),
  intl: service(),

  _posts: alias('controller.model'),
  _defaultQueryParams: {
    query: ''
  },

  afterModel(...args) {
    this._super(...args);

    this.set('meta.title', args[1].queryParams.query);
  },

  model(params) {
    this.setProperties({
      reachedLastPost: false
    });

    return this.store.query('post', { query: params.query, page: 0, perPage: 10 });
  }
});
