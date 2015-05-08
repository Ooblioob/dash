var Store = require('./Store');
var resources = require('../../utils/resources');


var LoggedInStore = Store.Model.extend({
  url: resources.routes.CURRENT_USER_INFO,
  idAttribute: 'name',
  isLoggedIn: function() {
    return (this.get('loggedIn') === undefined) ? true : this.get('loggedIn');
  },
  fetch: function( opts ) {
    var that = this;
    opts = opts || {};
    var oldError = opts.error

    opts.error = function( event, xhr ) {
      if (xhr.status == 401) {
        that.set('loggedIn', false);
      }
      if (oldError) {
        oldError(arguments);
      }
    }
    Store.Model.prototype.fetch.apply(this, arguments);
  }
});

module.exports = LoggedInStore;
