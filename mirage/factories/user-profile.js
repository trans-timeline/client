import { Factory, faker } from 'ember-cli-mirage';
import { A } from '@ember/array';

export default Factory.extend({
  description: faker.lorem.paragraph,
  totalPosts: faker.random.number,
  website: faker.internet.url,

  afterCreate(userProfile, server) {
    const summary = userProfile.user.posts.models.reduce((summary, post) => {
      post.tagIds.forEach((tagId) => {
        summary[tagId] = summary[tagId] || [];
        summary[tagId].push(post.id);
      });

      return summary;
    }, {});

    const tagIds = A(userProfile.user.posts.models.reduce((tagIds, post) => {
      return tagIds.concat(post.tagIds);
    }, [])).uniq();

    userProfile.userTagSummary = server.create('user-tag-summary', {
      userProfile,
      tagIds,
      summary
    }).save();

    userProfile.totalPosts = userProfile.user.posts.models.length;

    userProfile.save();
  }
});
