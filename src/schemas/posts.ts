import {articles, outputData} from "@/schemas/outputData"
import {normalize, schema} from "normalizr"

const user = new schema.Entity('users')

const comment = new schema.Entity('comments', {
    commenter: user
})

const article = new schema.Entity('article', {
    author: user,
    comments: [comment]
})

const normalizedData = normalize(outputData, article)

articles.forEach(post => {
    console.log(normalize(post, article))
})
