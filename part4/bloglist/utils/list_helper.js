const dummy = (blogs) => {
    return 1
}

totalLikes = (blogs) => {
    let acc = 0
    for (let i = 0; i < blogs.length; i++) {
        acc += blogs[i].likes
    }
    return acc
}

favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    let best = blogs[0]
    for (let i = 0; i < blogs.length; i++) {
        best = blogs[i].likes > best.likes ? blogs[i] : best
    }
    return best
}

mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    let count = new Map()

    for (let i = 0; i < blogs.length; i++) {
        if (count.get(blogs[i].author)) {
            count.set(blogs[i].author, count.get(blogs[i].author) + 1)
        } else {
            count.set(blogs[i].author, 1)
        }
    }
    let most = count.entries().reduce((prev, curr) => curr[1] > prev[1] ? curr : prev)

    return { author: most[0], blogs: most[1] }
}

mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    let count = new Map()

    for (let i = 0; i < blogs.length; i++) {
        if (count.get(blogs[i].author)) {
            count.set(blogs[i].author, count.get(blogs[i].author) + blogs[i].likes)
        } else {
            count.set(blogs[i].author, blogs[i].likes)
        }
    }
    let most = count.entries().reduce((prev, curr) => curr[1] > prev[1] ? curr : prev)

    return { author: most[0], likes: most[1] }

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}