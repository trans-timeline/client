import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('number-bubble', 'Integration | Component | number bubble', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{number-bubble}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#number-bubble}}
      template block text
    {{/number-bubble}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
