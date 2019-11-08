const { ApolloError } = require("apollo-server");

const relationResolvers = {
  User: {
    async items({ id }, args, { pgResource }) {
      try {
        const itemowner = await pgResource.getItemsForUser(id)
        return itemowner
      } catch (e) {
        throw new AppoloError(e)
      }
      },

     async borrowed({ id }, args, { pgResource }) {
     try {
        const borrowedItem = await pgResource.getItemsForUser(id)
        return borrowedItem
      } catch (e) {
        throw new AppoloError(e)
      }
    }
  },

  Item: {
    async itemowner({ itemowner }, args, { pgResource }) {
      try {
         const getItemOwner = await pgResource.getItemsForUser(itemowner)
         return getItemOwner
       } catch (e) {
         throw new AppoloError(e)
       }
     },
     async tags({ id }, args, { pgResource }) {
      try {
         const getTags = await pgResource.getTagsForUser(id)
         return getTags
       } catch (e) {
         throw new AppoloError(e)
       }
     },
     async borrower({ id }, args, { pgResource }) {
      try {
         const borrowedItem = await pgResource.getUserById(id)
         return borrowedItem
       } catch (e) {
         throw new AppoloError(e)
       
       } 
    }  
  }
}

module.exports = relationResolvers
