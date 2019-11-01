const { ApolloError } = require("apollo-server");

const queryResolvers = app => ({
  viewer(parent, args, { user }, info) {
    if (context.token) {
      return jwt.decode(context.token, app.get('JW_SECRET'));
    } else
      return null;
  },
  async user(parent, { id }, { pgResource }, info) {
    try {
      const user = await pgResource.getUserById(id);
      user.fullname = user.username;
      if (id === null) {
        return null;
      } else
      return user;
    } catch (e) {
      throw new ApolloError(e);
    }
  },
  async items(parent, { filter }, {pgResource}) {
    try {
      const items = await pgResource.getItems(filter);
      return items;
    } catch (e) {
      throw new ApolloError(e);
    }
  },
  async tags(parent, args, {pgResource}, info) {
    try {
      const items = await pgResource.getTags();
      return tags;
    } catch (e) {
      throw new ApolloError(e);
    }
  },
});
module.exports = queryResolvers;
