import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { isBlank } from '@ember/utils';
import Route from '@ember/routing/route';

export default Route.extend({
  currentUser: service(),

  currentUserModel: alias('currentUser.user'),

  model(params) {
    return this.store.query('user-profile', { filter: { user_id: this.modelFor('users.user').id }, include: 'user.user_identities,user.user_identities.identity' }).then(function(userProfile) {
      return userProfile.get('firstObject');
    });
  },

  actions: {
    block(blocked, resolve) {
      const blocker = this.get('currentUserModel');
      const block = this.store.createRecord('block', {
        blocked,
        blocker
      });

      block.save().catch(() => block.deleteRecord()).finally(resolve);
    },

    follow(followed, resolve) {
      const follower = this.get('currentUserModel');
      const follow = this.store.createRecord('follow', {
        followed,
        follower
      });

      follow.save().catch(() => follow.deleteRecord()).finally(resolve);
    },

    requestPrivate(follow, resolve) {
      if (follow.get('hasRequestedPrivate')) return resolve();

      follow.set('hasRequestedPrivate', true);

      follow.save().catch(() => follow.set('hasRequestedPrivate', false)).finally(resolve);
    },

    unblock(block, resolve) {
      if (isBlank(block)) return resolve();

      block.destroyRecord().finally(resolve);
    },

    unfollow(follow, resolve) {
      if (isBlank(follow)) return resolve();

      follow.destroyRecord().finally(resolve);
    }
  }
});
