import graphQL from 'graphql';
import _ from 'lodash';

const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull
} = graphQL;

const posts_data = [
    {
        id: 0,
        title: 'GraphQL Tutorial',
        content: 'This is content of this post',
        author: 'Admin'
    },
    {
        id: 1,
        title: 'Post #2',
        content: 'This is super cool post',
        author: 'Admin'
    }
];

const authors = [{
    id: 0,
    name: 'Admin'
}];

const Author = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString }
    })
});

const Posts = new GraphQLObjectType({
    name: 'Posts',
    fields: () => ({
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        author: { type: GraphQLString },
        author_data: {
            type: Author,
            resolve(parent, args) {
                return _.find(authors, (author) => {
                    if (parent.author === author.name) return author;
                });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'Root',
    fields: {
        post: {
            type: Posts,
            args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                return _.find(posts_data, (post) => {
                    if (post.id === args.id) return post;
                });
            }
        },
        posts: {
            type: new GraphQLList(Posts),
            resolve(parent, args) {
                return posts_data;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addPosts: {
            type: Posts,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
                title: { type: new GraphQLNonNull(GraphQLString) },
                content: { type: new GraphQLNonNull(GraphQLString) },
                author: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return posts_data.push({
                    id: args.id,
                    title: args.title,
                    content: args.content,
                    author: args.author
                });
            }
        }
    }
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
