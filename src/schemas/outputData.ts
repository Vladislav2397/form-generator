export const outputData = {
    id: "123",
    author: {
        id: "1",
        name: "Paul"
    },
    title: "My awesome blog post",
    comments: [
        {
            id: "324",
            commenter: {
                id: "2",
                name: "Nicole"
            }
        }
    ]
}

export const articles = [
    {
        id: "1",
        author: {
            id: "2",
            name: "Paul"
        },
        title: "My awesome blog post",
        comments: [
            {
                id: "1",
                text: 'comment 1',
                commenter: {
                    id: "2",
                    name: "Nicole"
                }
            },
            {
                id: "2",
                text: 'comment 2',
                commenter: {
                    id: "2",
                    name: "Nicole"
                }
            }
        ]
    },
    {
        id: "2",
        author: {
            id: "1",
            name: "Paul"
        },
        title: "My awesome blog post",
        comments: [
            {
                id: "3",
                text: 'Hello',
                commenter: {
                    id: "3",
                    name: "Bob"
                }
            },
            {
                id: "4",
                text: 'world',
                commenter: {
                    id: "1",
                    name: "Paul"
                }
            },
            {
                id: "5",
                text: '!',
                commenter: {
                    id: "2",
                    name: "Nicole"
                }
            }
        ]
    }
]
