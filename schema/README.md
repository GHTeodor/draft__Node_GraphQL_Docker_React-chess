Find One Post:
{
    post(id:0) {
        id,
        title,
        content,
        author
    }
}

Find Posts:
{
    posts {
        id,
        title,
        content,
        author,
        author_data {
            id,
            name
        }
    }
}

Migration: (Create Post)
mutation {
    addPosts(id:2, title: "New post", content: "Cool db relation", author: "Admin") {
        id,
        title,
        content,
        author
    }
}
